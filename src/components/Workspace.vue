<template>
    <div class="workspace">
        <div class="container">
            <div class="row">
                <div class="column col-3">
                    <s-text-field
                            v-model="searchCondition"
                            label="Поиск"
                            placeholder="Введите значение"
                            icon="search"
                            @submit="performSearch"
                    ></s-text-field>
                </div>

                <div class="column col-9">
                    <s-list>
                        <s-list-item
                                v-for="(item, index) in searchResults"
                                :key="`result-${index}`"
                        >
                            {{ item.word }}
                        </s-list-item>
                    </s-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'

import { Component, Prop, Vue } from 'vue-property-decorator';

import STextField from './ui/STextField.vue';
import SList from './ui/SList.vue';
import SListItem from './ui/SListItem.vue';

@Component({
  components: {
    STextField,
    SList,
    SListItem,
  },
})
export default class Workspace extends Vue {
  @Prop() private msg!: string;

  public searchCondition: string | null = null;

  public searchResults: IDictionary | null = null;

  public async performSearch(searchCondition: string): Promise<void> {
    const { data } = await axios.get('/api/words', {
      params: {
        sp: `${searchCondition}*`,
        md: 'dpr',
      },
    });

    this.searchResults = data;
  }
}

export interface IDictionary {
  word: string;
  defs: string[];
  tags: string[];
  score: number;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
