<template lang="pug">
.container
  h2.title {{ profileData.name }}
  .inner-container
    img(:src="profileData.image")
    .info
      .info__item.item
        .item__title Логин
        .item__text {{ profileData.login }}
      .info__item.item
        .item__title Email
        .item__text {{ profileData.email }}
      .info__item.item 
        .item__title Должность
        .item__text {{ profileData.worker.position }}
      .info__item.item
        .item__title Отдел
        .item__text {{ profileData.worker.department }}
      .info__item.item
        .item__title Зачислен
        .item__text {{ profileData.worker.adopted_at.split(' ')[0] }}
      .info__item.item
        .item__title О себе
        .item__text {{ profileData.about }}
</template>

<script>
export default {
  props: {
    service: Object,
  },
  data() {
    return {
      profileData: {},
    };
  },
  created: async function () {
    const id = this.$route.params.id;
    const res = await this.service.getWorkerProfile(id);
    this.profileData = { ...res };
    console.log(res);
  },
};
</script>

<style lang="scss" scoped>

h2 {
  font-size: 1.7rem;
  font-weight: bold;
}
.container {
  max-width: 1000px;
  margin-top: 3.5rem;
}

.inner-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 2.5rem;
}

.info {
  display: grid;
  grid-template-rows: repeat(6, minmax(40px, auto));
}
.item {
  display: grid;
  grid-template-columns: repeat(auto-fit, auto);

  &__title {
    max-width: 100px;
    font-size: 1.1rem;
    font-weight: bold;
  }

  &__text {
    max-width: 100px;
    text-align: left;
  }
}
</style>