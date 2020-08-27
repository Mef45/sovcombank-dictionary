<template>
    <div class="s-checkbox-group">
        <div class="s-checkbox-group__slot">
            <s-checkbox
                    v-for="(item, index) in items"
                    :key="`checkbox-${index}`"
                    v-model="internalModel"
                    :item="item"
                    @input="$emit('input', internalModel)"
            ></s-checkbox>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import SCheckbox from '@/components/ui/SCheckbox.vue';

    @Component({
        components: {
            SCheckbox,
        },
    })
    export default class SCheckboxGroup extends Vue {
        @Prop()
        public value!: any;

        @Prop()
        public items!: [];

        public internalModel: [] = [];

        public created(): void {
            this.internalModel = this.value;
        }
    }
</script>

<style scoped>
</style>
