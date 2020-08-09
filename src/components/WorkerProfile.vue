<template lang="pug">
Spinner(v-if="isLoading")
.container(v-else)
  h2.title {{ profileData.name }}
  .inner-container
    img(:src="profileData.image")
    .info
      .info__item.item
        .item__title Логин:
        .item__text {{ profileData.login }}
      .info__item.item
        .item__title Email:
        .item__text {{ profileData.email }}
      .info__item.item 
        .item__title Должность:
        .item__text {{ profileData.worker.position }}
      .info__item.item
        .item__title Отдел:
        .item__text {{ profileData.worker.department }}
      .info__item.item
        .item__title Зачислен:
        .item__text {{ profileData.worker.adopted_at.split(' ')[0] }}
      .info__item.item
        .item__title О себе:
        .item__text {{ profileData.about }}
</template>

<script>
import Spinner from "../components/Spinner";

export default {
  components: {
    Spinner,
  },
  props: {
    service: Object,
  },
  data() {
    return {
      isLoading: true,
      profileData: {
        login: "",
        email: "",
        worker: {
          position: "",
          department: "",
          adopted_at: "",
        },
        about: "",
      },
    };
  },
  created: async function () {
    const id = this.$route.params.id;
    const res = await this.service.getWorkerProfile(id);
    this.profileData = { ...res };
    this.isLoading = false;
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
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 5vw;
  margin-top: 2.5rem;
}

.img {
  max-width: 300px;
}

.info {
  display: grid;
  grid-template-rows: repeat(6, minmax(40px, auto));
  max-width: 700px;
}

.item {
  display: grid;
  grid-template-columns: minmax(120px, 150px) minmax(300px, 1fr);
  font-weight: bold;
  text-align: left;

  &__title {
    font-size: 1.1rem;
  }

  &__text {
    text-align: left;
  }
}
@media screen and(max-width: 725px) {
  .inner-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    margin-top: 2.5rem;
  }
}

@media screen and(max-width: 440px) {
  .info {
    grid-gap: 10px;
  }

  .item {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>