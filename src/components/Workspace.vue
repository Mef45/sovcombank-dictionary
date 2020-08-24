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
                            :loading="loading"
                            @submit="performSearch"
                    ></s-text-field>
                </div>

                <div class="column col-9">
                    <s-list>
                        <s-list-item
                                v-for="(item, index) in searchResults"
                                :key="`result-${index}`"
                        >
                            <!--<template v-slot:prepend-icon>
                                <font-awesome-icon
                                        icon="grip-lines"
                                        @click="addWordToFavorites($event, item.word)"
                                ></font-awesome-icon>
                            </template>-->

                            <span class="dictionary-word">
                                {{ item.word }}
                            </span>

                            <span class="dictionary-part">
                                {{ getPartOfSpeech(item.tags) }}
                            </span>

                            <span class="dictionary-definition">
                                {{ getDefinition(item.defs) }}
                            </span>

                            <template v-slot:append-icon>
                                <font-awesome-icon
                                        :icon="['far', 'bookmark']"
                                        @click="addWordToFavorites($event, item.word)"
                                ></font-awesome-icon>
                            </template>

                            <template v-slot:content>
                                <!-- затрудняюсь сказать, насколько эти произношения имеют отношение к реальности,
                                      но выбирать не приходится-->
                                <span style="font-style: italic">/{{ getPronunciation(item.tags) }}/</span>
                                <template v-for="(defs, part) in mapDefinitions(item.defs)">
                                    <div :key="`${part}-${index}`">
                                        <span style="font-style: italic">{{ parts[part] }}</span>
                                        <p
                                                v-for="(def, defIndex) in defs"
                                                :key="defIndex"
                                                style="margin-left: 10px;"
                                        >
                                            {{ defIndex + 1 }}. {{ def }}
                                        </p>
                                    </div>
                                </template>
                            </template>
                        </s-list-item>
                    </s-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

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

    public loading: boolean = false;

    protected parts: { [key: string]: string} = {
      'n': 'noun',
      'v': 'verb',
      'adj': 'adjective',
      'adv': 'adverb',
    };

    public async performSearch(searchCondition: string): Promise<void> {
      this.loading = true;
      const { data } = await axios.get('/api/words', {
        params: {
          sp: `${searchCondition}*`,
          md: 'dpr',
          ipa: 1,
        },
      });

      this.loading = false;
      this.searchResults = data.slice(0, 10);
    }

    public getPartOfSpeech(tags: string[]): string {
      return this.parts[tags[0]];
    }

    public getPronunciation(tags: string[]): string {
      const regex = /^ipa_pron:/g;
      const pronunciation = tags.find(tag => regex.test(tag));
      return pronunciation ? pronunciation.replace(regex, '') : '';
    }

    public getDefinition(definitions: string[]): string {
      return definitions ? definitions[0].replace(/^.*[\t]/g, '') : 'Описание отсутствует';
    }

    public mapDefinitions(definitions: string[]): any {
      const map: {[key: string]: string[]} = {};

      if (definitions) {
        definitions.map(d => {
          const key = d.replace(/[\t].*/, '');
          const def = d.replace(/^.*[\t]/g, '');

          if (!map.hasOwnProperty(key)) {
            map[key] = [];
            map[key].push(def);
          } else map[key].push(def);
        });
      }

      return map;
    }

    public addWordToFavorites(event: MouseEvent, word: string): void {
        event.preventDefault();
        event.stopPropagation();
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
  .dictionary-word {
    font-weight: bold;
    margin-right: 40px;
  }

  .dictionary-part {
    font-style: italic;
    margin-right: 40px;
  }

  .dictionary-definition {

  }
</style>
