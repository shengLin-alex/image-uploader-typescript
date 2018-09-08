import { AuthState } from "@/store/modules/auth/types";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import { RootState } from "@/store/types";
import ImgurApiHelper from "@/api/ImgurApiHelper";
import { parse } from 'qs';
import router from '../../../router';

export default class AuthModule implements Module<AuthState, RootState> {
    state: AuthState = {
        token: window.localStorage.getItem('imgur_token')
    };

    getters: GetterTree<AuthState, RootState> = {
        isLoggedIn(state: AuthState): boolean {
            return !!state.token;
        }
    };

    actions: ActionTree<AuthState, RootState> = {
        login(): void {
            ImgurApiHelper.login();
        },

        finalizeLogin({ commit }, hash): void {
            const queryObject = parse(hash.replace('#', ''));

            commit('setToken', queryObject.access_token);
            window.localStorage.setItem('imgur_token', queryObject.access_token);

            // renew router
            router.push('/');
        },

        logout({ commit }): void {
            commit('setToken', null);

            // must clean token when logout
            window.localStorage.removeItem('imgur_token');
        }
    };

    mutations: MutationTree<AuthState> = {
        setToken(state: AuthState, token: string): void {
            state.token = token;
        }
    };
}