import AuthModule from "@/store/modules/auth/AuthModule";
import ImagesModule from "@/store/modules/images/ImagesModule";

/**
 * 根狀態模型
 */
export interface RootState {

    /**
     * App version
     */
    version: string;

    /**
     * 驗證模組
     */
    authModule?: AuthModule;

    /**
     * 圖片模組
     */
    imagesModule?: ImagesModule;
}