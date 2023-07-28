<template>
    <div>
        <portal to="title">
            <page-title :icon="page.icon || 'layer-group'">{{ page.title }}</page-title>
        </portal>

        <portal to="actions">
            <span v-if="meta" class="print:hidden">
                <component :route="route" :loading="loading" @load="onLoading" @loaded="onLoaded" @submitted="refresh" v-for="action, index in meta.actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>

        <span v-if="meta.debug">{{ meta }}</span>

        <component-container :components="meta.components" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            meta: {},
        }
    },
    methods: {
        refresh() {
            this.$bus.$emit('refresh')
        }
    },
    computed: {
        route() {
            return this.$route.params
        },
        page() {
            if (this.meta.page) return this.meta.page
            return {}
        }
    },

    beforeRouteUpdate(to, from, next) {
        getPage(this.page, to, (response) => {
            this.meta = response.data
            next()
        })
    },
    beforeRouteEnter(to, from, next) {
        getPage(to, (response) => {
            next((vm) => {
                vm.meta = response.data
            })
        })
    }
}
export function getPage(to, callback) {
    axios.get(`/api/antfusion/page/${to.meta.page || to.params.page}`, { params: to.params }).then((response) => {
        callback(response)
    }).catch((error) => {
        if (error.response.data.errors && error.response.data.errors['*']) {
            let errors = error.response.data.errors['*']
            toast(errors.join(' '), 'error')
        } else {
            toast(error.response.data.message, 'error')
        }
    })
}
</script>

<style>

</style>