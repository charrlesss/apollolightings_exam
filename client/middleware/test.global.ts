export default function (from: any) {
	if (from.matched.length <= 0) {
		return navigateTo('/404')
	}
}
