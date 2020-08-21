<template>
    <div class="workspace">
        <s-text-field
                v-model="searchCondition"
                label="Поиск"
                placeholder="Введите искомое значение"
                @submit="performSearch"
        ></s-text-field>

        {{ searchCondition }}

        <template
                v-for="(item, index) in searchResults"
        >
            <div :key="`result-${index}`">
                {{ item }}
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import axios from 'axios'

import { Component, Prop, Vue } from 'vue-property-decorator';

import STextField from './ui/STextField.vue';

@Component({
  components: {
    STextField,
  },
})
export default class Workspace extends Vue {
  @Prop() private msg!: string;

  public searchCondition: string | null = null;

  // TODO: типизировать
  public searchResults: any = null;

  public async performSearch(searchCondition: string): Promise<void> {
    const { data } = await axios.get('/api/words', {
      params: {
        sp: `${searchCondition}*`,
        md: 'dp',
      },
    });

    this.searchResults = data;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
