<template>
    <div v-if="loading" :class="containerClass" v-show="!hide">
        <div v-html="loadingContent"></div>
    </div>
    <div v-else :class="containerClass" v-show="!hide">
        <div v-if="html_content" v-html="html_content"></div>
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
        loadingContent: {

        },
        content: {

        },
        record: {

        },
        value: {

        },
        action: {

        },
    },
    data() {
        return {
            loading: false,
            html_content: this.content,
        }
    },
    mounted()
    {
        if (this.action && this.action.url) {
            this.loadAjax()
        }
    },
    methods: {
        loadAjax() {
            this.loading = true;
            axios.post(this.action.url, this.action).then((response) => {
                this.loading = false
                
                this.html_content = response.data.content

            }).catch((error) => {
                this.loading = false;
            })
        }
    }
}
</script>