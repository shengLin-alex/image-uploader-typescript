<template>
    <div>
        <div v-if="isLoggedIn" class="image-container">
            <img v-for="image in allImages" :src="image.link" :key="image.id" />
        </div>
        <h2 v-else>Login to get started.</h2>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Getter, Action } from 'vuex-class';

    @Component
    export default class ImageList extends Vue {
        @Getter('allImages') allImages;

        @Getter('isLoggedIn') isLoggedIn;

        @Action('fetchImages') fetchImages;

        created() {
            if (this.isLoggedIn) {
                this.fetchImages();
            }
        }
    }
</script>

<style scoped>
    .image-container {
        column-count: 3;
        column-gap: 0;
    }

    img {
        max-width: 100%;
        padding: 5px;
    }
</style>