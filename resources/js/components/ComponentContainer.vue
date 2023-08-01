<template>
    <div v-bind="$props" class="flex flex-wrap">
        <component
            :loading="loading"
            @load="onLoading" @loaded="onLoaded"
            v-for="(component, index) in processedComponents" :key="index"
            :is="component.component"
            v-bind="component"
            >
        </component>
    </div>
</template>

<script>
export default {
    props: {
        suffix: {

        },
        components: {

        }
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        componentExist(componentName) {
            return this.$options.components && this.$options.components[componentName]
        },
        onLoading() {
            this.loadingCount++
        },
        onLoaded() {
            this.loadingCount--
        }
    },
    computed: {
        processedComponents() {
            if (this.suffix) {
                return this.components.map((component) => {
                    let componentName = component.component + this.suffix
                    if (this.componentExist(componentName)) {
                        component.component = componentName
                    } 
                    return component
                })
            }
            return this.components
        },
        loading() {
            return this.loadingCount > 0
        }
    },
}
</script>

<style>

</style>