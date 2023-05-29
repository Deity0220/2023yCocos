import { weiSan } from "../common/weiSanTools";
import { PlatformManager, releaseType } from "./PlatformManager";

/** 网络相关 管理类 */
export class NetworkManager {
    /** 游戏ID */
    public static gameHttpId: number = 0;
    /** 更多游戏 链接 */
    public static moreGameUrl: string;

    /** 初始化 网络相关 */
    public static initNetwork() {
        if (PlatformManager.releaseType == releaseType.h5_common || PlatformManager.releaseType == releaseType.h5_weiSan) {
            this.initNet_H5()
        } else if (PlatformManager.releaseType == releaseType.test_TEST) {
            this.moreGameUrl = "http://m.wesane.com/";
            weiSan.log("发送:---游戏加载成功!");
        }
    }
    /** 初始化 H5 网络请求 */
    private static initNet_H5() {
        this.getHttpGameId();
        this.sendLoadGame();
    }
    /** 通过url 获取gameID  */
    private static getHttpGameId() {
        var url = document.URL;
        var game_id = 0;

        if(PlatformManager.releaseType == releaseType.h5_common){
            var httpUrl = window.location.href;
            var httpHead = httpUrl.substring(0, httpUrl.lastIndexOf("//") + 2);
            var httpMid = window.location.host;
            // var httpAll = httpHead + httpMid + "/Service/Share/index";

            var url = document.URL;
            var index = url.lastIndexOf("\/");
            var str = url.substring(0, index);
            var index = str.lastIndexOf("/");
            game_id = parseInt(str.substring(index + 1, str.length));
            this.gameHttpId = game_id;
            // var endHttp = httpUrl.substring(httpUrl.lastIndexOf("//") + 4, httpUrl.lastIndexOf("com") + 3);
            var curWebMoreGame = httpHead + httpMid

            var urlIndex = curWebMoreGame.lastIndexOf('//')
            var urlG = curWebMoreGame.substring(urlIndex + 2, curWebMoreGame.indexOf("//") + 4);
            if (urlG == 'g.') {
                var newMoreUrl = curWebMoreGame.replace(urlG, "");
                curWebMoreGame = newMoreUrl;
            } else {
            }
            this.moreGameUrl = curWebMoreGame;

            msgHttpUrl.gamePv_commonH5 = httpHead + httpMid +  "/Service/GamePv/index";
            msgHttpUrl.score_commonH5 = httpHead + httpMid +  "/Service/Score/index";
        }else{
            var para = url.substring(url.lastIndexOf("/game/") + 1, url.length);
            var arr = para.split("/");
            if (arr.length >= 2) {
                game_id = parseInt(arr[1]);
            }
            this.moreGameUrl = "http://m.wesane.com/"; // this.httpHead + this.endHttp;
        }
        this.gameHttpId = game_id;
        weiSan.log("gameId:", game_id , this.moreGameUrl );
    };
    /** 向服务器  发送 加载游戏成功 */
    private static sendLoadGame() {
        if(PlatformManager.releaseType == releaseType.h5_weiSan){
            this.sendMsg(msgHttpUrl.gamePv_weiSanH5, "gameID=" + this.gameHttpId.toString(), this.loadGameBack);
        }else if(PlatformManager.releaseType == releaseType.h5_common){
            this.sendMsg(msgHttpUrl.gamePv_commonH5, "gameId=" + this.gameHttpId.toString(), this.loadGameBack);
        }
    };
    /** 发送加载游戏成功回调  */
    private static loadGameBack() {
        weiSan.log("gamePv加载成功");
    }
    /** 向服务器 提交分数 */
    public static sendGameScore(Score: number, gameType:any) {
        if(PlatformManager.releaseType == releaseType.h5_weiSan){
            this.sendMsg(msgHttpUrl.score_weiSanH5 , "gameScore=" + Score + "&gameId=" + this.gameHttpId + "&gameType=" + gameType, this.sendScoreBack);
        }else if(PlatformManager.releaseType == releaseType.h5_common) {
            this.sendMsg(msgHttpUrl.score_commonH5 , "gameScore=" + Score + "&gameId=" + this.gameHttpId + "&gameType=" + gameType, this.sendScoreBack);
        }
    };
    /** 向服务器 提交分数回调  */
    private static sendScoreBack(Event:any) {
        weiSan.log("---提交分数成功!" + Event);
        if(Event.currentTarget.response != null && Event.currentTarget.response != ""){
            var endShowText = JSON.parse(Event.currentTarget.response);
            // weiSan.log("sendScoreBack:",endShowText.content);
        }
    }

    /** 向服务器 POST请求 http */
    public static sendMsg(url: string, postData: any, callback?: any) {
        var request = cc.loader.getXMLHttpRequest();
        request.onreadystatechange = callback;
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(postData);
    };
}
window.NetworkManager = NetworkManager;

/** 网络 消息号数据 */
export var msgHttpUrl = {
    /** 微伞游戏H5 加载成功 */
    gamePv_weiSanH5: "http://www.wesane.com/admin.php/Activityshow/gamelogo",
    /** 微伞游戏H5 提交分数 */
    score_weiSanH5: "http://www.wesane.com/admin.php/Gamescore/saveGamescore",
    /** 通用H5游戏 加载成功 */
    gamePv_commonH5:"",
    /** 通用H5游戏 提交分数 */
    score_commonH5:"",
}