<template>
    <div>
        <component v-for="component, index in components" :key="index" :is="component.component" v-bind="component" />
    </div>
</template>

<script>
export default {
    props: {
        components: {

        }
    }
}
</script>

<style>

</style>