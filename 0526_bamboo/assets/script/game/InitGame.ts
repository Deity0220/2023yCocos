import { weiSan } from "../common/weiSanTools";
import { PlatformManager, releaseType } from "../manager/PlatformManager";
import { GameModel } from "../model/GameModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InitGame extends cc.Component {
    @property( [cc.Prefab] )
    resNodeArr:Array<cc.Prefab> = [];
    @property({ type: cc.Enum(releaseType) })
    rType: number = releaseType.test_TEST;
    @property
    storageKey:string = "demo_Game";

    onLoad () {
        if(this.rType == releaseType.h5_weiSan){
            this.rType = releaseType.h5_common;
        }
        PlatformManager.releaseType = this.rType;
        PlatformManager.storageKey = this.storageKey;
        PlatformManager.initPlatform();

        this.initResNode();
        this.initScreen();
        weiSan.initLog();
    }
    /** 初始化  resNode */
    initResNode(){
        for (let i = 0; i < this.resNodeArr.length; i++) {
            let resNode = cc.instantiate(this.resNodeArr[i]);
            this.node.addChild(resNode);
        }
    }
    /** 电脑端  按宽高一起适配 */
    initScreen(){
        weiSan.log("系统OS: " + cc.sys.os);
        let canvas = cc.find("Canvas").getComponent(cc.Canvas);
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS){
            canvas.fitWidth =  true;
            canvas.fitHeight = false;
        }else {
            canvas.fitWidth =  true;
            canvas.fitHeight = true;
        }
    }

    // start () {
    // }
    // update (dt) {}
}
