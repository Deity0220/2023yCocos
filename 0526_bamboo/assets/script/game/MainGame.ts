import { AdManager } from "../ads/AdManager";
import { Tools } from "../common/Tools";
import { weiSan } from "../common/weiSanTools";
import { GameCtrl, GameState } from "../ctrl/GameCtrl";
import { EventData, EventManager } from "../manager/EventManager";
import { PoolManager } from "../manager/PoolManager";
import { UIManager } from "../manager/UIManager";
import { GameModel } from "../model/GameModel";
import BambooTs from "./game1/Bamboo";
import BgTs from "./game1/Bg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainGame extends cc.Component {
    /** 屏幕宽度 */
    gameWidth: number;
    /** 屏幕高度 */
    gameHeight: number;
    ///////////////////////////////////
    IsOver: boolean = false;
    IsFirst: boolean = true;
    bamboonum: number = 0;

    @property(cc.Node)
    BambooBase: cc.Node = null;
    @property(cc.Node)
    MainCamera: cc.Node = null;
    @property(cc.Node)
    BgNode: cc.Node = null;
    @property(cc.Node)
    Score: cc.Node = null;
    @property(cc.Node)
    ChipNode: cc.Node = null;
    ///////////////////////////////////
    onLoad() {
        this.gameWidth = cc.view.getVisibleSize().width;
        this.gameHeight = cc.view.getVisibleSize().height;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        GameModel._ins.mainGame = this;
        this.addTouchEvents();
        this.addInitListener();
        this.BambooBase.setPosition(0, -this.gameHeight / 2);
    }

    start() {
        this.initGame();
        this.BambooArr.push(this.BambooBase);
        this.NewBamboo(this.BambooBase);
    }

    update(dt: number) {
        // if (this.IsOver) {
        //     this.BambooArr[this.BambooArr.length - 1].opacity = 0;
        // }
        if (GameCtrl._ins.gameState != GameState.Start) { return; }
    }

    BambooArr: Array<cc.Node> = [];
    NewBamboo(NewNode: cc.Node) {
        let NewBamboo = Tools.newPrefab("Bamboo");
        // NewBamboo.setParent(NewNode);
        NewBamboo.setParent(this.node);
        let pos = Tools.getToNodePosForNode(NewNode.getChildByName("GrowNode"), this.node);
        // let pos = Tools.getToNodePosForNode(NewNode.getChildByName("GrowNode"), NewNode);
        NewBamboo.setPosition(pos.x, pos.y);
        this.BambooArr.push(NewBamboo);
    }

    NewLawn() {
        if (this.BambooArr.length > 5) {
            let NewLawn = Tools.newPrefab("Lawn");
            NewLawn.setParent(this.node);
            let pos_x = Tools.random(-(this.gameWidth / 2 - NewLawn.width / 2), (this.gameWidth / 2 - NewLawn.width / 2));
            // let pos_y = Tools.random(this.BgNode.y + this.gameHeight, this.BgNode.y + this.gameHeight + this.gameHeight / 2 - NewLawn.height / 2);
            NewLawn.setPosition(pos_x, this.bamboonum * 400 - 1000);
        }
    }

    AddScore() {
        GameModel._ins.gameScore++;
        this.Score.getComponent(cc.Label).string = GameModel._ins.gameScore.toString();
    }

    /** 触摸开始点坐标 */
    toushStartPos: cc.Vec2;
    /** 触摸事件 监听 */
    addTouchEvents(): void {
        cc.macro.ENABLE_MULTI_TOUCH = false;  //是否开起多点触摸

        this.BgNode.on(cc.Node.EventType.TOUCH_START, this.touchStartBack, this);
        this.BgNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveBack, this);
        this.BgNode.on(cc.Node.EventType.TOUCH_END, this.touchEndBack, this);
    };
    /** 触摸开始  回调 */
    touchStartBack(touches: cc.Event.EventTouch) {
        this.IsFirst = false;
        this.bamboonum++;
        if (!this.IsOver) {
            let num = this.BambooArr.length - 1;
            this.BambooArr[num].getChildByName("B_Node").opacity = 255;
            this.BambooArr[num].getComponent(BambooTs).BoxCollider.enabled = true;
            this.BambooArr[num].getComponent(BambooTs).RockTween.stop();
            this.NewLawn();
            if (num >= 3 && this.BambooArr[num].y > this.BgNode.y) {//解决摄像机和背景下移问题
                cc.tween(this.BgNode)
                    .to(0.5, { y: this.BambooArr[num].y })
                    .start();
                cc.tween(this.MainCamera)
                    .to(0.5, { y: this.BambooArr[num].y })
                    .start();
            }
            this.NewBamboo(this.BambooArr[num]);
            this.AddScore();
        }
        if (!GameCtrl._ins.boolTouch) { return; }
        this.toushStartPos = Tools.getToNodePosForWorld(touches.getLocation(), this.node);
    }
    /** 触摸移动  回调 */
    touchMoveBack(touches: cc.Event.EventTouch) {
        if (!GameCtrl._ins.boolTouch) { return; }
    }
    /** 触摸结束  回调 */
    touchEndBack(touches: cc.Event.EventTouch) {
        if (!GameCtrl._ins.boolTouch) { return; }
        //  this.gameEnd();
    }

    /** 初始化游戏 */
    initGame() {
        GameCtrl._ins.initGame();
        GameCtrl._ins.boolTouch = true;
    }
    /** 开始游戏 */
    startGame() {
    }
    /** 游戏结束 */
    gameEnd() {
        if (GameCtrl._ins.gameState == GameState.Over) { return; }
        GameCtrl._ins.overGame();
        this.Score.active = false;
        // this.NewChips(200, this.ChipNode);

        weiSan.log("游戏结束");
        this.scheduleOnce(() => {
            UIManager.OpenUI("OverUI");
        }, 3.5);
    };


    /** 事件  监听 */
    addInitListener() {
        EventManager.addListener(EventData.START_GAME, this.startGame.bind(this), this.node);
    }
    onDestroy() {
        EventManager.removeListenerForTarget(this.node);
    }
}
