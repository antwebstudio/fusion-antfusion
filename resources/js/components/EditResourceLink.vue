<template>
    <div class="items-center">
        <router-link :to="{ name: 'antfusion.resource.edit', params: { resource: record.resource.slug, id: record.id } }">{{ value }}</router-link>
    </div>
</template>

<script>
export default {
    props: {
        value: {

        },
        record: {

        },
        resource: {

        },
    }
}
</script>

<style>

</style>