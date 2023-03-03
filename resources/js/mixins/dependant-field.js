export default {
	methods: {
        registerComponentsDependency(children) {
            _.each(children, (component, fieldKey) => {
                // this.$set(this.componentsByHandle, component.id, component)
                if (component.dependsOn) {
                    this.registerWatch(component, children, fieldKey)
                }
            })  
        },
        registerWatch(fieldToBeUpdated, fieldCollections, fieldKey) {
            fieldToBeUpdated.dependsOn.forEach((attribute) => {
                // console.log('register watch for form ' + attribute)
                this.$watch('form.' + attribute, (value, oldValue) => {
                    this.syncDependantFields(fieldToBeUpdated, attribute, fieldCollections, fieldKey)
                }, { deep: true });
            })
        },
        syncDependantFields(fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey) {
            let params = {
                field: fieldToBeUpdated.handle,
                path: fieldToBeUpdated.path,
                attribute: dependsOnAttribute,
                form: this.form.data(),
            }
            axios.patch(this.syncDependantFieldUrl, params).then((response) => {
                let field = response.data
                console.log('before', fieldCollections[fieldKey])
                this.$set(fieldCollections, fieldKey, field)
                console.log('after', fieldCollections[fieldKey])
                // this.$set(this.componentsByHandle, field.id, field)
                // console.log(field)
            })
        },
	}
}