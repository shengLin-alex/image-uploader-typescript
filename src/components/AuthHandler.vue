<template>
    <div>
        Please wait...
    </div>
</template>

<script lang="ts">
    import { Action } from 'vuex-class';
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class AuthHandler extends Vue {
        @Action('finalizeLogin') finalizeLogin;

        created() {
            this.finalizeLogin(window.location.hash);
        }
    }
</script>