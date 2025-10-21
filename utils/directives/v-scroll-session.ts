import type { DirectiveBinding, ObjectDirective } from 'vue'

/**
 * Директива отслеживает «сессию прокрутки вниз» и выбрасывает события:
 *  - `scroll-start` — когда пользователь НАЧАЛ движение вниз (после порога minDelta)
 *  - `scroll-end` — когда сессия закончилась (по смене направления на вверх либо по простою — в зависимости от endOn)
 *
 * Ключевые опции:
 *  - endOn: 'up' | 'idle' | 'either' — когда считать, что сессия закончилась
 *      'up' — только при ощутимом движении вверх (рекомендуется по вашему кейсу)
 *      'idle' — только по простою (нет событий скролла дольше idleTimeout)
 *      'either' — любое из условий (по умолчанию раньше было ближе к этому)
 *  - idleTimeout: number | false — длительность простоя в мс; false/0 отключает простои
 *  - endMinDeltaUp: number — минимальный подъем (px), чтобы засчитать «конец по направлению».
 */

type ScrollSessionOptions = {
  /** Минимальное смещение вниз (px), после которого считаем, что «скролл начался». */
  minDelta?: number
  /** Порог простоя (мс), после которого считаем, что «скролл закончился». false — отключить. */
  idleTimeout?: number | false
  /** Ограничить работу только на ось Y (true по умолчанию). */
  verticalOnly?: boolean
  /** Условие завершения сессии. */
  endOn?: 'up' | 'idle' | 'either'
  /** Минимальный подъем вверх (px), чтобы зафиксировать «конец по направлению». */
  endMinDeltaUp?: number
}

type ResolvedOpts = {
  minDelta: number
  idleTimeout: number | false
  verticalOnly: boolean
  endOn: 'up' | 'idle' | 'either'
  endMinDeltaUp: number
}

type ScrollSessionState = {
  lastTop: number
  isActive: boolean // идёт ли сейчас «сессия прокрутки вниз»
  startedTop: number // scrollTop на старте «вниз»
  startedAt: number // timestamp начала
  accumulated: number // суммарно проскроллено вниз в этой сессии
  idleTimer: number | null // таймер простоя
  opts: ResolvedOpts
  onScroll: (e: Event) => void
  onDestroy: () => void
}

const defaultOpts: ResolvedOpts = {
  minDelta: 10,
  idleTimeout: false, // по вашему запросу: по умолчанию не заканчиваем по простою
  verticalOnly: true,
  endOn: 'up', // завершаем, только когда начинается движение вверх
  endMinDeltaUp: 6,
}

function toOpts(
  binding: DirectiveBinding<ScrollSessionOptions | undefined>,
): ResolvedOpts {
  const v = binding.value || {}
  const minDelta = v.minDelta ?? defaultOpts.minDelta
  const idleTimeout =
    v.idleTimeout === 0 || v.idleTimeout === false
      ? false
      : (v.idleTimeout ?? defaultOpts.idleTimeout)
  const endOn = v.endOn ?? defaultOpts.endOn
  const endMinDeltaUp =
    v.endMinDeltaUp ?? v.minDelta ?? defaultOpts.endMinDeltaUp
  return {
    minDelta,
    idleTimeout,
    verticalOnly: v.verticalOnly ?? defaultOpts.verticalOnly,
    endOn,
    endMinDeltaUp,
  }
}

function dispatch(
  el: HTMLElement,
  name: 'scroll-start' | 'scroll-end',
  detail: Record<string, any>,
) {
  el.dispatchEvent(new CustomEvent(name, { detail, bubbles: false }))
}

function shouldUseIdle(state: ScrollSessionState) {
  return state.opts.endOn !== 'up' && state.opts.idleTimeout !== false
}

