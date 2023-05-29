import { PlatformManager, releaseType } from "../manager/PlatformManager";
import { AdManager_H5 } from "./AdManager_H5";
import { AdManager_WX } from "./AdManager_WX";
import { AdManager_ZJ } from "./AdManager_ZJ";

export class AdManager{
    private static isLoadAd:boolean = false;   //是否加载过广告了
    /** 初始化所有广告 */
    public static initAds(){

    }
    /** 加载所有广告 */
    public static loadAds(){
        if(this.isLoadAd){ return; }
        if(PlatformManager.releaseType == releaseType.applet_ziJie){
            AdManager_ZJ._ins.loadAllAd();
        }else if(PlatformManager.releaseType == releaseType.applet_wechat){
            AdManager_WX._ins.loadAllAd();
        }

        this.isLoadAd = true;
    }
    /** Banner 广告 */
    public static showBanner(){
        if(PlatformManager.releaseType == releaseType.applet_ziJie){
            AdManager_ZJ._ins.showBanner();
        }else if(PlatformManager.releaseType == releaseType.applet_wechat){
            AdManager_WX._ins.showBanner();
        }
    }
    /** 隐藏 Banner 广告 */
    public static hideBanner(){
        if(PlatformManager.releaseType == releaseType.applet_ziJie){
            AdManager_ZJ._ins.hideBanner();
        }else if(PlatformManager.releaseType == releaseType.applet_wechat){
            AdManager_WX._ins.hideBanner();
        }
    }
    /** 插屏广告 */
    public static showIntersAd(){
        let rType = PlatformManager.releaseType;
        if(rType == releaseType.test_TEST){ return; }

        if(rType == releaseType.h5_weiSan || rType == releaseType.h5_common){
            AdManager_H5._ins.showIntersAd();
        }else if(rType == releaseType.applet_ziJie){
            AdManager_ZJ._ins.showIntersAd();
        }else if(PlatformManager.releaseType == releaseType.applet_wechat){
            AdManager_WX._ins.showIntersAd();
        }
    }
    /**
     * 播放视频激励广告
     * @param finishBack 视频完成回调
     * @param errorBack  视频失败回调
     */
    public static showVideoAd(finishBack?:() => void,errorBack?:() => void){
        let rType = PlatformManager.releaseType
        if(rType == releaseType.test_TEST){  //测试直接成功
            if(finishBack){ finishBack(); };
            return; 
        }
        if(rType == releaseType.h5_weiSan || rType == releaseType.h5_common){
            AdManager_H5._ins.showVideoAd(finishBack,errorBack);
        }else if( rType == releaseType.applet_ziJie ){
            AdManager_ZJ._ins.showVideoAd(finishBack,errorBack);
        }else if(PlatformManager.releaseType == releaseType.applet_wechat){
            AdManager_WX._ins.showVideoAd(finishBack,errorBack);
        }
    }
}