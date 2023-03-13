<template>
    <div v-bind="$props">
        <component
            :loading="loading"
            @load="onLoading" @loaded="onLoaded"
            v-for="(component, index) in components" :key="index"
            :is="component.component"
            v-bind="component"
            >
        </component>
    </div>
</template>

<script>
export default {
    props: {
        components: {

        }
    },
    data() {
        return {
            loading: false,
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
}
</script>

<style>

</style>