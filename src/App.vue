<template lang="pug">
	#app
		#nav
			router-link( to='/login') Сотрудники
			router-link( to='/workers') Сотрудники
			router-link( to='/profile') Профиль
		//- authorization(v-show='!isAuthorized' :service='service')
		router-view(v-if="isAuthorized" :service='service')
</template>

<script>
import atwintaService from '../src/service/atwintaService';
import Authorization from './views/Authorization';

export default {
	data(){
		return {
			service: new atwintaService(),
			isAuthorized: false
		}
	},
	components: {
		Authorization
	},
	created() {
		
	}
}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
router-link {

}
#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
