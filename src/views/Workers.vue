// <template lang="pug">
//   .workers
//     .container
  .wrapper(v-for="for worker in workersData")
//          <WorkerCart :name="worker.name" :image="worker.image"></WorkerCart>
// 
</template>
<template lang="pug">
.workers
  .container
    .wrapper(:key="worker.id", v-for="worker in workersData")
      WorkerCart(:id="worker.id", :name="worker.name", :image="worker.image")
  .pagination
    button(
      :class="[!prevPage ? 'disabled' : null, 'prev-page-btn']",
      @click="switchPage(prevPage)",
      :disabled="!prevPage"
    )
    ul.pages-list(@click.capture="switchPage($event)")
      li.pages-list__item(:key="page", v-for="page in totalPages")
        div(:class="[currentPage == page ? 'active-page' : null]")
          | {{ page }}
    button(
      :class="[!nextPage ? 'disabled' : null, 'next-page-btn']",
      @click="switchPage(nextPage)",
      :disabled="!nextPage"
    )
</template>

<script>
import WorkerCart from "../components/WorkerCart";
import Spinner from "../components/Spinner";

export default {
  components: {
    WorkerCart,
    Spinner,
  },
  props: {
    service: Object
  },
  data() {
    return {
      workersData: [],
      totalPages: "",
      nextPage: null,
      prevPage: null,
      currentPage: null,
    };
  },
  created() {
    this.switchPage(1);
  },

  methods: {
    switchPage: async function (page) {
      console.log(page);
      const res = await this.service.getWorkers(page);

      this.workersData = res.data;
      this.totalPages = res.last_page;

      if (res.next_page_url) {
        this.nextPage = res.next_page_url[res.next_page_url.length - 1];
      } else {
        this.nextPage = false;
      }

      if (res.prev_page_url) {
        this.prevPage = res.prev_page_url[res.prev_page_url.length - 1];
      } else {
        this.prevPage = false;
      }
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
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  grid-gap: 20px;
}

.wrapper {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pagination {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 300px;
  margin: 50px 0;
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
    transition: 150ms;
  }

  &__item:hover {
    font-size: 25px;
    margin-left: -2px;
    margin-right: -2px;
    filter: drop-shadow(0 0 5px black);
  }
}

button {
  position: absolute;
  width: 15px;
  height: 15px;
  border-width: 0;
  border-left: 2px solid black;
  border-top: 2px solid black;
  background: transparent;
  transition: 200ms;
}

button:hover {
  width: 17px;
  height: 17px;
}

button:active {
  box-shadow: none;
}

.next-page-btn {
  right: -15px;
  transform-origin: 50% 50%;
  transform: rotate(135deg);
}

.prev-page-btn {
  left: -15px;
  transform-origin: 50% 50%;
  transform: rotate(-45deg);
}

.disabled {
  border-color: rgb(194, 193, 193);
}

.active-page {
  color: blue;
}
</style>
