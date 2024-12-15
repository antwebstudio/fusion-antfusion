<template>
    <div :class="containerClass" v-show="!hide">
        <label class="label" v-if="label">{{ label }}</label>

        <div v-if="html">
            <div v-if="content" v-html="content"></div>
            <div v-else v-html="value" ></div>
        </div>
        <div v-else >
            <div v-if="content">{{ content }}</div>
            <div v-else >{{ value }}</div>
        </div>
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
        html: {
            default: false,
        },
        label: {

        },
    },
}
</script>