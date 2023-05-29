import { AdManager } from "../ads/AdManager";
import { Tools } from "../common/Tools";
import { NetworkManager } from "./NetworkManager";

/** 游戏管理类 */
export class PlatformManager {
    /** 发布平台类型 */
    public static releaseType: number;
    /** 发布类型 h5  安卓  IOS  小程序 */
    public static osType:number;
    /** 存储本地数据  key的前标 */
    public static storageKey: string = "demo_Game_";
    /** 游戏是否 加载成功 */
    public static loadGameBool:boolean = false;

    /** 初始化平台 相关 */
    public static initPlatform(){
        if(this.loadGameBool) { return; }  //第一次加载成功后 不加载第二次
        this.initOsType();
        NetworkManager.initNetwork();

        if(PlatformManager.releaseType == releaseType.h5_weiSan || PlatformManager.releaseType == releaseType.h5_common){
            if(NetworkManager.gameHttpId.toString() == "NaN"){
                if(PlatformManager.releaseType == releaseType.h5_weiSan){
                    window.location.href = NetworkManager.moreGameUrl;
                }else{
                    window.location.href = "http://www.vsane.com/";
                }
                // cc.game.end();
            }
            if(loadInScene){
                loadInScene();
            }
            cc.view.enableAutoFullScreen(false);
        }
        if(PlatformManager.releaseType != releaseType.applet_ziJie){
            window.AdManager = AdManager;
        }
        this.loadGameBool = true;
    };
    /** 初始化  发布类型 */
    private static initOsType(){
        if( this.releaseType == releaseType.APP_google ){
            this.osType = osType.android;
        }else if( this.releaseType == releaseType.APP_ios ){
            this.osType = osType.ios;
        }else if(this.releaseType == releaseType.applet_ziJie){
            this.osType = osType.applet;
        }else{
            this.osType = osType.h5;
        }
    }
    /**
    * 存储本地数据
    * @param {*} isObject 是否是一个对象或者数组
    */
    public static setStorage(key: string, value: any, isObject = false) {
        key = this.storageKey + key;
        if (PlatformManager.releaseType === releaseType.applet_ziJie) {
            return tt.setStorageSync(key, value);
        }
        if (isObject) {
            value = JSON.stringify(value);
        }
        /** 默认cocos 存储数据方法 */
        cc.sys.localStorage.setItem(key, value);
    }
    /**
    * 获取存储数据
    * @param {*} isObject 是否是一个对象或者数组
    */
    public static getStorage(key: string, isObject = false) {
        key = this.storageKey + key;
        let temp = null;
        if (PlatformManager.releaseType === releaseType.applet_ziJie) {
            temp = <any>tt.getStorageSync(key);
            if( temp == "" ){ 
                temp = null;
            }
        }else{
            temp = <any>cc.sys.localStorage.getItem(key);
            if (!temp || temp.toString() == "NaN" || temp.toString() == "null") {
                temp = null;
            }else if( isObject ){
                temp = JSON.parse(temp);
            }else if ( !isNaN(temp) ) {
                temp = parseInt(temp);
            }
        }
        return temp;
    };
};
window.PlatformManager = PlatformManager;
/** 发布平台类型 */
export var releaseType = cc.Enum({
    /** 测试 */
    test_TEST: 1,

    /** 微伞 h5 */
    h5_weiSan: 2,
    /** 通用 h5 */
    h5_common: 3,

    /** 字节跳动 小程序*/
    applet_ziJie: 4,
    /** 微信 小程序*/
    applet_wechat: 5,

    /** 谷歌 AppPlay*/
    APP_google: 10,
    /** IOS  appStore */
    APP_ios: 11,
});

/** 发布类型 h5  安卓  IOS  小程序 */
export enum osType{
    h5 = 1,
    android = 2,
    ios = 3,
    applet = 4,
}