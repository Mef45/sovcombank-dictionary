<template>
    <div class="s-text-field">
        <label for="">{{ label }}</label>
        <input
                type="text"
                :placeholder="placeholder"
        />
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

      public internalModel: string | number | null = null;

      public created(): void {
        // console.log(this.value);
      }
    }
</script>

<style lang="scss" scoped>
.s-text-field {

}
</style>
