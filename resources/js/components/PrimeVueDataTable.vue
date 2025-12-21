<template>
    <div>
        <div v-if="hasError" class="p-2 flex flex-col border py-4">
            <div class="mx-auto"><h2>Error</h2></div>
            <p class="mx-auto text-center">Please try again later</p>
            <div class="mx-auto"><a @click="getRecords" class="button">Retry</a></div>
        </div>

        <DataTable v-else :lazy="true" :totalRecords="pagination.totalRecords" :rowsPerPageOptions="pagination.perPageOptions" :loading="loading" :paginator="true" :rows="10" ref="dt" :value="records"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput RowsPerPageDropdown"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            :selection.sync="selectedRecords" dataKey="id"
            stateStorage="local" :stateKey="stateKey"
            @page="onPage($event)" @sort="onSort($event)" @state-restore="onStateRestore"
        >
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter()"/>
                    <span class="p-input-icon-left ml-2">
                        <i class="pi pi-search" />
                        <InputText v-model="search" placeholder="Keyword Search" />
                    </span>
                </div>
                <div v-if="selectedRecords && selectedRecords.length">
                    <div class="my-2">Selected {{ selectedRecords.length }}: <span v-for="book in selectedRecords" :key="book.id" class="badge mr-2">{{ book.name }}</span></div>
                    <div class="flex">
                        <Button @click="clearSelected" class="p-button-sm">Clear all selected</Button>

                        <slot name="bulkActions" :allowedBulkActions="allowedBulkActions" :selected="selected" :parent="self">
                        </slot>
                    </div>
                </div>
                        
                <!-- modal for bulk actions -->
            </template>
            <template #empty>
                {{ noRecords }}
            </template>
            <template #loading>
                {{ loadingMessage }}
            </template>

            <Column selectionMode="multiple" :headerStyle="{'width': '3em'}" v-if="hasBulkActions"></Column>

            <Column v-for="column in displayableColumns" :key="column.field" v-bind="column" :sortable="sortable.includes(column.field)">
                <template #body="slotProps">
                    <component
                        v-if="column_types[column.field] && isComponentExist(column_types[column.field])" 
                        v-show="!column_props[column.field].show_in_filters || filters[column_props[column.field].show_in_filters.name] == column_props[column.field].show_in_filters.value"
                        :is="column_types[column.field]"
                        v-bind="column_props[column.field]"
                        :value="slotProps.data[column.field]"
                        :record="slotProps.data"
                    />
                    <span v-else >{{ slotProps.data[column.field] }}</span>
                </template>
            </Column>

            <!-- actions -->
            <Column v-if="displayableColumns" :exportable="false" :styles="{'min-width':'8rem'}">
                <template #body="slotProps">
                    <div class="flex justify-end" v-if="slotProps.data.actions && slotProps.data.actions.length">
                        <component :form="false" :record="slotProps.data" @submitted="reload" @updated="reload" v-for="action, index in slotProps.data.actions" :key="index" :is="action.component" v-bind="action">
                            {{ action.text }}
                        </component>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import queryString from 'query-string'
import axios from 'axios'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import hasBulkActions from '../mixins/hasBulkActions';

import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';              //core css
// import 'primeicons/primeicons.css';                 //icons

