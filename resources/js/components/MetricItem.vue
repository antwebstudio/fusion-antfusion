<template>
    <div class="col px-1 w-1/2 sm:w-1/4 ">
        <div class="card">
            <div class="card__body">
                <fa-icon v-if="icon" :icon="['fas', icon]" fixed-width size="2x"></fa-icon>
                <div class="font-semibold uppercase">{{ label }}</div>
                <div class="text-2xl font-bold">{{ valueString }}</div>
                <div v-if="url" class="text-right"><a :href="url" class="">More</a></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {

        },
        label: {

        },
        value: {

        },
        url: {

        },
    },
    computed: {
        valueString() {
            if (this.value) {
                return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
}
</script>

<style>
    @media (min-width: 640px) {
        .sm\:w-1\/4 {
            width: 25%;
        }
    }
</style>