import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import { ImagesState } from "@/store/modules/images/type";
import { RootState } from "@/store/types";
import ImgurApiHelper from "@/api/ImgurApiHelper";
import router from "@/routers/router";

/**
 * 圖片模組
 */
export default class ImagesModule implements Module<ImagesState, RootState> {

    /**
     * 圖片狀態模型
     */
    state: ImagesState = {
        images: []
    };

    /**
     * 取得指定狀態資料
     */
    getters: GetterTree<ImagesState, RootState> = {

        /**
         * 取得所有圖片
         * @param state 圖片狀態模型
         */
        allImages(state: ImagesState): Array<any> {
            return state.images;
        }
    };

    /**
     * 模組動作
     */
    actions: ActionTree<ImagesState, RootState> = {

        /**
         * 載入登入者圖片
         * @param context 模組上下文
         */
        async fetchImages(context: { commit: Commit, rootState: RootState | any }) {

            // rootState 宣告為 RootState | "any" 是為了解決 token 取得的問題
            const { token } = context.rootState.authModule;

            const response = await ImgurApiHelper.fetchImages(token);
            context.commit('setImages', response.data.data);
        },

        /**
         * 上傳圖片
         * @param context 模組上下文
         * @param images 圖片集合
         */
        async uploadImages(context: { commit: Commit, rootState: RootState | any }, images: FileList) {
            const { token } = context.rootState.authModule;

            await ImgurApiHelper.uploadImages(images, token);

            router.push('/');
        }
    };

    /**
     * 狀態更新
     */
    mutations: MutationTree<ImagesState> = {

        /**
         * 更新圖片集合
         * @param state 圖片狀態
         * @param images 圖片集合
         */
        setImages(state: ImagesState, images: []): void {
            state.images = images;
        }
    }
}