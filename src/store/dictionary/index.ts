import axios from 'axios';

import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';

import { RootState } from '../types';

export const PARTS: { [key: string]: string } = {
    'n': 'noun',
    'v': 'verb',
    'adj': 'adjective',
    'adv': 'adverb',
};

const namespaced: boolean = true;

export const state: IDictionaryState = {
    words: [],
};

export const getters: GetterTree<IDictionaryState, RootState> = {
    words(state): Word[] {
        return state.words;
    },
};

export const mutations: MutationTree<IDictionaryState> = {
    setWords(state, payload: any): void {
        state.words = payload;
    },
};

export const actions: ActionTree<IDictionaryState, RootState> = {
    async search({ commit }, searchCondition: string): Promise<void> {
        commit('startLoading', null, { root: true });
        const { data } = await axios.get('/api/words', {
            params: {
                sp: `${searchCondition}*`,
                md: 'dpr',
                ipa: 1,
            },
        });

        commit('stopLoading', null, { root: true });

        const words: Word[] = [];

        data.slice(0, 10).map((d: IDictionaryApiResponse) => {
            const mainPart: string = PARTS[d.tags[0]];
            const mainDefinition: string = d.defs ? d.defs[0].replace(/^.*[\t]/g, '') : 'Описание отсутствует';
            const definitions: { [key: string]: string[] } = {};

            if (d.defs) {
                if (definitions) {
                    d.defs.map(df => {
                        const key = PARTS[df.replace(/[\t].*/, '')];
                        const def = df.replace(/^.*[\t]/g, '');

                        if (!definitions.hasOwnProperty(key)) {
                            definitions[key] = [];
                            definitions[key].push(def);
                        } else definitions[key].push(def);
                    });
                }
            }

            const regex = /^ipa_pron:/g;
            const pron = d.tags.find(tag => regex.test(tag));
            const pronunciation = pron ? pron.replace(regex, '') : ''

            words.push({
                word: d.word,
                mainPart: mainPart,
                mainDefinition: mainDefinition,
                definitions: definitions,
                pronunciation: pronunciation,
            });

            commit('setWords', words);
        });
    },
};

export const dictionary: Module<IDictionaryState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};

export interface Word {
    word: string;
    mainPart: string;
    mainDefinition: string;
    definitions: { [key: string]: string[] };
    pronunciation: string;
}

export interface IDictionaryState {
    words: Word[];
};

export interface IDictionaryApiResponse {
    word: string;
    defs: string[];
    tags: string[];
    score: number;
};
