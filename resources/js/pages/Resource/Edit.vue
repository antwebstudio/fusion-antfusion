<template>
    <div class="resource-page">
        <portal to="title">
            <page-title :icon="resource.icon || 'pencil-alt'" :subtitle="meta.subtitle">{{ meta.title }}</page-title>
        </portal>

        <shared-form
            v-if="form"
            :loading="loading"
            :form="form"
            :actions="meta.actions"
            :meta="meta"
            :resource="resource">
        </shared-form>
    </div>
</template>

<script>
    import Form from '@/services/Form'
    import SharedForm from './SharedForm'

    export default {
        head: {
            title() {
                return {
                    inner: this.resource.name || 'Loading...'
                }
            }
        },

        data() {
            return {
                meta: null,
                resource: null,
                form: null,
                record: null,
                loading: false
            }
        },

        components: {
            'shared-form': SharedForm
        },

        methods: {
            submit() {
                this.loading = true;
                this.form.patch(`/api/antfusion/resource/${this.resource.slug}/${this.record.id}`).then((response) => {
                    toast('Entry saved successfully', 'success')

                    this.$router.push(`/resource/${this.resource.slug}`)
                }).catch((error) => {
                    this.loading = false;
                    if (error.errors) {
                        this.errors = error.errors
                        var message = Object.keys(error.errors).map((key) => {
                            return error.errors[key].join(' ');
                        }).join(' ')

                        toast(message, 'failed')
                    } else {
                        toast(error.message, 'failed')
                    }
                })
            },
        },

        beforeRouteEnter(to, from, next) {
            axios.get(`/api/antfusion/resource/${to.params.resource}/${to.params.id}/edit`)
                .then(response => {
                    next(vm => {
                        let meta = response.data
                        let resource = response.data.resource
                        let record = response.data.record
                        let form = {
                            name: '',
                            slug: '',
                            publish_at: null,
                            expire_at: null,
                            status: 1,
                        }

                        _.each(meta.fields, (field) => {
                            form[field.field.handle] = _.get(record, field.field.handle)
                        })

                        vm.meta = meta
                        vm.resource = resource
                        vm.record = record
                        vm.form = new Form(form, true)

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