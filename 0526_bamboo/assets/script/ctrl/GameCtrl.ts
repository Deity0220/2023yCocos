import { Tools } from "../common/Tools";
import { PoolManager } from "../manager/PoolManager";
import { GameModel } from "../model/GameModel";

/** 游戏控制类相关 */
export class GameCtrl {
    /** 单例模式 */
    private static _instance: GameCtrl = new GameCtrl();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }

    /** 当前游戏状态 */
    gameState:GameState;
    /** 是否可点击 屏幕 */
    boolTouch:boolean = false;

    /** 初始化游戏 相关数据 */
    initGame(){
        this.gameState = GameState.Defualt;
        GameModel._ins.gameScore = 0;
        this.boolTouch = false;
    }
    /** 结束游戏 相关数据 */
    overGame(){
        this.gameState = GameState.Over;
        this.boolTouch = false;
        PoolManager.clearAllPool();
    }
}

/** 游戏状态枚举 */
export enum GameState{
    /** 默认状态 */
    Defualt = 0,
    /** 游戏开始 */
    Start = 1,
    /** 游戏暂停 */
    Pause = 2,
    /** 游戏结束 */
    Over = 3,
}