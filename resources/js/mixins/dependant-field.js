export default {
    methods: {
        registerComponentsDependency(children, form, record) {
            _.each(children, (component, fieldKey) => {
                // this.$set(this.componentsByHandle, component.id, component)
                if (component.dependsOn) {
                    this.registerWatch(form, component, children, fieldKey, record)
                }

                if (component.children) {
                    // console.log('register for children', component.children)
                    this.registerComponentsDependency(component.children, form, record)
                }
            })
        },
        registerWatch(form, fieldToBeUpdated, fieldCollections, fieldKey, record) {
            fieldToBeUpdated.dependsOn.forEach((attribute) => {
                // console.log('register watch for form ' + attribute)
                this.$watch('form.' + attribute, (value, oldValue) => {
                    // form[attribute] = value
                    // console.log('attribute '+ attribute + ' updated', form.data(), this.form.formdata())
                    this.syncDependantFields(form, fieldToBeUpdated, attribute, fieldCollections, fieldKey, record)
                }, { deep: true });
            })
        },
        syncDependantFields(form, fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey, record) {
            console.log('sync fields')
            let params = {
                field: fieldToBeUpdated.handle,
                path: fieldToBeUpdated.path,
                attribute: dependsOnAttribute,
                form: form,
                record: record,
            }
            // console.log('sync field', this.form.data(), form.data())
            axios.patch(this.syncDependantFieldUrl, params).then((response) => {
                let field = response.data
                // console.log('before', fieldCollections[fieldKey])
                this.$set(fieldCollections, fieldKey, field)

                // Sync value if the value is set inside field
                if (field.value) {
                    form[field.handle] = field.value;
                }

                // console.log('after', fieldCollections[fieldKey])
                // this.$set(this.componentsByHandle, field.id, field)
                // console.log(field)
            })
        },
    }
}