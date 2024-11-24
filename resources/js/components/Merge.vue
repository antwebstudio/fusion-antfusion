<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-else>
        <component-container :components="fields" v-model="record" />
    </div>
</template>
<script>
export default {
    props: {
        parent: {

        },
        value: {
            default: {}
        },
        selectedRows: {

        },
    },
    data() {
        return {
            loading: false,
            fields: [],
            record: null,
        }
    },
    watch: {
        record: {
            deep: true,
            handler(value) {
                this.$emit('input', value)
            }
        }
    },
    mounted()
    {
        this.loadModal()
    },
    methods: {
        loadModal() {
            this.loading = true;
            axios.post(this.parent.params.url, { from: 'ajax-modal', records: this.selectedRows }).then((response) => {
                this.loading = false

                console.log(response);
                this.fields = response.data.fields
                // this.records = response.data.records

            }).catch((error) => {
                this.loading = false;
            })
        }
    }
}
</script>