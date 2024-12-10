<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-else>
        <div v-for="record, index in records">
            <component-container :components="fields" v-model="records[index]" />
            <hr v-if="index != records.length - 1"/>
        </div>
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
            records: this.records,
        }
    },
    watch: {
        records: {
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

                this.fields = response.data.fields
                this.records = response.data.records

            }).catch((error) => {
                this.loading = false;
            })
        }
    }
}
</script>