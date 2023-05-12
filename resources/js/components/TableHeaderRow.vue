<template>
    <tr v-if="content" v-html="content">
    </tr>
    <tr v-else >
        <!-- <component v-for="component in children" :key="component.handle" /> -->
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