<template>
    <div>
        <portal to="title">
            <page-title :icon="resource.icon">{{ meta.title }}</page-title>
        </portal>

        <portal to="actions">
            <div v-if="actions && actions.length" >
                <span v-for="action, index in actions" :key="index">
                    <component v-if="!action.dropdown" @submitted="load" :is="action.component" v-bind="action">
                        {{ action.text }}
                    </component>
                </span>
                <ui-actions v-if="dropdownActions && dropdownActions.length" :id="'entry_actions'" :key="'entry_actions'">
                    <div v-for="action, index in actions" :key="index">
                        <component v-if="action.dropdown" @submitted="load" :is="action.component" v-bind="action">
                            {{ action.text }}
                        </component>
                    </div>
                </ui-actions>
            </div>
        </portal>

        <div v-if="meta && meta.components">
            <component
                class="form__group"
                v-for="(component, index) in meta.components" :key="component.id"
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
            resource: null,
            actions: null,
        }
    },
    computed: {
        dropdownActions() {
            return this.actions.filter(action => action.dropdown)
        }
    },
    beforeRouteUpdate(to, from, next) {
        axios.get('/api/antfusion/resource/' + to.params.resource + '').then((response) => {
            this.meta = response.data
            this.actions = response.data.actions
            console.log(response.data)

            next()
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
        axios.get('/api/antfusion/resource/' + to.params.resource + '').then((response) => {
            next((vm) => {
                vm.meta = response.data
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