export default {
    mixins: [hasBulkActions],
    components: {
        DataTable, 
        Column,
        InputText,
        Button,
    },
    props: {
        id: {
            required: true,
            type: String
        },
        // bulk: {
        //     type: Boolean,
        //     default: true
        // },
        // refresh: {
        //     type: Number|Boolean,
        //     default: false
        // },
        sortBy: {
            type: String,
            default: 'id'
        },
        saveState: {
            type: Boolean,
            default: false,
        },
        perPage: {
            type: Number,
            default: 10
        },
        sortIn: {
            type: String,
            default: 'asc'
        },
        loadingMessage: {
            type: String,
            default: 'Loading... Please wait.'
        },
        noRecords: {
            type: String,
            default: 'No records to display.'
        },
        filters: {
        },
        endpoint: {
            required: true,
            type: String
        },
        endpoint_params: {
            default: {}
        },
    },
    mounted() {
        // this.lazyParams = {
        //     first: 0,
        //     rows: this.$refs.dt.rows,
        //     sortField: null,
        //     sortOrder: null,
        //     filters: this.filters
        // };

        this.listenForEvents();
        this.getRecords();
    },
    watch: {
        filters: {
            handler(value) {
                this.getRecords()
            },
            deep: true,
        },
        endpoint() {
            this.getRecords()
        },
        search: _.debounce(function(value) {
            // this.pagination.currentPage = 1
            this.$emit('onSearch', value)

            this.getRecords()
        }, 300)
    },
    data() {
        return {
            currentController: null,
            hasError: false,
            loading: false,
            records: null,
            displayable: null,
            sortable: [],
            search: null,
            
            sort: {
                key: this.sortBy,
                order: this.sortIn,
            },
            pagination: {
                totalRecords: 0,
                currentPage: 1,
                totalPages: 0,
                perPage: this.perPage,
                perPageOptions: [
                    10,
                    20,
                    50,
                    100,
                    250
                ]
            },
            selectedRecords: null,
            // selectAll: false,
            // filters: {
            //     'name': {value: '', matchMode: 'contains'},
            //     'country.name': {value: '', matchMode: 'contains'},
            //     'company': {value: '', matchMode: 'contains'},
            //     'representative.name': {value: '', matchMode: 'contains'},
            // },
        }
    },
    computed: {
        self() {
            return this;
        },
        stateKey() {
            if (this.saveState) {
                return 'ui-table-sort-' + this.id + '-' + this.endpoint + '-' + window.location.pathname;
            }
        },
        selected() {
            return this.selectedRecords.map((record) => record.id);
        },
        displayableColumns() {
            if (this.displayable) {
                return this.displayable.map((displayable) => {
                    return {
                        ...this.column_props,
                        type: this.column_types[displayable],
                        header: this.column_names[displayable],
                        field: displayable,
                    }
                });
            }
        }
    },
    methods: {
        reload() {
            this.getRecords()
        },
        clearFilter() {
            this.search = null;
        },
        clearSelected() {
            this.selectedRecords = [];
        },
        listenForEvents() {
            bus().$on('refresh-datatable-' + this.id, (data) => {
                this.getRecords()
            })
        },
        onStateRestore(event) {
            this.selectedRecords = event.selection
            // this.pagination.currentPage = event.page + 1;
            this.pagination.perPage = event.rows;
            if (event.sortField) {
                console.error(event.sortField);
                this.sort.key = event.sortField;
                this.sort.order = event.sortOrder > 0 ? 'asc' : 'desc';
                this.$emit('onSort', this.sort)
            }
        },
        onPage(event) {
            console.log(event)
            this.pagination.currentPage = event.page + 1;
            this.pagination.perPage = event.rows;
            this.getRecords();
        },
        onSort(event) {
            this.sort.key = event.sortField;
            this.sort.order = event.sortOrder > 0 ? 'asc' : 'desc';
            this.$emit('onSort', this.sort);
            this.getRecords();
        },
        isComponentExist(componentName) {
            return componentName in this.$options.components
        },
        getQueryParameters() {
            let params = {
                ... this.endpoint_params,
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

        getRecords() {
            this.loading = true
            this.hasError = false

            if (this.currentController) {
                this.currentController.abort();
            }

            this.currentController = new AbortController();

            return axios.get(`${this.endpoint}?${this.getQueryParameters()}`, {
                signal: this.currentController.signal
            }).then((response) => {
                this.records = response.data.records.data
                this.displayable = response.data.displayable
                this.sortable = response.data.sortable
                this.column_names = response.data.column_names
                this.column_types = response.data.column_types
                this.column_props = response.data.column_props
                this.bulk_actions = response.data.bulk_actions
                // this.bulk_actions_exempt = response.data.bulk_actions_exempt
                this.pagination.totalRecords = response.data.records.total
                this.pagination.totalPages = response.data.records.last_page

                this.loading = false

                // this.initialLoad = false

                // if (this.refresh && ! self._timer) {
                //     this._timer = setTimeout(() => this.getRecords(), this.refresh)
                // }

                // this.$emit('loaded', this.records)
            }).catch((error) => {
                if (axios.isCancel(error) || error.name === 'CanceledError') {
                } else {
                    this.hasError = true
                    this.loading = false
                }
            })
        },
    }
}
</script>