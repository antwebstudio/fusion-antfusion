export default {
	methods: {
        registerComponentsDependency(children, form) {
            _.each(children, (component, fieldKey) => {
                // this.$set(this.componentsByHandle, component.id, component)
                if (component.dependsOn) {
                    this.registerWatch(form, component, children, fieldKey)
                }

                if (component.children) {
                    // console.log('register for children', component.children)
                    this.registerComponentsDependency(component.children, form)
                }
            })  
        },
        registerWatch(form, fieldToBeUpdated, fieldCollections, fieldKey) {
            fieldToBeUpdated.dependsOn.forEach((attribute) => {
                // console.log('register watch for form ' + attribute)
                this.$watch('form.' + attribute, (value, oldValue) => {
                    // form[attribute] = value
                    // console.log('attribute '+ attribute + ' updated', form.data(), this.form.formdata())
                    this.syncDependantFields(form, fieldToBeUpdated, attribute, fieldCollections, fieldKey)
                }, { deep: true });
            })
        },
        syncDependantFields(form, fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey) {
            let params = {
                field: fieldToBeUpdated.handle,
                path: fieldToBeUpdated.path,
                attribute: dependsOnAttribute,
                form: form.data(),
            }
            // console.log('sync field', this.form.data(), form.data())
            axios.patch(this.syncDependantFieldUrl, params).then((response) => {
                let field = response.data
                // console.log('before', fieldCollections[fieldKey])
                this.$set(fieldCollections, fieldKey, field)

                // console.log('field updated '+ fieldKey)

                // console.log('after', fieldCollections[fieldKey])
                // this.$set(this.componentsByHandle, field.id, field)
                // console.log(field)
            })
        },
	}
}