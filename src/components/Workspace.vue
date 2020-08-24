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

                            <template v-slot:content>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tellus efficitur massa rhoncus laoreet. Mauris lobortis arcu at est fringilla cursus. Suspendisse consectetur nisl nisi, gravida iaculis mauris tempus non. Sed ultrices ultrices bibendum. Sed consectetur sapien ut pharetra elementum. Quisque blandit tortor non dictum tempor. Donec pretium felis tristique massa condimentum viverra. Vivamus pellentesque imperdiet libero. Curabitur ac dui id dui tincidunt efficitur. Pellentesque ornare lectus eu rutrum rhoncus. Donec lorem magna, rhoncus nec egestas et, ultrices eget orci.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla tellus efficitur massa rhoncus laoreet. Mauris lobortis arcu at est fringilla cursus. Suspendisse consectetur nisl nisi, gravida iaculis mauris tempus non. Sed ultrices ultrices bibendum. Sed consectetur sapien ut pharetra elementum. Quisque blandit tortor non dictum tempor. Donec pretium felis tristique massa condimentum viverra. Vivamus pellentesque imperdiet libero. Curabitur ac dui id dui tincidunt efficitur. Pellentesque ornare lectus eu rutrum rhoncus. Donec lorem magna, rhoncus nec egestas et, ultrices eget orci.
                            </template>
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