function createHandler(el: HTMLElement, state: ScrollSessionState) {
  return (e: Event) => {
    // Используем сам элемент как источник прокрутки
    const top = el.scrollTop

    // Вертикальная логика
    const dy = top - state.lastTop
    state.lastTop = top

    if (state.opts.verticalOnly === false) {
      // Если нужно — можно расширить под ось X (не требуется сейчас)
    }

    // Интересует только движение ВНИЗ
    if (dy > 0) {
      // Старт сессии
      if (!state.isActive) {
        if (dy >= state.opts.minDelta) {
          state.isActive = true
          state.startedTop = top - dy // позиция до шага
          state.startedAt = performance.now?.() ?? Date.now()
          state.accumulated = dy

          dispatch(el, 'scroll-start', {
            startedTop: state.startedTop,
            currentTop: top,
            deltaY: dy,
            at: state.startedAt,
          })
        }
      } else {
        // Продолжаем сессию
        state.accumulated += dy
      }
    } else if (dy < 0) {
      // Движение вверх во время активной «вниз»-сессии — завершаем при достаточном подъеме
      if (
        state.isActive &&
        (state.opts.endOn === 'up' || state.opts.endOn === 'either')
      ) {
        if (Math.abs(dy) >= state.opts.endMinDeltaUp) {
          endSession(el, state, 'direction-change')
        }
      }
    }

    // Перезапускаем idle-таймер только если он включен настройками
    if (state.isActive && shouldUseIdle(state)) {
      if (state.idleTimer) window.clearTimeout(state.idleTimer)
      // state.opts.idleTimeout точно число в этом ветвлении
      state.idleTimer = window.setTimeout(() => {
        if (state.isActive) endSession(el, state, 'idle-timeout')
      }, state.opts.idleTimeout as number)
    }
  }
}

function endSession(
  el: HTMLElement,
  state: ScrollSessionState,
  reason: 'idle-timeout' | 'direction-change',
) {
  const endedAt = performance.now?.() ?? Date.now()
  const duration = endedAt - state.startedAt
  const endTop = el.scrollTop

  dispatch(el, 'scroll-end', {
    startedTop: state.startedTop,
    endTop,
    distance: Math.max(0, endTop - state.startedTop), // защита от отрицательных из-за подрагиваний
    accumulated: state.accumulated,
    duration,
    reason,
    at: endedAt,
  })

  state.isActive = false
  state.accumulated = 0
  state.startedTop = endTop
  state.startedAt = endedAt

  if (state.idleTimer) {
    window.clearTimeout(state.idleTimer)
    state.idleTimer = null
  }
}

export const vScrollSession: ObjectDirective<
  HTMLElement,
  ScrollSessionOptions | undefined
> = {
  mounted(el, binding) {
    // Убедимся, что элемент реально скроллится
    // (нужно: overflow: auto|scroll; фиксированная высота и т.п.)
    const opts = toOpts(binding)

    const state: ScrollSessionState = {
      lastTop: el.scrollTop,
      isActive: false,
      startedTop: el.scrollTop,
      startedAt: performance.now?.() ?? Date.now(),
      accumulated: 0,
      idleTimer: null,
      opts,
      onScroll: () => {},
      onDestroy: () => {},
    }

    const onScroll = createHandler(el, state)
    state.onScroll = onScroll

    el.addEventListener('scroll', onScroll, { passive: true })

    // Сохраняем состояние на элементе
    ;(el as any).__scrollSessionState__ = state
  },

  updated(el, binding) {
    // Обновляем опции без перевешивания слушателей
    const state = (el as any).__scrollSessionState__ as
      | ScrollSessionState
      | undefined
    if (!state) return
    state.opts = toOpts(binding)
  },

  beforeUnmount(el) {
    const state = (el as any).__scrollSessionState__ as
      | ScrollSessionState
      | undefined
    if (!state) return

    if (state.idleTimer) {
      window.clearTimeout(state.idleTimer)
      state.idleTimer = null
    }
    el.removeEventListener('scroll', state.onScroll as any)
    delete (el as any).__scrollSessionState__
  },
}
