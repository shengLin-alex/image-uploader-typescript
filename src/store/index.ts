import Vue from 'vue';
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/types";
import AuthModule from './modules/auth/AuthModule';
import ImagesModule from "@/store/modules/images/ImagesModule";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        authModule: new AuthModule(),
        imagesModule: new ImagesModule()
    }
};

export default new Vuex.Store<RootState>(store);