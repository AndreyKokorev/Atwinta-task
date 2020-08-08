<template lang="pug">
Spinner(v-if="isLoading")
.workers(v-else)
  .container
    .wrapper(:key="worker.id", v-for="worker in workersData")
      WorkerCart(:id="worker.id", :name="worker.name", :image="worker.image")
  .pagination
    button(
      :class="[!prevPage ? 'disabled' : null, 'prev-page-btn']",
      @click="switchPage(prevPage)",
      :disabled="!prevPage"
    )
    ul.pages-list(@click.capture="switchPage($event.target.textContent)")
      li.pages-list__item(:key="page", v-for="page in totalPages")
        div(:class="[currentPage == page ? 'active-page' : null]")
          | {{ page }}{{current_page}}
    button(
      :class="[!nextPage ? 'disabled' : null, 'next-page-btn']",
      @click="switchPage(nextPage), scrollPage()",
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
    service: Object,
  },
  data() {
    return {
      workersData: [],
      totalPages: "",
      nextPage: null,
      prevPage: null,
			current_page: null,
			isLoading: true
    };
  },
  created() {
    this.switchPage(1);
  },
  methods: {
    switchPage: async function (page) {
			this.isLoading = true;
      const res = await this.service.getWorkers(page);
      this.workersData = res.data;
			this.totalPages = res.last_page;
			this.currentPage = res.current_page;

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
			this.isLoading = false;
			console.log(this.currentPage)
		},

		scrollPage(){
			window.scrollTo(0,0);
		}
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
  }

  &__item:hover {
    font-weight: bold;
  }
}

button {
  position: absolute;
  width: 15px;
  height: 15px;
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
</style>
