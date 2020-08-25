import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';

import { RootState } from '../types';

export const PARTS: { [key: string]: string } = {
    'n': 'noun',
    'v': 'verb',
    'adj': 'adjective',
    'adv': 'adverb',
};

const namespaced: boolean = true;

export const state: IBookmarksState = {
    bookmarks: [],
};

export const getters: GetterTree<IBookmarksState, RootState> = {
    bookmark(state): (word: string) => Bookmark | undefined {
        return (word: string): Bookmark | undefined => state.bookmarks.find(bookmark => bookmark.word === word);
    },
    bookmarks(state): Bookmark[] {
        return state.bookmarks;
    },
};

export const mutations: MutationTree<IBookmarksState> = {
    saveWord(state, payload: Bookmark): void {
        state.bookmarks.push(payload);
    },
    removeWord(state, payload: Bookmark): void {
        const index = state.bookmarks.findIndex((bookmark: Bookmark) => bookmark.word === payload.word);

        if (index != -1) {
            state.bookmarks.splice(index, 1);
        }
    },
};

export const actions: ActionTree<IBookmarksState, RootState> = {
    saveWord({ commit }, word: Bookmark): void {
        commit('saveWord', word);
    },
    removeWord({ commit }, word: Bookmark): void {
        commit('removeWord', word);
    },
};

export const bookmarks: Module<IBookmarksState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};

export interface Bookmark {
    word: string;
    mainPart: string;
    mainDefinition: string;
    definitions: { [key: string]: string[] };
    pronunciation: string;
    saved: boolean;
}

export interface IBookmarksState {
    bookmarks: Bookmark[];
};

export interface IDictionaryApiResponse {
    word: string;
    defs: string[];
    tags: string[];
    score: number;
};
