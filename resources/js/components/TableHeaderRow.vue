<template>
    <tr v-html="content">
        <component v-for="component in children" :key="component.handle" />
    </tr>
</template>

<script>
export default {
    props: {
        content: {

        },
        children: {

        }
    },
    watch: {
    },
    data() {
        return {
        }
    },
}
</script>