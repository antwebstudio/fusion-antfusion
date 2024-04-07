<template>
    <div v-if="wrap" v-bind="$props" class="flex flex-wrap">
        <component
            :loading="loading"
            @load="onLoading" @loaded="onLoaded"
            v-for="(component, index) in processedComponents" :key="index"
            :is="component.component"
            v-bind="component"
            v-model="loadedRecord[component.handle]"
            >
        </component>
    </div>
    <fragment v-else>
        <component
            :loading="loading"
            @load="onLoading" @loaded="onLoaded"
            v-for="(component, index) in processedComponents" :key="index"
            :is="component.component"
            v-bind="component"
            v-model="loadedRecord[component.handle]"
            >
        </component>
    </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
    props: {
        value: {

        },
        record: {
            default: {}
        },
        wrap: {
            default: false,
        },
        suffix: {

        },
        components: {
            Fragment,
        }
    },
    watch: {
        loadedRecord: {
            deep: true,
            handler(value) {
                this.$emit('input', value)
            }
        }
    },
    data() {
        return {
            loadedRecord: Object.assign({}, this.value, this.record),
            loadingCount: 0,
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