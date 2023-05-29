// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Tools } from "../../common/Tools";
import { GameModel } from "../../model/GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Stone: cc.Node = null;
    @property(cc.Node)
    Grass: cc.Node = null;

    onLoad() {
        this.node.width = Tools.random(300, 400);
        this.node.getComponent(cc.BoxCollider).size.width = this.node.width - 30;
    }

    start() {
        let Stone_X = Tools.random(-(this.node.width / 2 - this.Stone.width / 2), (this.node.width / 2 - this.Stone.width / 2), false);
        let Grass_x = Tools.random(-(this.node.width / 2 - this.Grass.width / 2), (this.node.width / 2 - this.Grass.width / 2), false);

        if (Math.abs(Stone_X - Grass_x) < 70) {//草和石头重叠重新生成
            this.node.destroy();
            GameModel._ins.mainGame.NewLawn();
        }

        this.Stone.setPosition(Stone_X, 0);
        this.Grass.setPosition(Grass_x, 0);
    }

    update(dt) {
        if (GameModel._ins.mainGame.BgNode.y - this.node.y > GameModel._ins.mainGame.gameHeight) {
            cc.log("destory");
            this.node.destroy();
        }
    }
}
