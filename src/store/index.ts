import Vue from 'vue';
import Vuex, { StoreOptions} from "vuex";
import { RootState } from "@/store/types";
import AuthModule from './modules/auth/auth';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        auth: new AuthModule()
    }
};

export default new Vuex.Store<RootState>(store);