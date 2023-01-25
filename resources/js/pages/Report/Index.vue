<template>
    <div>
        <portal to="title">
            <page-title :icon="page.icon">{{ page.title }}</page-title>
        </portal>

        <portal to="actions">
            <div>
                <component @submitted="load" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </div>
        </portal>

        <div v-if="meta && meta.components">
            <component
                class="form__group"
                v-for="(component, index) in meta.components" :key="index"
                :is="component.is"
                v-bind="component"
                >
            </component>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            meta: null,
            page: null,
            resource: null,
            actions: null,
        }
    },
    beforeRouteUpdate(to, from, next) {
        axios.get('/api/antfusion/report/' + to.params.report + '').then((response) => {
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
        axios.get('/api/antfusion/report/' + to.params.report + '').then((response) => {
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