import { UIManager } from "../manager/UIManager";
import { Tools } from "./Tools";
import { weiSan } from "./weiSanTools";

/** 加载资源相关工具类 */
export class LoadTools {
    /** 单例模式 */
    private static _instance: LoadTools = new LoadTools();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }

    /**
     * 加载游戏场景 
     * @param sceneName 加载场景的名字
     * @param callFunc 加载回调
     */
    loadScene(sceneName: string, callFunc: any, isClear = true) {
        if (isClear) {
            Tools.clearResDic();
        }
        cc.director.preloadScene(sceneName, () => {
            cc.director.loadScene(sceneName, callFunc);
        });
    };
    /**
     *  加载resource 下的预制体 资源
     * @param url resource 下的资源路径
     * @param callBack 加载完成回调
     */
    loadResPrefab(url: string, callBack?: any, parent?: cc.Node, Pos?: cc.Vec2, zindex = 0) {
        this.loadResAny(url, cc.Prefab, (prefab: cc.Prefab) => {
            let clone = cc.instantiate(prefab);
            if (parent) { parent.addChild(clone, zindex) };
            if (Pos) { clone.position = cc.v3(Pos.x, Pos.y, 0) };
            if (callBack != null) {
                callBack(clone);
            }
        })
    }
    /**
     * 加载resource 下的图片资源并渲染到节点上
     * @param url resource 下的资源路径
     * @param callBack 加载完成回调
     */
    loadResSpriteFrame(url: string, sprite: cc.Node, parent?: cc.Node, Pos?: cc.Vec2, zindex = 0, callBack?: any) {
        cc.loader.loadRes(url, cc.SpriteFrame, function (error: any, SpriteFrame: cc.SpriteFrame) {
            if (error) {
                weiSan.error(error);
            } else {
                sprite.getComponent(cc.Sprite).spriteFrame = SpriteFrame;
                if (parent) { parent.addChild(sprite, zindex) };
                if (Pos) { sprite.position = cc.v3(Pos.x, Pos.y, 0) };
                if (callBack != null) {
                    callBack(sprite);
                }
            }
        });
    };
    /**
     * 加载resource 下的游戏资源
     * @param url resource 下的资源路径
     * @param resType 加载资源的类型
     * @param callBack 加载完成回调
     */
    loadResAny(url: string, resType: any, callBack?: any) {
        cc.loader.loadRes(url, resType, function (error: any, res: any) {
            if (error) {
                weiSan.error(error);
            } else {
                if (callBack != null) {
                    callBack(res);
                }
            }
        });
    };
    /** 加载bundle 场景 */
    loadBundleScene(bundleName: string, sceneName: string, onFinshBack?: () => void , isInScene:boolean = true) {
        cc.assetManager.loadBundle(
            bundleName,
            (err, bundle) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if(!isInScene) { return; }
                    bundle.loadScene(sceneName, (err, scene) => {
                        if (onFinshBack) {
                            onFinshBack();
                        }
                        cc.director.runScene(scene);
                    });
                }
            }
        );
    }
}