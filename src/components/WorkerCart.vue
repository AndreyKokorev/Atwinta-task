<template lang="pug">
.cart
  img.cart__image(:src="image")
  .cart__name {{ name}}
  .cart__action( @click="$router.push(`/workers/${id}`)" ) Открыть профиль
</template>


<script>
export default {
  props: ['image', 'name', 'id'],
};
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  grid-template-rows: 4fr 2fr 0.5fr;

  &__image {
    width:100%;
  }

  &__name {
    font-size: 1rem;
    padding-top: 10px;
    word-wrap: wrap;
  }

  &__action {
    color: rgb(6, 6, 160);

    &:hover {
      color: rgb(142, 144, 247);
    }
  }
}
</style>