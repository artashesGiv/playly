
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'Agreement': typeof import("../components/agreement.vue")['default']
    'AuthModal': typeof import("../components/auth-modal.vue")['default']
    'BalanceCard': typeof import("../components/balance/card.vue")['default']
    'BalanceMainClick': typeof import("../components/balance/main-click.vue")['default']
    'BountyCard': typeof import("../components/bounty/card/index.vue")['default']
    'BountyCardPlaylyFriend': typeof import("../components/bounty/card/playly-friend.vue")['default']
    'BountyCardPlaylyTg': typeof import("../components/bounty/card/playly-tg.vue")['default']
    'BountyCardRobloxFriend': typeof import("../components/bounty/card/roblox-friend.vue")['default']
    'BountyCardStarPetsLight': typeof import("../components/bounty/card/star-pets-light.vue")['default']
    'BountyCardStarPetsTg': typeof import("../components/bounty/card/star-pets-tg.vue")['default']
    'BountyLists': typeof import("../components/bounty/lists.vue")['default']
    'CaseItem': typeof import("../components/case-item/index.vue")['default']
    'CasesCard': typeof import("../components/cases/card.vue")['default']
    'CasesItemAbilities': typeof import("../components/cases/item-abilities.vue")['default']
    'CasesItemAbility': typeof import("../components/cases/item-ability.vue")['default']
    'CasesMianCard': typeof import("../components/cases/mian-card.vue")['default']
    'CasesRouletteItemCard': typeof import("../components/cases/roulette-item-card.vue")['default']
    'FriendCard': typeof import("../components/friend/card.vue")['default']
    'HowStarPetsLinkCard': typeof import("../components/how-star-pets-link-card.vue")['default']
    'ItemInteractive': typeof import("../components/item-interactive.vue")['default']
    'ItemMainData': typeof import("../components/item-main-data.vue")['default']
    'LanguageModal': typeof import("../components/language-modal.vue")['default']
    'Language': typeof import("../components/language.vue")['default']
    'MainHeader': typeof import("../components/main/header.vue")['default']
    'MainLogo': typeof import("../components/main/logo.vue")['default']
    'MainMascot': typeof import("../components/main/mascot.vue")['default']
    'MainNavItem': typeof import("../components/main/nav-item.vue")['default']
    'MainNavigation': typeof import("../components/main/navigation.vue")['default']
    'MarketAccessWriteBanner': typeof import("../components/market/access-write-banner.vue")['default']
    'MarketItemCard': typeof import("../components/market/item-card.vue")['default']
    'MarketRobuxBanner': typeof import("../components/market/robux-banner.vue")['default']
    'OnboardingContent': typeof import("../components/onboarding/content.vue")['default']
    'OnboardingStepLayout': typeof import("../components/onboarding/step-layout.vue")['default']
    'OnboardingStep1': typeof import("../components/onboarding/step/1.vue")['default']
    'OnboardingStep2': typeof import("../components/onboarding/step/2.vue")['default']
    'OnboardingStep3': typeof import("../components/onboarding/step/3.vue")['default']
    'PayCard': typeof import("../components/pay-card.vue")['default']
    'ProfileCommunity': typeof import("../components/profile/community.vue")['default']
    'ProfileHowGetItemCard': typeof import("../components/profile/how-get-item-card.vue")['default']
    'ProfileItemsList': typeof import("../components/profile/items-list.vue")['default']
    'ProfileMain': typeof import("../components/profile/main.vue")['default']
    'ProfileTimerCard': typeof import("../components/profile/timer-card.vue")['default']
    'RobuxBalanceCard': typeof import("../components/robux-balance/card.vue")['default']
    'RobuxAlertCard': typeof import("../components/robux/alert-card.vue")['default']
    'RobuxBalanceHistoryCard': typeof import("../components/robux/balance/history-card.vue")['default']
    'RobuxBalanceInteractive': typeof import("../components/robux/balance/interactive.vue")['default']
    'RobuxBalanceMain': typeof import("../components/robux/balance/main.vue")['default']
    'RobuxBalanceTasks': typeof import("../components/robux/balance/tasks.vue")['default']
    'RobuxBuyHeader': typeof import("../components/robux/buy/header.vue")['default']
    'RobuxBuyHowToWorkModal': typeof import("../components/robux/buy/how-to-work-modal.vue")['default']
    'RobuxBuyItemCard': typeof import("../components/robux/buy/item-card.vue")['default']
    'RobuxBuyStep1': typeof import("../components/robux/buy/step/1.vue")['default']
    'RobuxBuyStep2': typeof import("../components/robux/buy/step/2.vue")['default']
    'RobuxBuyStep3': typeof import("../components/robux/buy/step/3.vue")['default']
    'RobuxBuyStep4': typeof import("../components/robux/buy/step/4.vue")['default']
    'RobuxBuyStep5': typeof import("../components/robux/buy/step/5.vue")['default']
    'RobuxBuyStep6': typeof import("../components/robux/buy/step/6.vue")['default']
    'RobuxBuyStepCard': typeof import("../components/robux/buy/step/card.vue")['default']
    'RobuxMainCard': typeof import("../components/robux/main-card.vue")['default']
    'RobuxSellHeader': typeof import("../components/robux/sell-header.vue")['default']
    'StarPetsLinkCard': typeof import("../components/star-pets-link-card.vue")['default']
    'StarPetsLinkContent': typeof import("../components/star-pets-link/content.vue")['default']
    'StarPetsLinkHeader': typeof import("../components/star-pets-link/header.vue")['default']
    'TransitionFade': typeof import("../components/transition/fade.vue")['default']
    'TransitionHeight': typeof import("../components/transition/height.vue")['default']
    'UiBalanceCard': typeof import("../components/ui/balance-card.vue")['default']
    'UiButtonBase': typeof import("../components/ui/button-base/index.vue")['default']
    'UiCard': typeof import("../components/ui/card.vue")['default']
    'UiDivider': typeof import("../components/ui/divider.vue")['default']
    'UiIconBase': typeof import("../components/ui/icon-base.vue")['default']
    'UiInputBase': typeof import("../components/ui/input-base.vue")['default']
    'UiLanguageCard': typeof import("../components/ui/language-card.vue")['default']
    'UiModalBase': typeof import("../components/ui/modal-base.vue")['default']
    'UiSpinner': typeof import("../components/ui/spinner.vue")['default']
    'UiStautsBar': typeof import("../components/ui/stauts-bar.vue")['default']
    'UiStepPoint': typeof import("../components/ui/step-point.vue")['default']
    'UiTableData': typeof import("../components/ui/table-data.vue")['default']
    'UiTabs': typeof import("../components/ui/tabs.vue")['default']
    'UiTag': typeof import("../components/ui/tag.vue")['default']
    'UiTitle': typeof import("../components/ui/title.vue")['default']
    'UiVideo': typeof import("../components/ui/video.vue")['default']
    'UserData': typeof import("../components/user-data.vue")['default']
    'WriteAccessBanner': typeof import("../components/write-access-banner.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'Motion': typeof import("motion-v")['Motion']
    'AnimatePresence': typeof import("motion-v")['AnimatePresence']
    'LayoutGroup': typeof import("motion-v")['LayoutGroup']
    'MotionConfig': typeof import("motion-v")['MotionConfig']
    'ReorderGroup': typeof import("motion-v")['ReorderGroup']
    'ReorderItem': typeof import("motion-v")['ReorderItem']
    'M': typeof import("motion-v")['M']
    'NuxtLinkLocale': typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'Lottie': typeof import("../node_modules/nuxt-lottie/dist/runtime/Lottie.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'Lottie': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAgreement': LazyComponent<typeof import("../components/agreement.vue")['default']>
    'LazyAuthModal': LazyComponent<typeof import("../components/auth-modal.vue")['default']>
    'LazyBalanceCard': LazyComponent<typeof import("../components/balance/card.vue")['default']>
    'LazyBalanceMainClick': LazyComponent<typeof import("../components/balance/main-click.vue")['default']>
    'LazyBountyCard': LazyComponent<typeof import("../components/bounty/card/index.vue")['default']>
    'LazyBountyCardPlaylyFriend': LazyComponent<typeof import("../components/bounty/card/playly-friend.vue")['default']>
    'LazyBountyCardPlaylyTg': LazyComponent<typeof import("../components/bounty/card/playly-tg.vue")['default']>
    'LazyBountyCardRobloxFriend': LazyComponent<typeof import("../components/bounty/card/roblox-friend.vue")['default']>
    'LazyBountyCardStarPetsLight': LazyComponent<typeof import("../components/bounty/card/star-pets-light.vue")['default']>
    'LazyBountyCardStarPetsTg': LazyComponent<typeof import("../components/bounty/card/star-pets-tg.vue")['default']>
    'LazyBountyLists': LazyComponent<typeof import("../components/bounty/lists.vue")['default']>
    'LazyCaseItem': LazyComponent<typeof import("../components/case-item/index.vue")['default']>
    'LazyCasesCard': LazyComponent<typeof import("../components/cases/card.vue")['default']>
    'LazyCasesItemAbilities': LazyComponent<typeof import("../components/cases/item-abilities.vue")['default']>
    'LazyCasesItemAbility': LazyComponent<typeof import("../components/cases/item-ability.vue")['default']>
    'LazyCasesMianCard': LazyComponent<typeof import("../components/cases/mian-card.vue")['default']>
    'LazyCasesRouletteItemCard': LazyComponent<typeof import("../components/cases/roulette-item-card.vue")['default']>
    'LazyFriendCard': LazyComponent<typeof import("../components/friend/card.vue")['default']>
    'LazyHowStarPetsLinkCard': LazyComponent<typeof import("../components/how-star-pets-link-card.vue")['default']>
    'LazyItemInteractive': LazyComponent<typeof import("../components/item-interactive.vue")['default']>
    'LazyItemMainData': LazyComponent<typeof import("../components/item-main-data.vue")['default']>
    'LazyLanguageModal': LazyComponent<typeof import("../components/language-modal.vue")['default']>
    'LazyLanguage': LazyComponent<typeof import("../components/language.vue")['default']>
    'LazyMainHeader': LazyComponent<typeof import("../components/main/header.vue")['default']>
    'LazyMainLogo': LazyComponent<typeof import("../components/main/logo.vue")['default']>
    'LazyMainMascot': LazyComponent<typeof import("../components/main/mascot.vue")['default']>
    'LazyMainNavItem': LazyComponent<typeof import("../components/main/nav-item.vue")['default']>
    'LazyMainNavigation': LazyComponent<typeof import("../components/main/navigation.vue")['default']>
    'LazyMarketAccessWriteBanner': LazyComponent<typeof import("../components/market/access-write-banner.vue")['default']>
    'LazyMarketItemCard': LazyComponent<typeof import("../components/market/item-card.vue")['default']>
    'LazyMarketRobuxBanner': LazyComponent<typeof import("../components/market/robux-banner.vue")['default']>
    'LazyOnboardingContent': LazyComponent<typeof import("../components/onboarding/content.vue")['default']>
    'LazyOnboardingStepLayout': LazyComponent<typeof import("../components/onboarding/step-layout.vue")['default']>
    'LazyOnboardingStep1': LazyComponent<typeof import("../components/onboarding/step/1.vue")['default']>
    'LazyOnboardingStep2': LazyComponent<typeof import("../components/onboarding/step/2.vue")['default']>
    'LazyOnboardingStep3': LazyComponent<typeof import("../components/onboarding/step/3.vue")['default']>
    'LazyPayCard': LazyComponent<typeof import("../components/pay-card.vue")['default']>
    'LazyProfileCommunity': LazyComponent<typeof import("../components/profile/community.vue")['default']>
    'LazyProfileHowGetItemCard': LazyComponent<typeof import("../components/profile/how-get-item-card.vue")['default']>
    'LazyProfileItemsList': LazyComponent<typeof import("../components/profile/items-list.vue")['default']>
    'LazyProfileMain': LazyComponent<typeof import("../components/profile/main.vue")['default']>
    'LazyProfileTimerCard': LazyComponent<typeof import("../components/profile/timer-card.vue")['default']>
    'LazyRobuxBalanceCard': LazyComponent<typeof import("../components/robux-balance/card.vue")['default']>
    'LazyRobuxAlertCard': LazyComponent<typeof import("../components/robux/alert-card.vue")['default']>
    'LazyRobuxBalanceHistoryCard': LazyComponent<typeof import("../components/robux/balance/history-card.vue")['default']>
    'LazyRobuxBalanceInteractive': LazyComponent<typeof import("../components/robux/balance/interactive.vue")['default']>
    'LazyRobuxBalanceMain': LazyComponent<typeof import("../components/robux/balance/main.vue")['default']>
    'LazyRobuxBalanceTasks': LazyComponent<typeof import("../components/robux/balance/tasks.vue")['default']>
    'LazyRobuxBuyHeader': LazyComponent<typeof import("../components/robux/buy/header.vue")['default']>
    'LazyRobuxBuyHowToWorkModal': LazyComponent<typeof import("../components/robux/buy/how-to-work-modal.vue")['default']>
    'LazyRobuxBuyItemCard': LazyComponent<typeof import("../components/robux/buy/item-card.vue")['default']>
    'LazyRobuxBuyStep1': LazyComponent<typeof import("../components/robux/buy/step/1.vue")['default']>
    'LazyRobuxBuyStep2': LazyComponent<typeof import("../components/robux/buy/step/2.vue")['default']>
    'LazyRobuxBuyStep3': LazyComponent<typeof import("../components/robux/buy/step/3.vue")['default']>
    'LazyRobuxBuyStep4': LazyComponent<typeof import("../components/robux/buy/step/4.vue")['default']>
    'LazyRobuxBuyStep5': LazyComponent<typeof import("../components/robux/buy/step/5.vue")['default']>
    'LazyRobuxBuyStep6': LazyComponent<typeof import("../components/robux/buy/step/6.vue")['default']>
    'LazyRobuxBuyStepCard': LazyComponent<typeof import("../components/robux/buy/step/card.vue")['default']>
    'LazyRobuxMainCard': LazyComponent<typeof import("../components/robux/main-card.vue")['default']>
    'LazyRobuxSellHeader': LazyComponent<typeof import("../components/robux/sell-header.vue")['default']>
    'LazyStarPetsLinkCard': LazyComponent<typeof import("../components/star-pets-link-card.vue")['default']>
    'LazyStarPetsLinkContent': LazyComponent<typeof import("../components/star-pets-link/content.vue")['default']>
    'LazyStarPetsLinkHeader': LazyComponent<typeof import("../components/star-pets-link/header.vue")['default']>
    'LazyTransitionFade': LazyComponent<typeof import("../components/transition/fade.vue")['default']>
    'LazyTransitionHeight': LazyComponent<typeof import("../components/transition/height.vue")['default']>
    'LazyUiBalanceCard': LazyComponent<typeof import("../components/ui/balance-card.vue")['default']>
    'LazyUiButtonBase': LazyComponent<typeof import("../components/ui/button-base/index.vue")['default']>
    'LazyUiCard': LazyComponent<typeof import("../components/ui/card.vue")['default']>
    'LazyUiDivider': LazyComponent<typeof import("../components/ui/divider.vue")['default']>
    'LazyUiIconBase': LazyComponent<typeof import("../components/ui/icon-base.vue")['default']>
    'LazyUiInputBase': LazyComponent<typeof import("../components/ui/input-base.vue")['default']>
    'LazyUiLanguageCard': LazyComponent<typeof import("../components/ui/language-card.vue")['default']>
    'LazyUiModalBase': LazyComponent<typeof import("../components/ui/modal-base.vue")['default']>
    'LazyUiSpinner': LazyComponent<typeof import("../components/ui/spinner.vue")['default']>
    'LazyUiStautsBar': LazyComponent<typeof import("../components/ui/stauts-bar.vue")['default']>
    'LazyUiStepPoint': LazyComponent<typeof import("../components/ui/step-point.vue")['default']>
    'LazyUiTableData': LazyComponent<typeof import("../components/ui/table-data.vue")['default']>
    'LazyUiTabs': LazyComponent<typeof import("../components/ui/tabs.vue")['default']>
    'LazyUiTag': LazyComponent<typeof import("../components/ui/tag.vue")['default']>
    'LazyUiTitle': LazyComponent<typeof import("../components/ui/title.vue")['default']>
    'LazyUiVideo': LazyComponent<typeof import("../components/ui/video.vue")['default']>
    'LazyUserData': LazyComponent<typeof import("../components/user-data.vue")['default']>
    'LazyWriteAccessBanner': LazyComponent<typeof import("../components/write-access-banner.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyMotion': LazyComponent<typeof import("motion-v")['Motion']>
    'LazyAnimatePresence': LazyComponent<typeof import("motion-v")['AnimatePresence']>
    'LazyLayoutGroup': LazyComponent<typeof import("motion-v")['LayoutGroup']>
    'LazyMotionConfig': LazyComponent<typeof import("motion-v")['MotionConfig']>
    'LazyReorderGroup': LazyComponent<typeof import("motion-v")['ReorderGroup']>
    'LazyReorderItem': LazyComponent<typeof import("motion-v")['ReorderItem']>
    'LazyM': LazyComponent<typeof import("motion-v")['M']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyLottie': LazyComponent<typeof import("../node_modules/nuxt-lottie/dist/runtime/Lottie.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
    'LazyLottie': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const Agreement: typeof import("../components/agreement.vue")['default']
export const AuthModal: typeof import("../components/auth-modal.vue")['default']
export const BalanceCard: typeof import("../components/balance/card.vue")['default']
export const BalanceMainClick: typeof import("../components/balance/main-click.vue")['default']
export const BountyCard: typeof import("../components/bounty/card/index.vue")['default']
export const BountyCardPlaylyFriend: typeof import("../components/bounty/card/playly-friend.vue")['default']
export const BountyCardPlaylyTg: typeof import("../components/bounty/card/playly-tg.vue")['default']
export const BountyCardRobloxFriend: typeof import("../components/bounty/card/roblox-friend.vue")['default']
export const BountyCardStarPetsLight: typeof import("../components/bounty/card/star-pets-light.vue")['default']
export const BountyCardStarPetsTg: typeof import("../components/bounty/card/star-pets-tg.vue")['default']
export const BountyLists: typeof import("../components/bounty/lists.vue")['default']
export const CaseItem: typeof import("../components/case-item/index.vue")['default']
export const CasesCard: typeof import("../components/cases/card.vue")['default']
export const CasesItemAbilities: typeof import("../components/cases/item-abilities.vue")['default']
export const CasesItemAbility: typeof import("../components/cases/item-ability.vue")['default']
export const CasesMianCard: typeof import("../components/cases/mian-card.vue")['default']
export const CasesRouletteItemCard: typeof import("../components/cases/roulette-item-card.vue")['default']
export const FriendCard: typeof import("../components/friend/card.vue")['default']
export const HowStarPetsLinkCard: typeof import("../components/how-star-pets-link-card.vue")['default']
export const ItemInteractive: typeof import("../components/item-interactive.vue")['default']
export const ItemMainData: typeof import("../components/item-main-data.vue")['default']
export const LanguageModal: typeof import("../components/language-modal.vue")['default']
export const Language: typeof import("../components/language.vue")['default']
export const MainHeader: typeof import("../components/main/header.vue")['default']
export const MainLogo: typeof import("../components/main/logo.vue")['default']
export const MainMascot: typeof import("../components/main/mascot.vue")['default']
export const MainNavItem: typeof import("../components/main/nav-item.vue")['default']
export const MainNavigation: typeof import("../components/main/navigation.vue")['default']
export const MarketAccessWriteBanner: typeof import("../components/market/access-write-banner.vue")['default']
export const MarketItemCard: typeof import("../components/market/item-card.vue")['default']
export const MarketRobuxBanner: typeof import("../components/market/robux-banner.vue")['default']
export const OnboardingContent: typeof import("../components/onboarding/content.vue")['default']
export const OnboardingStepLayout: typeof import("../components/onboarding/step-layout.vue")['default']
export const OnboardingStep1: typeof import("../components/onboarding/step/1.vue")['default']
export const OnboardingStep2: typeof import("../components/onboarding/step/2.vue")['default']
export const OnboardingStep3: typeof import("../components/onboarding/step/3.vue")['default']
export const PayCard: typeof import("../components/pay-card.vue")['default']
export const ProfileCommunity: typeof import("../components/profile/community.vue")['default']
export const ProfileHowGetItemCard: typeof import("../components/profile/how-get-item-card.vue")['default']
export const ProfileItemsList: typeof import("../components/profile/items-list.vue")['default']
export const ProfileMain: typeof import("../components/profile/main.vue")['default']
export const ProfileTimerCard: typeof import("../components/profile/timer-card.vue")['default']
export const RobuxBalanceCard: typeof import("../components/robux-balance/card.vue")['default']
export const RobuxAlertCard: typeof import("../components/robux/alert-card.vue")['default']
export const RobuxBalanceHistoryCard: typeof import("../components/robux/balance/history-card.vue")['default']
export const RobuxBalanceInteractive: typeof import("../components/robux/balance/interactive.vue")['default']
export const RobuxBalanceMain: typeof import("../components/robux/balance/main.vue")['default']
export const RobuxBalanceTasks: typeof import("../components/robux/balance/tasks.vue")['default']
export const RobuxBuyHeader: typeof import("../components/robux/buy/header.vue")['default']
export const RobuxBuyHowToWorkModal: typeof import("../components/robux/buy/how-to-work-modal.vue")['default']
export const RobuxBuyItemCard: typeof import("../components/robux/buy/item-card.vue")['default']
export const RobuxBuyStep1: typeof import("../components/robux/buy/step/1.vue")['default']
export const RobuxBuyStep2: typeof import("../components/robux/buy/step/2.vue")['default']
export const RobuxBuyStep3: typeof import("../components/robux/buy/step/3.vue")['default']
export const RobuxBuyStep4: typeof import("../components/robux/buy/step/4.vue")['default']
export const RobuxBuyStep5: typeof import("../components/robux/buy/step/5.vue")['default']
export const RobuxBuyStep6: typeof import("../components/robux/buy/step/6.vue")['default']
export const RobuxBuyStepCard: typeof import("../components/robux/buy/step/card.vue")['default']
export const RobuxMainCard: typeof import("../components/robux/main-card.vue")['default']
export const RobuxSellHeader: typeof import("../components/robux/sell-header.vue")['default']
export const StarPetsLinkCard: typeof import("../components/star-pets-link-card.vue")['default']
export const StarPetsLinkContent: typeof import("../components/star-pets-link/content.vue")['default']
export const StarPetsLinkHeader: typeof import("../components/star-pets-link/header.vue")['default']
export const TransitionFade: typeof import("../components/transition/fade.vue")['default']
export const TransitionHeight: typeof import("../components/transition/height.vue")['default']
export const UiBalanceCard: typeof import("../components/ui/balance-card.vue")['default']
export const UiButtonBase: typeof import("../components/ui/button-base/index.vue")['default']
export const UiCard: typeof import("../components/ui/card.vue")['default']
export const UiDivider: typeof import("../components/ui/divider.vue")['default']
export const UiIconBase: typeof import("../components/ui/icon-base.vue")['default']
export const UiInputBase: typeof import("../components/ui/input-base.vue")['default']
export const UiLanguageCard: typeof import("../components/ui/language-card.vue")['default']
export const UiModalBase: typeof import("../components/ui/modal-base.vue")['default']
export const UiSpinner: typeof import("../components/ui/spinner.vue")['default']
export const UiStautsBar: typeof import("../components/ui/stauts-bar.vue")['default']
export const UiStepPoint: typeof import("../components/ui/step-point.vue")['default']
export const UiTableData: typeof import("../components/ui/table-data.vue")['default']
export const UiTabs: typeof import("../components/ui/tabs.vue")['default']
export const UiTag: typeof import("../components/ui/tag.vue")['default']
export const UiTitle: typeof import("../components/ui/title.vue")['default']
export const UiVideo: typeof import("../components/ui/video.vue")['default']
export const UserData: typeof import("../components/user-data.vue")['default']
export const WriteAccessBanner: typeof import("../components/write-access-banner.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const Motion: typeof import("motion-v")['Motion']
export const AnimatePresence: typeof import("motion-v")['AnimatePresence']
export const LayoutGroup: typeof import("motion-v")['LayoutGroup']
export const MotionConfig: typeof import("motion-v")['MotionConfig']
export const ReorderGroup: typeof import("motion-v")['ReorderGroup']
export const ReorderItem: typeof import("motion-v")['ReorderItem']
export const M: typeof import("motion-v")['M']
export const NuxtLinkLocale: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const Lottie: typeof import("../node_modules/nuxt-lottie/dist/runtime/Lottie.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const Lottie: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAgreement: LazyComponent<typeof import("../components/agreement.vue")['default']>
export const LazyAuthModal: LazyComponent<typeof import("../components/auth-modal.vue")['default']>
export const LazyBalanceCard: LazyComponent<typeof import("../components/balance/card.vue")['default']>
export const LazyBalanceMainClick: LazyComponent<typeof import("../components/balance/main-click.vue")['default']>
export const LazyBountyCard: LazyComponent<typeof import("../components/bounty/card/index.vue")['default']>
export const LazyBountyCardPlaylyFriend: LazyComponent<typeof import("../components/bounty/card/playly-friend.vue")['default']>
export const LazyBountyCardPlaylyTg: LazyComponent<typeof import("../components/bounty/card/playly-tg.vue")['default']>
export const LazyBountyCardRobloxFriend: LazyComponent<typeof import("../components/bounty/card/roblox-friend.vue")['default']>
export const LazyBountyCardStarPetsLight: LazyComponent<typeof import("../components/bounty/card/star-pets-light.vue")['default']>
export const LazyBountyCardStarPetsTg: LazyComponent<typeof import("../components/bounty/card/star-pets-tg.vue")['default']>
export const LazyBountyLists: LazyComponent<typeof import("../components/bounty/lists.vue")['default']>
export const LazyCaseItem: LazyComponent<typeof import("../components/case-item/index.vue")['default']>
export const LazyCasesCard: LazyComponent<typeof import("../components/cases/card.vue")['default']>
export const LazyCasesItemAbilities: LazyComponent<typeof import("../components/cases/item-abilities.vue")['default']>
export const LazyCasesItemAbility: LazyComponent<typeof import("../components/cases/item-ability.vue")['default']>
export const LazyCasesMianCard: LazyComponent<typeof import("../components/cases/mian-card.vue")['default']>
export const LazyCasesRouletteItemCard: LazyComponent<typeof import("../components/cases/roulette-item-card.vue")['default']>
export const LazyFriendCard: LazyComponent<typeof import("../components/friend/card.vue")['default']>
export const LazyHowStarPetsLinkCard: LazyComponent<typeof import("../components/how-star-pets-link-card.vue")['default']>
export const LazyItemInteractive: LazyComponent<typeof import("../components/item-interactive.vue")['default']>
export const LazyItemMainData: LazyComponent<typeof import("../components/item-main-data.vue")['default']>
export const LazyLanguageModal: LazyComponent<typeof import("../components/language-modal.vue")['default']>
export const LazyLanguage: LazyComponent<typeof import("../components/language.vue")['default']>
export const LazyMainHeader: LazyComponent<typeof import("../components/main/header.vue")['default']>
export const LazyMainLogo: LazyComponent<typeof import("../components/main/logo.vue")['default']>
export const LazyMainMascot: LazyComponent<typeof import("../components/main/mascot.vue")['default']>
export const LazyMainNavItem: LazyComponent<typeof import("../components/main/nav-item.vue")['default']>
export const LazyMainNavigation: LazyComponent<typeof import("../components/main/navigation.vue")['default']>
export const LazyMarketAccessWriteBanner: LazyComponent<typeof import("../components/market/access-write-banner.vue")['default']>
export const LazyMarketItemCard: LazyComponent<typeof import("../components/market/item-card.vue")['default']>
export const LazyMarketRobuxBanner: LazyComponent<typeof import("../components/market/robux-banner.vue")['default']>
export const LazyOnboardingContent: LazyComponent<typeof import("../components/onboarding/content.vue")['default']>
export const LazyOnboardingStepLayout: LazyComponent<typeof import("../components/onboarding/step-layout.vue")['default']>
export const LazyOnboardingStep1: LazyComponent<typeof import("../components/onboarding/step/1.vue")['default']>
export const LazyOnboardingStep2: LazyComponent<typeof import("../components/onboarding/step/2.vue")['default']>
export const LazyOnboardingStep3: LazyComponent<typeof import("../components/onboarding/step/3.vue")['default']>
export const LazyPayCard: LazyComponent<typeof import("../components/pay-card.vue")['default']>
export const LazyProfileCommunity: LazyComponent<typeof import("../components/profile/community.vue")['default']>
export const LazyProfileHowGetItemCard: LazyComponent<typeof import("../components/profile/how-get-item-card.vue")['default']>
export const LazyProfileItemsList: LazyComponent<typeof import("../components/profile/items-list.vue")['default']>
export const LazyProfileMain: LazyComponent<typeof import("../components/profile/main.vue")['default']>
export const LazyProfileTimerCard: LazyComponent<typeof import("../components/profile/timer-card.vue")['default']>
export const LazyRobuxBalanceCard: LazyComponent<typeof import("../components/robux-balance/card.vue")['default']>
export const LazyRobuxAlertCard: LazyComponent<typeof import("../components/robux/alert-card.vue")['default']>
export const LazyRobuxBalanceHistoryCard: LazyComponent<typeof import("../components/robux/balance/history-card.vue")['default']>
export const LazyRobuxBalanceInteractive: LazyComponent<typeof import("../components/robux/balance/interactive.vue")['default']>
export const LazyRobuxBalanceMain: LazyComponent<typeof import("../components/robux/balance/main.vue")['default']>
export const LazyRobuxBalanceTasks: LazyComponent<typeof import("../components/robux/balance/tasks.vue")['default']>
export const LazyRobuxBuyHeader: LazyComponent<typeof import("../components/robux/buy/header.vue")['default']>
export const LazyRobuxBuyHowToWorkModal: LazyComponent<typeof import("../components/robux/buy/how-to-work-modal.vue")['default']>
export const LazyRobuxBuyItemCard: LazyComponent<typeof import("../components/robux/buy/item-card.vue")['default']>
export const LazyRobuxBuyStep1: LazyComponent<typeof import("../components/robux/buy/step/1.vue")['default']>
export const LazyRobuxBuyStep2: LazyComponent<typeof import("../components/robux/buy/step/2.vue")['default']>
export const LazyRobuxBuyStep3: LazyComponent<typeof import("../components/robux/buy/step/3.vue")['default']>
export const LazyRobuxBuyStep4: LazyComponent<typeof import("../components/robux/buy/step/4.vue")['default']>
export const LazyRobuxBuyStep5: LazyComponent<typeof import("../components/robux/buy/step/5.vue")['default']>
export const LazyRobuxBuyStep6: LazyComponent<typeof import("../components/robux/buy/step/6.vue")['default']>
export const LazyRobuxBuyStepCard: LazyComponent<typeof import("../components/robux/buy/step/card.vue")['default']>
export const LazyRobuxMainCard: LazyComponent<typeof import("../components/robux/main-card.vue")['default']>
export const LazyRobuxSellHeader: LazyComponent<typeof import("../components/robux/sell-header.vue")['default']>
export const LazyStarPetsLinkCard: LazyComponent<typeof import("../components/star-pets-link-card.vue")['default']>
export const LazyStarPetsLinkContent: LazyComponent<typeof import("../components/star-pets-link/content.vue")['default']>
export const LazyStarPetsLinkHeader: LazyComponent<typeof import("../components/star-pets-link/header.vue")['default']>
export const LazyTransitionFade: LazyComponent<typeof import("../components/transition/fade.vue")['default']>
export const LazyTransitionHeight: LazyComponent<typeof import("../components/transition/height.vue")['default']>
export const LazyUiBalanceCard: LazyComponent<typeof import("../components/ui/balance-card.vue")['default']>
export const LazyUiButtonBase: LazyComponent<typeof import("../components/ui/button-base/index.vue")['default']>
export const LazyUiCard: LazyComponent<typeof import("../components/ui/card.vue")['default']>
export const LazyUiDivider: LazyComponent<typeof import("../components/ui/divider.vue")['default']>
export const LazyUiIconBase: LazyComponent<typeof import("../components/ui/icon-base.vue")['default']>
export const LazyUiInputBase: LazyComponent<typeof import("../components/ui/input-base.vue")['default']>
export const LazyUiLanguageCard: LazyComponent<typeof import("../components/ui/language-card.vue")['default']>
export const LazyUiModalBase: LazyComponent<typeof import("../components/ui/modal-base.vue")['default']>
export const LazyUiSpinner: LazyComponent<typeof import("../components/ui/spinner.vue")['default']>
export const LazyUiStautsBar: LazyComponent<typeof import("../components/ui/stauts-bar.vue")['default']>
export const LazyUiStepPoint: LazyComponent<typeof import("../components/ui/step-point.vue")['default']>
export const LazyUiTableData: LazyComponent<typeof import("../components/ui/table-data.vue")['default']>
export const LazyUiTabs: LazyComponent<typeof import("../components/ui/tabs.vue")['default']>
export const LazyUiTag: LazyComponent<typeof import("../components/ui/tag.vue")['default']>
export const LazyUiTitle: LazyComponent<typeof import("../components/ui/title.vue")['default']>
export const LazyUiVideo: LazyComponent<typeof import("../components/ui/video.vue")['default']>
export const LazyUserData: LazyComponent<typeof import("../components/user-data.vue")['default']>
export const LazyWriteAccessBanner: LazyComponent<typeof import("../components/write-access-banner.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyMotion: LazyComponent<typeof import("motion-v")['Motion']>
export const LazyAnimatePresence: LazyComponent<typeof import("motion-v")['AnimatePresence']>
export const LazyLayoutGroup: LazyComponent<typeof import("motion-v")['LayoutGroup']>
export const LazyMotionConfig: LazyComponent<typeof import("motion-v")['MotionConfig']>
export const LazyReorderGroup: LazyComponent<typeof import("motion-v")['ReorderGroup']>
export const LazyReorderItem: LazyComponent<typeof import("motion-v")['ReorderItem']>
export const LazyM: LazyComponent<typeof import("motion-v")['M']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyLottie: LazyComponent<typeof import("../node_modules/nuxt-lottie/dist/runtime/Lottie.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
export const LazyLottie: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
