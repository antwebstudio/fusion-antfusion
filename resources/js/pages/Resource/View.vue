<template>
    <div>
        <!-- {{ meta }} -->
        
        <component-container v-if="meta && meta.children" suffix="_view" :components="meta.children" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            meta: null
        }
    },
    beforeRouteEnter(to, from, next) {
        axios.get(`/api/antfusion/resource/${to.params.resource}/${to.params.id}/view`)
            .then(response => {
                next(vm => {
                    vm.meta = response.data
                    vm.$emit('updateHead')
                })
            })
            .catch(() => {
                vm.$router.push(`/resource/${vm.$router.currentRoute.params.resource}`)

                toast('Requested entry could not be found.', 'danger')
            })
    }
}
</script>