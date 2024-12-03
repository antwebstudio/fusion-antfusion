export default {
    data() {
        return {
            working: false,
            action: null,
            bulk_actions: [],
            bulk_actions_exempt: [],
            showBulkActionConfirmation: false,
        }
    },
    computed: {
        hasBulkActions() {
            // console.log(this.bulk, this.selectable.length, this.allowedBulkActions.length)
            // if (! this.bulk) return false
            // if (! this.selectable.length > 0) return false
            if (! this.allowedBulkActions.length > 0) return false

            return true
        },
        allowedBulkActions() {
            let vm = this

            return _.filter(this.bulk_actions, (action) => {
                if (!action.permission) return true

                return vm.$can(action.permission)
            })
        },
    },
    methods: {
        cancelBulkAction() {
            this.showBulkActionConfirmation = false
            this.action = null
        },
        confirmBulkAction() {
            let vm = this

            this.working = true

            axios.post(`${this.bulk_actions[this.action].route}`, {
                records: this.selected
            }).then((response) => {
                toast('Bulk action completed successfully.', 'success')

                vm.getRecords()

                vm.showBulkActionConfirmation = false
                vm.selected = []
                vm.action = null
                vm.working = false
            })
        },
    }
}