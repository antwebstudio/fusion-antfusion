<template>
    <div :class="containerClass" v-show="!hide">
        <div v-if="content" v-html="content"></div>
        <div v-else v-html="value" ></div>
    </div>
</template>

<script>
export default {
    props: {
        hide: {
            default: false,
        },
        containerClass: {

        },
        content: {

        },
        record: {

        },
        value: {

        },
    },
}
</script>