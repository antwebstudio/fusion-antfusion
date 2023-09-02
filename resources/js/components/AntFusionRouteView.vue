<template>
    <div>
        <component :is="componentName" v-bind="componentProps"></component>
    </div>
</template>
<script>
export default {
    data() {
        return {
            meta: null
        }
    },
    computed: {
        componentName() {
            return this.$route.meta.component;
        },
        componentProps() {
            if (this.meta) {
                return this.meta
            }
            return this.$route.meta.componentProps;
        },
    },

    beforeRouteEnter(to, from, next) {
        loadPage(to, from, (error, meta) => {
            if (error) {
                next((vm) => {
                    toast(error.toString(), 'danger')
                })
            } else {
                next((vm) => {
                    vm.meta = meta
                })
            }
        })
    },

    beforeRouteUpdate(to, from, next) {
        loadPage(to, from, (error, meta) => {
            if (error) {
                toast(error.toString(), 'danger')
            } else {
                this.meta = meta
            }
        })

        next()
    }
}
export function loadPage(to, from, callback) {
    // console.log('load page', to, from, location.query)
    axios.post(to.meta.api, Object.assign(to.query, to.params)).then((response) => {
        // console.log('page response', response.data)
        callback(null, response.data)
    }).catch(function(error) {
        callback(new Error('The requested entry could not be found'))
    })
}
</script>