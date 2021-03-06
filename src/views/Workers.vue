<template lang="pug">
Spinner(v-if="LOADING_INDICATOR")
.workers(v-else)
  .container
    .wrapper(
      @click.capture="$router.push(`/workers/${worker.id}`)",
      :key="worker.id",
      v-for="worker in WORKERS_DATA"
    )
      WorkerCard(:id="worker.id", :name="worker.name", :image="worker.image")
  .pagination
    button(
      :class="[!PAGE_DATA.prevPage ? 'disabled' : null, 'prev-page-btn']",
      @click="switchPage(PAGE_DATA.prevPage)",
      :disabled="!PAGE_DATA.prevPage"
    )
    ul.pages-list(@click.capture="switchPage($event.target.textContent)")
      li.pages-list__item(:key="page", v-for="page in PAGE_DATA.totalPages")
        div(:class="{ 'active-page': PAGE_DATA.currentPage == page }")
          | {{ page }}
    button(
      :class="[!PAGE_DATA.nextPage ? 'disabled' : null, 'next-page-btn']",
      @click="switchPage(PAGE_DATA.nextPage), scrollPage()",
      :disabled="!PAGE_DATA.nextPage"
    )
</template>

<script>
import WorkerCard from "../components/WorkerCard";
import Spinner from "../components/Spinner";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    WorkerCard,
    Spinner,
  },
  created() {
    this.switchPage();
  },
  computed: {
    ...mapGetters(['LOADING_INDICATOR', 'WORKERS_DATA','PAGE_DATA']),
  },
  methods: {
    ...mapActions([
			'SWITCH_LOADING_INDICATOR',
			'GET_WORKERS_PAGE_DATA_FROM_API'
			]),

    switchPage: async function (page) {
      this.SWITCH_LOADING_INDICATOR(true);
			await this.GET_WORKERS_PAGE_DATA_FROM_API(page);  
      this.SWITCH_LOADING_INDICATOR(false);
    },

    scrollPage() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.workers {
  display: grid;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
}

.container {
  display: grid;
  //justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
  //justify-content: center;
  grid-gap: 20px;
}

.wrapper {
  //width: 100%;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

img {
  max-width: 100%;
}

.pagination {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 320px;
  margin: 50px 0;
  padding: 0 10px;
}

.pages-list {
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  align-items: center;
  height: 20px;
  margin: 0 10px;
  padding: 0;
  list-style: none;

  &__item {
    width: 11%;
    transition: 150ms;

    &:hover {
      cursor: pointer;
    }
  }

  &__item:hover {
    font-weight: bold;
  }
}

button {
  position: absolute;
  width: 15px;
  height: 16px;
  border-width: 0px;
  border-left: 2px solid black;
  border-top: 2px solid black;
  background: transparent;
  outline: none;
  transition: 200ms;
}

button:hover:not(:disabled) {
  filter: drop-shadow(0 0 3px rgb(21, 21, 185));
}

.next-page-btn {
  right: 5px;
  transform-origin: 50% 50%;
  transform: rotate(135deg);

  &:active {
    right: 2px;
  }
}

.prev-page-btn {
  left: 5px;
  transform-origin: 50% 50%;
  transform: rotate(-45deg);

  &:active {
    left: 2px;
    transform-origin: 50% 50%;
    transform: rotate(-45deg);
  }
}

.disabled {
  border-color: rgb(194, 193, 193);
}

.active-page {
  color: blue;
}

@media screen and(max-width: 1200px) {
  .container {
    //grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  }

  .wrapper {
    width: 100%;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
