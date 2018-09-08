import { AuthState } from "@/store/modules/auth/types";
import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import { RootState } from "@/store/types";
import ImgurApiHelper from "@/api/ImgurApiHelper";
import { parse } from 'qs';
import router from '../../../routers/router';

/**
 * imgur oauth2 登入驗證模組
 */
export default class AuthModule implements Module<AuthState, RootState> {

    /**
     * 驗證狀態模型
     */
    state: AuthState = {
        token: window.localStorage.getItem('imgur_token')
    };

    /**
     * 取得指定狀態資料
     */
    getters: GetterTree<AuthState, RootState> = {

        /**
         * 檢查是否登入
         * @param state 驗證狀態
         * @return 是否登入
         */
        isLoggedIn(state: AuthState): boolean {
            return !!state.token;
        }
    };

    /**
     * 模組動作
     */
    actions: ActionTree<AuthState, RootState> = {

        /**
         * 登入
         */
        login(): void {
            ImgurApiHelper.login();
        },

        /**
         * 完成登入
         * @param context 模組的上下文
         * @param hash url 的 hash
         */
        finalizeLogin(context: { commit: Commit, rootState: RootState | any }, hash: string): void {
            const queryObject = parse(hash.replace('#', ''));

            context.commit('setToken', queryObject.access_token);
            window.localStorage.setItem('imgur_token', queryObject.access_token);

            // renew router
            router.push('/');
        },

        /**
         * 登出
         * @param context 模組的上下文
         */
        logout(context: { commit: Commit }): void {
            context.commit('setToken', null);

            // must clean token when logout
            window.localStorage.removeItem('imgur_token');
        }
    };

    /**
     * 狀態更新
     */
    mutations: MutationTree<AuthState> = {

        /**
         * 更新 token
         * @param state 驗證狀態
         * @param token oauth2 的 access token
         */
        setToken(state: AuthState, token: string): void {
            state.token = token;
        }
    };
}