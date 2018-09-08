import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import { ImagesState } from "@/store/modules/images/type";
import { RootState } from "@/store/types";
import ImgurApiHelper from "@/api/ImgurApiHelper";
import router from "@/routers/router";

export default class ImagesModule implements Module<ImagesState, RootState> {

    state: ImagesState = {
        images: []
    };

    getters: GetterTree<ImagesState, RootState> = {
        allImages(state: ImagesState): Array<any> {
            return state.images;
        }
    };

    actions: ActionTree<ImagesState, RootState> = {
        async fetchImages(context: { commit: Commit, rootState: RootState | any }) {
            const { token } = context.rootState.authModule;

            const response = await ImgurApiHelper.fetchImages(token);
            context.commit('setImages', response.data.data);
        },
        async uploadImages(context: { commit: Commit, rootState: RootState | any }, images: FileList) {
            const { token } = context.rootState.authModule;

            await ImgurApiHelper.uploadImages(images, token);

            router.push('/');
        }
    };

    mutations: MutationTree<ImagesState> = {
        setImages(state: ImagesState, images: []): void {
            state.images = images;
        }
    }
}