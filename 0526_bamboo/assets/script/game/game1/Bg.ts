// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameModel } from "../../model/GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BgTs extends cc.Component {

    @property(cc.Node)
    BgNode: cc.Node = null;
    @property(cc.Node)
    Bg1: cc.Node = null;
    @property(cc.Node)
    Bg2: cc.Node = null;
    // onLoad () {}

    start() {
        this.BgNode.height = GameModel._ins.mainGame.gameHeight;
        this.Bg1.height = GameModel._ins.mainGame.gameHeight;
        this.Bg2.height = GameModel._ins.mainGame.gameHeight;
        this.Bg1.y = this.BgNode.y;
        this.Bg2.y = this.BgNode.y + GameModel._ins.mainGame.gameHeight;
    }

    update(dt) {
        if (this.BgNode.y - this.Bg1.y >= GameModel._ins.mainGame.gameHeight) {
            this.Bg1.y = this.Bg2.y + GameModel._ins.mainGame.gameHeight;
        }
        if (this.BgNode.y - this.Bg2.y >= GameModel._ins.mainGame.gameHeight) {
            this.Bg2.y = this.Bg1.y + GameModel._ins.mainGame.gameHeight;
        }
    }
}
