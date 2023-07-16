<template>
    <div>
        <portal to="title">
            <page-title :icon="page.icon || 'layer-group'">{{ page.title }}</page-title>
        </portal>

        <portal to="actions">
            <span v-if="actions && actions.length" class="print:hidden">
                <component :loading="loading" @load="onLoading" @loaded="onLoaded" @submitted="load" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>

        <component-container :components="meta.components" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            loadingCount: 0,
            meta: null,
            page: null,
            resource: null,
            actions: null,
        }
    },
    methods: {
        onLoading() {
            this.loadingCount++
        },
        onLoaded() {
            this.loadingCount--
        }
    },
    computed: {
        loading() {
            return this.loadingCount > 0
        }
    },
    beforeRouteUpdate(to, from, next) {
        axios.get('/api/antfusion/page/' + to.params.page + '').then((response) => {
            this.meta = response.data
            this.page = response.data.page
            this.actions = response.data.actions
            console.log(response.data)
        }).catch((error) => {
            if (error.response.data.errors && error.response.data.errors['*']) {
                let errors = error.response.data.errors['*']
                toast(errors.join(' '), 'error')
            } else {
                toast(error.response.data.message, 'error')
            }
        })
    },
    beforeRouteEnter(to, from, next) {
        axios.get('/api/antfusion/page/' + to.params.page + '').then((response) => {
            next((vm) => {
                vm.meta = response.data
                vm.page = response.data.page
                vm.resource = response.data.resource
                vm.actions = response.data.actions
                console.log(response.data)
            })
        }).catch((error) => {
            if (error.response.data.errors && error.response.data.errors['*']) {
                let errors = error.response.data.errors['*']
                toast(errors.join(' '), 'error')
            } else {
                toast(error.response.data.message, 'error')
            }
        })
    }
}
</script>

<style>

</style>