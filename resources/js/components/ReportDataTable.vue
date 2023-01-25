<template>
    <div>
        <date-range-picker
            opens="right"
            :showDropdowns="true"
            :autoApply="true"
            v-model="dateRange"
        />

        <ui-table v-bind="$props" :endpoint="reportEndpoint">
            <template v-slot:actions="table">
                <div class="flex" v-if="table.record.actions">
                    <component @updated="reload" v-for="action, index in table.record.actions" :key="index" :is="action.component" v-bind="action">
                        {{ action.text }}
                    </component>
                </div>
            </template>
        </ui-table>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
    props: {
        id: {
            required: true,
            type: String
        },
        bulk: {
            type: Boolean,
            default: true
        },
        refresh: {
            type: Number|Boolean,
            default: false
        },
        noRecords: {
            type: String,
            default: 'No records to display'
        },
        endpoint: {
            required: true,
            type: String
        },
        sortBy: {
            type: String,
            default: 'id'
        },
        saveSortBy: {
            type: Boolean,
            default: true,
        },
        perPage: {
            type: Number,
            default: 10
        },
        sortIn: {
            type: String,
            default: 'asc'
        },
        noSearch: {
            type: Boolean,
            default: false
        },
        primaryKey: {
            required: false,
            type: String,
            default: 'id'
        },
        showPageStatus: {
            type: Boolean,
            default: false
        },
        showPageNumbers: {
            type: Boolean,
            default: false
        },
        showPageNav: {
            type: Boolean,
            default: false
        },
        showPageEnds: {
            type: Boolean,
            default: false
        },
        hidePageSelect: {
            type: Boolean,
            default: false
        },
        pageSelectLabel: {
            type: String,
            default: 'Page'
        },
        reorder_route: {
            type: String,
            default: ''
        },
        link_name: {
            type: String,
            default: ''
        },
        link_param: {
            type: String,
            default: ''
        },
        show_status: {
            type: Boolean,
            default: false
        },
        show_order: {
            type: Boolean,
            default: true
        },
        actions: {

        },
        
    },
    data() {
        return {
            dateRange: {
                startDate: new Date,
                endDate: new Date
            },
        }
    },
    computed: {
        reportEndpoint() {
            if (this.dateRange.startDate && this.dateRange.endDate) {
                let from = dayjs(this.dateRange.startDate).format('YYYY-MM-DD')
                let to = dayjs(this.dateRange.endDate).format('YYYY-MM-DD')
                return this.endpoint + '/from/' + from + '/to/' + to
            } else {
                return this.endpoint
            }
        }
    },
    methods: {
        reload() {
            bus().$emit('refresh-datatable-' + this.id)
        }
    }
}
</script>

<style>

</style>