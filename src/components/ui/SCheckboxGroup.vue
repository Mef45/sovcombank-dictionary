<template>
    <span></span>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import SCheckbox from '@/components/ui/SCheckbox.vue';

    @Component({
        components: {
            SCheckbox,
        },
    })
    export default class SCheckboxGroup extends Vue {

    }
</script>

<style scoped>
</style>
