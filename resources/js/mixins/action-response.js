export default {
	methods: {
        processActionResponse(response) {
            if (response.message) {
                toast(response.message, 'success')
            }
            if (response.redirect) {
                if (response.target) {
                    window.open(response.redirect, response.target)
                } else {
                    // location.href = response.redirect
                    this.$router.push(response.redirect)
                }
            }
        },
    }
}