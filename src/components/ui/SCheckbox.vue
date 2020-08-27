<template>
    <label>
        <input
                :id="`checkbox-${_uid}`"
                v-model="internalModel"
                type="checkbox"
                :value="item"
                @change="onChange"
        />
        {{ item }}
    </label>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class SCheckbox extends Vue {
        @Prop()
        public value!: any;

        @Prop()
        public item!: any;

        public internalModel: any = null;

        private static _uid: number = 0;

        public created(): void {
            SCheckbox._uid += 1;
            this.internalModel = this.value;
        }

        public onChange(event: any): void {
            let currentValue = [...this.value];
            if (event.target.checked) {
                currentValue.push(event.target.value);
            } else {
                currentValue = currentValue.filter(item => item !== event.target.value);
            }

            this.$emit('input', currentValue);
        }
    }
</script>

<style scoped>
</style>
