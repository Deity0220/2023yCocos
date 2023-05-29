import MainGame from "../game/MainGame";

/** 游戏数据相关 */
export class GameModel {
    /** 单例模式 */
    private static _instance: GameModel = new GameModel();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }
    /** 主场景 名字 */
    mianScene:string = "MainGame";

    /** MainGame脚本 */
    mainGame: MainGame = null;
    /** 游戏分数 */
    gameScore: number = 1;
    /** 平均分  用来计算超越了多少玩家 */
    standScore:number = 80;
    /** 最高分  用来计算超越了多少玩家 */
    gameMaxScore:number = 200;


    
}