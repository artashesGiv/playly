<template>
  <div class="user-data">
    <span>
      {{ user.name }}
    </span>
    <nuxt-img class="user-data__avatar" :src="user.photo_url" />
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()

type UserDataWithProps = {
  name: string
  photo_url: string
}

type UserDataWithoutProps = {
  name?: never
  photo_url?: never
}

export type UserDataProps = UserDataWithProps | UserDataWithoutProps

const props = defineProps<UserDataProps>()

const user = computed(() =>
  props.name
    ? props
    : {
        name: `${tg?.initDataUnsafe?.user?.first_name} ${tg?.initDataUnsafe?.user?.last_name}`,
        photo_url: tg?.initDataUnsafe?.user?.photo_url,
      },
)
</script>

<style scoped lang="scss">
.user-data {
  @include row(8px);

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
}
</style>
