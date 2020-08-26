<template>
    <div class="s-text-field">
        <div class="s-text-field__control">
            <div class="s-text-field__slot">
                <label :for="`input-${_uid}`">{{ label }}</label>
                <input
                        :id="`input-${_uid}`"
                        :value="value"
                        type="text"
                        :placeholder="placeholder"
                        @input="$emit('input', $event.target.value)"
                        @keydown.enter="$emit('submit', $event.target.value)"
                />

                <div
                        v-if="icon"
                        class="s-text-field__icon"
                >
                    <div class="s-icon">
                        <font-awesome-icon :icon="icon"></font-awesome-icon>
                    </div>
                </div>
            </div>
            <div
                    :class="{ 's-text-field__progress--active': loading }"
                    class="s-text-field__progress"
            >
                <div class="background"></div>
                <div class="long"></div>
                <div class="short"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class STextField extends Vue {
        @Prop()
        public value!: string | number | null;

        @Prop({ type: String, default: undefined })
        public label!: string;

        @Prop({ type: String, default: undefined })
        public placeholder!: string;

        @Prop({ type: String, default: undefined })
        public icon!: string;

        @Prop({ type: Boolean, default: false })
        public loading!: boolean;

        private static _uid: number = 0;

        public created(): void {
            STextField._uid += 1;
        }
    }
</script>

<style lang="scss" scoped>
</style>
