<template>
    <span>
        <ui-button :loading="loading" v-bind="$props" @click="submit">{{ text }}</ui-button>
    </span>
</template>

<script>
export default {
    props: {
        form: {

        },
        record: {

        },
        text: {

        },
        parent: {
            
        },
        variant: {

        },
        url: {

        },
        path: {

        },
        submitParams: {
            default() {
                return {}
            }
        },
        useParentSubmit: {
            default: false,
        },
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        submit() {
            if (this.useParentSubmit) {
                this.parent.submit()
            } else {
                let params = this.form ? this.form.data() : this.record.data()
                params = Object.assign(this.submitParams, params)
                params['path'] = this.path
                
                this.loading = true;
                (this.form ? this.form : this.record).submit('post', this.url, params).then((response) => {
                    this.loading = false
                    this.$emit('submitted')
                    this.$emit('refreshed')

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
                }).catch((error) => {
                    this.loading = false
                    
                    if (error.errors) {
                        this.errors = error.errors
                        var message = Object.keys(error.errors).map((key) => {
                            return error.errors[key].join(' ');
                        }).join(' ')

                        toast(message, 'failed')
                    } else {
                        toast(error.message, 'failed')
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>