import { Tools } from "../common/Tools";
const {ccclass, property} = cc._decorator;

@ccclass
export default class resArr extends cc.Component {
    @property([cc.SpriteFrame])
    public SpriteFrameArr: Array<cc.SpriteFrame> = [];
    @property([cc.Prefab])
    public PrefabArr:Array<cc.Prefab> = [];
    @property([cc.AudioClip])
    public audiosArr:Array<cc.AudioClip> = [];
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.addAudio();
        this.addPrefabs();
        this.addSpriteFrame();
    }
    // start () {
    // }
    /** 添加音效文件  到Tools字典里面 */
    addAudio () {
        for (let i = 0; i < this.audiosArr.length; i++) {
            if(this.audiosArr[i]){
                const element = this.audiosArr[i];
                Tools.AudioClipDic.set(element.name,element);
            }
        }
    }
    /** 添加图片文件  到Tools字典里面 */
    addSpriteFrame () {
        for (let i = 0; i < this.SpriteFrameArr.length; i++) {
           if(this.SpriteFrameArr[i]){
               const element = this.SpriteFrameArr[i];
               Tools.SpriteFrameDic.set(element.name,element);
           }
        }
    }
    /** 添加预制体文件  到Tools字典里面 */
    addPrefabs () {
        for (let i = 0; i < this.PrefabArr.length; i++) {
           if(this.PrefabArr[i]){
               const element = this.PrefabArr[i];
               Tools.PrefabDic.set(element.data.name,element);
           }
        }
    }
}
