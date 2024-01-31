<template>
    <div>
        <img :src="imageSrc" :style="imageStyle" />
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
        imageSrc() {
            if (this.value.length) {
                return this.value[0].url
            }
        },
        imageStyle() {
            if (this.settings && this.settings.style) {
                return this.settings.style
            }
            return {
                
            }
        }
    }
}
</script>