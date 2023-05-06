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
        getRecords() {
            this.loading = true

            return axios.get(`${this.endpoint}?${this.getQueryParameters()}`).then((response) => {
                this.records = response.data.records.data
                this.displayable = response.data.displayable
                this.sortable = response.data.sortable
                this.column_names = response.data.column_names
                this.column_types = response.data.column_types
                this.bulk_actions = response.data.bulk_actions
                this.bulk_actions_exempt = response.data.bulk_actions_exempt
                this.pagination.totalRecords = response.data.records.total
                this.pagination.totalPages = response.data.records.last_page

                this.$emit('update-metrics', response.data.metrics)

                this.loading = false
                this.initialLoad = false

                if (this.refresh && ! self._timer) {
                    this._timer = setTimeout(() => this.getRecords(), this.refresh)
                }

                this.$emit('loaded', this.records)
            })
        },
        getQueryParameters() {
            let params = {
                sort:    (this.sort.order === 'desc' ? '-' : '') + this.sort.key,
                page:    this.pagination.currentPage,
                perPage: this.pagination.perPage,
            }

            if (this.filters) {
                Object.keys(this.filters).forEach((key) => {
                    if (typeof(this.filters[key]) == 'object') {
                        params['filter['+ key + '][]'] = this.filters[key]
                    } else {
                        params['filter['+ key + ']'] = this.filters[key]
                    }
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