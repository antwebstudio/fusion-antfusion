export default {
    methods: {
        catchError(error) {
            this.loading = false
            console.log('errors', error.response)
            if (error.response.data.errors && error.response.data.errors['*']) {
                let errors = error.response.data.errors['*']
                toast(errors.join(' '), 'error')
            } else {
                toast(error.response.data.message, 'error')
            }
        }
    }
}