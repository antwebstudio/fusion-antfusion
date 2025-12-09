<template>
    <div class="flex mt-3">
        <spinner v-if="loading" variant="black" />
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            default: false
        },
    },
}
</script>

<style>
</style>