<script> 
import DataTable from '@/ui/Table/Table'
import queryString from 'query-string'

export default {
    props: {
        filters: {
        },
    },
    extends: DataTable,
    watch: {
        filters: {
            handler(value) {
                this.getRecords()
            },
            deep: true,
        }
    },
    methods: {
        getQueryParameters() {
            let params = {
                sort:    (this.sort.order === 'desc' ? '-' : '') + this.sort.key,
                page:    this.pagination.currentPage,
                perPage: this.pagination.perPage,
            }

            if (this.filters) {
                Object.keys(this.filters).forEach((key) => {
                    params['filter['+ key + ']'] = this.filters[key]
                })
            }

            if (this.search !== '') {
                params['filter[search]'] = this.search
            }

            return queryString.stringify(params)
        },
    }
}
</script>

<style>

</style>