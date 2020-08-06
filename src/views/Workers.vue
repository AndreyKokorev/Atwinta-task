<template>
  <div class="workers">
    <h1>Workers</h1>
  </div>
</template>

<script>
export default {
  props: ['service', 'isLoggedIn'],
  data() {
    return {
      
    }
  },
  created: async function()  {
    if (this.isLoggedIn === false) {
      this.$router.push('login');
    } else {
      const res = await this.service.getWorkers();
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
