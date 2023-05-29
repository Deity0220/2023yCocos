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
export default class BambooTs extends cc.Component {

    BoxCollider: cc.BoxCollider;
    RockTween: cc.Tween = null;
    Angle: number = 0;

    onLoad() {
        this.BoxCollider = this.node.getComponent(cc.BoxCollider);
        this.BoxCollider.enabled = false;     //初始不启用碰撞
    }

    start() {
        this.node.getChildByName("B_Node").opacity = 100;
        this.Angle = GameModel._ins.mainGame.BambooArr[GameModel._ins.mainGame.BambooArr.length - 2].angle;        //当前角度等于上一根竹子的角度
        this.node.angle = this.Angle;
        // this.node.opacity = 150;
        this.Rock();
        if (!GameModel._ins.mainGame.IsFirst) {
            this.CreateChip(10, this.node);
        }
    }

    update(dt) {
        if (GameModel._ins.mainGame.BgNode.y - this.node.y > GameModel._ins.mainGame.gameHeight) {
            GameModel._ins.mainGame.BambooArr.shift();
            this.node.destroy();
        }
    }

    //摇摆
    Rock() {
        this.RockTween = cc.tween(this.node)
            .to(1, { angle: this.Angle + 60 })
            .to(1, { angle: this.Angle - 60 })
            .call(() => {
                this.Rock();
            })
            .start();
    }

    onCollisionEnter(other, self) {
        if (other.tag == 0) {//游戏结束
            GameModel._ins.mainGame.IsOver = true;
            GameModel._ins.mainGame.BambooArr[GameModel._ins.mainGame.BambooArr.length - 1].opacity = 0;
            cc.tween(this.node.children[0])
                .to(0.25, { color: cc.color(255, 0, 0) })
                .to(0.25, { color: cc.color(255, 255, 255) })
                .union()
                .repeat(3)
                .call(() => {
                    for (let i = 1; i < GameModel._ins.mainGame.BambooArr.length - 1; ++i) {
                        let bamboo = GameModel._ins.mainGame.BambooArr[i];
                        bamboo.getComponent(cc.BoxCollider).enabled = false;
                        bamboo.addComponent(cc.RigidBody);
                        bamboo.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                        bamboo.getComponent(cc.RigidBody).gravityScale = 10;
                        bamboo.getComponent(cc.RigidBody).angularVelocity = Tools.random(100, 200, false);
                        bamboo.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
                    }
                    // for (let bamboo of GameModel._ins.mainGame.BambooArr) {
                    //     bamboo.getComponent(cc.BoxCollider).enabled = false;
                    //     bamboo.addComponent(cc.RigidBody);
                    //     bamboo.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                    //     bamboo.getComponent(cc.RigidBody).gravityScale = 10;
                    //     bamboo.getComponent(cc.RigidBody).angularVelocity = Tools.random(100, 200, false);
                    //     bamboo.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
                    // }
                    this.NewChips(200, GameModel._ins.mainGame.ChipNode);
                    GameModel._ins.mainGame.gameEnd();
                })
                .start();
        }
    }

    ChipArr: Array<cc.Node> = [];
    CreateChip(number: number, NewNode: cc.Node) {
        //+1
        let AddOne = Tools.newPrefab("AddScore");
        let pos = Tools.getToWorldPosAR(NewNode);
        AddOne.setParent(cc.director.getScene());
        AddOne.setPosition(cc.v2(pos.x + 100, pos.y));
        cc.tween(AddOne)
            .parallel(
                cc.tween().to(0.5, { opacity: 0 }),
                cc.tween().to(0.5, { position: cc.v3(pos.x + 100, pos.y + 100) })
            )
            .start();

        //竹叶
        for (let i = 0; i < number; ++i) {
            let Chip = Tools.newSprite("Chip");
            Chip.setParent(cc.director.getScene());
            Chip.setPosition(cc.v2(pos.x, pos.y));
            Chip.addComponent(cc.RigidBody);
            Chip.scale *= Tools.random(0.5, 1.1, false);
            this.ChipArr.push(Chip);
            for (let chip of this.ChipArr) {
                chip.getComponent(cc.RigidBody).angularVelocity = Tools.random(100, 200, false);
                chip.angle = Tools.random(0, 180);
                chip.getComponent(cc.RigidBody).linearVelocity = cc.v2(Tools.random(-100, 100), Tools.random(0, -500));
            }
        }

        for (let chip of this.ChipArr) {
            cc.tween(chip)
                .to(1.5, { opacity: 0 })
                .call(() => {
                    chip.destroy()
                })
                .start();
        }


    }

    ChipArr1: Array<cc.Node> = [];
    NewChips(number: number, NewNode: cc.Node) {
        let pos = Tools.getToWorldPosAR(NewNode);

        for (let i = 0; i < number; ++i) {
            let chip = Tools.newSprite("Chip");
            chip.setParent(cc.director.getScene());
            chip.setPosition(pos);
            chip.addComponent(cc.RigidBody);
            chip.scale *= Tools.random(0.5, 0.8);

            this.ChipArr1.push(chip);

        }
        for (let chip of this.ChipArr1) {
            chip.getComponent(cc.RigidBody).angularVelocity = Tools.random(100, 200, false);
            chip.angle = Tools.random(0, 180);
            chip.getComponent(cc.RigidBody).linearVelocity = cc.v2(Tools.random(-300, 300), Tools.random(0, 500));
            cc.tween(chip)
                .to(Tools.random(2, 5, false), { opacity: 0 })
                .start();
        }
    }

}
