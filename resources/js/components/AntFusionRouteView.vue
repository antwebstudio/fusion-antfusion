<template>
    <div>
        <component :is="componentName" v-bind="componentProps"></component>
    </div>
</template>
<script>
export default {
    computed: {
        componentName() {
            return this.$route.meta.component;
        },
        componentProps() {
            return this.$route.meta.componentProps;
        }
    }
}
</script>