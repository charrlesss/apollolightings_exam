export const useNavbar = defineStore('nav', {
	state: () => ({ drawer:true }),
	actions: {
		open_close() {
            this.drawer = !this.drawer
		},
	},
})
