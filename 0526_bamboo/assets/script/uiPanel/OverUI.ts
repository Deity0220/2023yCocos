import { AdManager } from "../ads/AdManager";
import { Tools } from "../common/Tools";
import { weiSan } from "../common/weiSanTools";
import { NetworkManager } from "../manager/NetworkManager";
import { osType, PlatformManager, releaseType } from "../manager/PlatformManager";
import { UIManager } from "../manager/UIManager";
import { GameModel } from "../model/GameModel";
import { WordsModel } from "../model/WordsModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OverUI extends UIManager {
    public uiName: string;
    @property(cc.Node)
    bgSpr:cc.Node = null;

    @property(cc.Node)
    viewNode:cc.Node = null;
    @property(cc.Label)
    scoreLab:cc.Label = null;
    @property(cc.Label)
    maxScoreLab:cc.Label = null;
    @property(cc.Label)
    infoText:cc.Label = null;

    @property(cc.Node)
    moreBtn:cc.Node = null;
    @property(cc.Node)
    aginBtn:cc.Node = null;

    /** 是否可点击 按钮 */
    isClick:boolean = false;
    onLoad () {
        this.bgSpr.opacity = 0;
        this.viewNode.y += 1000;
        this.aginBtn.scale = 0;
        this.moreBtn.x -= 200;

        // GameModel._ins.gameScore = Tools.random(100,200);
        this.initShowInfo();
        this.addBtnEvent();
        // 提交分数  和 显示插屏广告
        NetworkManager.sendGameScore( GameModel._ins.gameScore , 1 );
        AdManager.showIntersAd();

        if(PlatformManager.osType != osType.h5){  //非H5平台 隐藏更多游戏按钮
            this.moreBtn.active = false;
        }
    }
    /** 显示结束页 信息 */
    initShowInfo(){
        this.scoreLab.string = GameModel._ins.gameScore.toString();

        let tempNum = this.getBeatItScore(GameModel._ins.gameScore,GameModel._ins.standScore,GameModel._ins.gameMaxScore);
        this.infoText.string = this.getBeatItStr(GameModel._ins.gameScore,tempNum,true);

        let maxScore = Tools.getStorage("gameOverMaxScore");
        if(!maxScore || maxScore <= GameModel._ins.gameScore){
            maxScore = GameModel._ins.gameScore;
            Tools.setStorage("gameOverMaxScore",GameModel._ins.gameScore);
        }
        this.maxScoreLab.string = maxScore.toString();

        if(PlatformManager.osType != osType.h5){  return; }
        if(Tools.getLanguageType() == "CN" || Tools.getLanguageType() == "CHT"){
            document.title = WordsModel.getStrForLanguage("overTitle_1","CN") + "<" + WordsModel.getStrForLanguage("gameName","CN") 
            + ">" + WordsModel.getStrForLanguage("overTitle_2","CN") + this.getBeatItStr(GameModel._ins.gameScore,tempNum,false);
        }else{
            document.title = WordsModel.getStrForLanguage("overTitle_1","EN") + "<" + WordsModel.getStrForLanguage("gameName","EN") 
            + ">" + WordsModel.getStrForLanguage("overTitle_2","EN") + this.getBeatItStr(GameModel._ins.gameScore,tempNum,false);
        }
        console.log( document.title );
    }
    // start () {
    // }
    /** 添加按钮 事件 */
    addBtnEvent(){
        this.aginBtn.on("click", () => {
            if(!this.isClick){ return; }
            this.aginGame();
        } );
        this.moreBtn.on("click", () => {
            if(!this.isClick){ return; }
            if(PlatformManager.releaseType == releaseType.test_TEST){
                weiSan.log("测试模式 更多游戏Url: " + NetworkManager.moreGameUrl );
                return;
            }
            // this.isClick = false;
            window.location.href = NetworkManager.moreGameUrl;
        } );
    }
    /** 再玩一次 */
    aginGame(){
        this.isClick = false;
        // AdManager.showIntersAd();
        UIManager.CloseUI("OverUI");
        this.scheduleOnce( () => {
            cc.director.preloadScene( GameModel._ins.mianScene , () => {
                cc.director.loadScene( GameModel._ins.mianScene );
            });
        }, 0.2 );
    }
    /**
     * 获取击败了 全球多少玩家 文字  tempNum:百分之多少 是否是richText
     */
    getBeatItStr(score:number,tempNum:number,isRichText = true):string{
        var share_title = WordsModel.getStrForLanguage("overScoreInfo_0");
        if(score > 0){
           if(isRichText){
                share_title = WordsModel.getStrForLanguage("overScoreInfo_1") + 
                tempNum + "%" +  WordsModel.getStrForLanguage("overScoreInfo_2");
           }else{
                share_title = WordsModel.getStrForLanguage("overScoreInfo_1") + tempNum + "%" + WordsModel.getStrForLanguage("overScoreInfo_2");
           }
        }
        return share_title;
    }
    /**
     * 获取击败了 全球多少玩家
     * @param gameScore 分数
     * @param standScore 平均分 
     * @param maxScore  最高分
     */
    getBeatItScore(gameScore:number,standScore:number,maxScore:number){
        if(gameScore >= maxScore){
            return 100;
        }
        if(gameScore <= standScore){
            let temp = (gameScore/standScore) * 80 + Tools.random(-3,3);
            return Math.max(Math.floor(temp),5);
        }else{
            let temp = 80 + ((gameScore - standScore)/(maxScore - standScore)) * 20 + Tools.random(-3,3);
            return Math.min(Math.floor(temp),99);
        }
    };
    public openUI() {
        this.bgSpr.runAction(cc.fadeTo( 0.3 , 100 ));
        this.viewNode.runAction(cc.sequence(
            cc.moveBy( 0.3 , cc.v2( 0, -1000) ).easing(cc.easeBackOut()),
            cc.callFunc( () => {
                this.isClick = true;
                this.aginBtn.runAction(cc.scaleTo( 0.3 , 1 ).easing( cc.easeBackOut() ) );
                this.moreBtn.runAction(cc.moveBy( 0.3 , cc.v2(200,0) ).easing( cc.easeBackOut() ) );
            } )
        ));
    }
    public closeUI() {
        this.bgSpr.runAction( cc.fadeOut(0.3) );
        this.viewNode.runAction( cc.moveBy(0.3, cc.v2(0,1000) ).easing(cc.easeBackIn()) );
        this.moreBtn.runAction(cc.moveBy( 0.3 , cc.v2(-200,0) ).easing( cc.easeBackIn() ) );
    }
}
