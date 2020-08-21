<template>
    <div class="s-text-field">
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

  private static _uid: number = 0;

  public created(): void {
    STextField._uid += 1;
  }
}
</script>

<style lang="scss" scoped>
.s-text-field {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  font-size: 16px;
  max-width: 100%;
  text-align: left;
  padding-top: 10px;

  &__slot {
    align-items: center;
    display: flex;
    position: relative;
    width: 100%;

    label {
      position: absolute;
      top: -10px;
      left: 0px;
      right: auto;
      font-size: 75%;
    }

    input {
      color: rgba(0, 0, 0, .9);
      flex: 1 1 auto;
      padding: 7px 0;
      max-width: 100%;
      min-width: 0;
      width: 100%;
      border-style: none;

      &:focus {
        outline: none;
      }
    }

    &:after {
      bottom: -1px;
      content: "";
      left: 0;
      position: absolute;
      transition: .3s cubic-bezier(.25,.8,.5,1);
      width: 100%;
      border-style: solid;
      border-width: thin 0 0;
      border-color:rgba(0, 0, 0, .4);
    }
  }

  &__icon {
    align-self: flex-start;
    display: inline-flex;
    margin-top: 4px;
    cursor: pointer;

    .s-icon {
      color: rgba(0, 0, 0, .5);
      align-items: center;
      display: inline-flex;
      height: 24px;
      flex: 1 0 auto;
      justify-content: center;
      min-width: 24px;
      width: 24px;
    }
  }
}
</style>
