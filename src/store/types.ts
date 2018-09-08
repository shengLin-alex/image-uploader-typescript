import AuthModule from "@/store/modules/auth/AuthModule";
import ImagesModule from "@/store/modules/images/ImagesModule";

export interface RootState {
    version: string;

    authModule?: AuthModule;

    imagesModule?: ImagesModule;
}