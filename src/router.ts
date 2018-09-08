import VueRouter from 'vue-router';
import AuthHandler from './components/AuthHandler.vue';

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/oauth2/callback', component: AuthHandler }
    ]
});