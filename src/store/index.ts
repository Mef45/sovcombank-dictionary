import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex'
import { RootState } from './types'

Vue.use(Vuex)

export const state: RootState = {
    loading: false,
}

export const getters: GetterTree<RootState, RootState> = {
    loading(state): boolean {
        return state.loading;
    },
}

export const mutations: MutationTree<RootState> = {
    startLoading(): void {
        state.loading = true;
    },
    stopLoading(): void {
        state.loading = false;
    },
}

export const actions: ActionTree<RootState, RootState> = {}

export default new Vuex.Store<RootState>({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
})
