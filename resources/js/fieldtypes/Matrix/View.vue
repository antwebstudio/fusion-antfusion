<template>
    <div>
        {{ text }}
    </div>
</template>
<script>
export default {
    props: {
        field: {

        },
        value: {

        },
        settings: {
            
        },
    },
    computed: {
        text() {
            if (this.value.length) {
                return this.value[0].name
            }
        },
    }
}
</script>