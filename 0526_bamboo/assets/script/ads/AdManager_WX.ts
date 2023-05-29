import { EventData, EventManager } from "../manager/EventManager";
import { PlatformManager, releaseType } from "../manager/PlatformManager";

export class AdManager_WX {
    /** 单例模式 */
    private static _instance: AdManager_WX = new AdManager_WX();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }
    /** appID */
    app_id: string = "wx2c68756779fd1535";
    /** bannerID */
    ad_banner_id: string = "adunit-64d55f82495fec1d";
    /** 插屏ID */
    ad_inter_id: string = "adunit-3e889a9a21c90ec2";
    /** 激励ID */
    ad_video_id: string = "adunit-fc615ecff3915673";

    ad_banner: any = null;  //banner广告;
    ad_video: any = null;  //视频广告;

    gameName:string = "大战小黑";  //游戏名字

    videoBack: () => void | null;  //视频广告完成回调
    errorBack: (isOut: boolean) => void | null;  //视频广告失败回调

    /** 加载或者初始化所有广告 */
    loadAllAd() {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }

        // this.initBanner();
        this.initVideoAd();
        this.addShareMenu();
    };
    /** 初始化加载 视频广告 */
    private initVideoAd() {
        let self = this;

        this.ad_video = wx.createRewardedVideoAd({ adUnitId: self.ad_video_id })
        this.ad_video.load().then(() => {
            console.log("视频广告加载完成!");
        }).catch((err: any) => {
            console.log("视频加载失败:" + err.errMsg)
        });
        this.ad_video.onError((err: any) => {
            this.errorVideo();
            console.log("视频出错:" + err);
            // // 再手动加载一次
            // this.ad_video.load().then(() => {
            //     console.log("手动加载成功");
            //     this.ad_video.show();  // 加载成功后需要再显示广告
            // });
        });
        this.ad_video.onClose((res: any) => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                console.log("正常播放结束，可以下发游戏奖励");
                this.finishVideo();
            } else {
                this.errorVideo(true);
                console.log("播放中途退出，不下发游戏奖励");
            }
        });
    };
    /** 初始化加载 banner */
    private initBanner() {
        var self = this;
        let bannerAd = wx.createBannerAd({
            adUnitId: self.ad_banner_id,
            style: { left: 0, top: 0, width: 720 }
        }
        )
        bannerAd.onResize((res: any) => {
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            bannerAd.style.left = w - bannerAd.style.realWidth / 2 + 0.1;
            bannerAd.style.top = h - bannerAd.style.realHeight + 0.1;
            bannerAd.style.width = phone.screenWidth * 0.8;
            console.log("bannerAd加载成功");
        })
        bannerAd.onError((err: any) => {
            console.log(err)
        });
        this.ad_banner = bannerAd;
    };
    /** 显示Banner广告 */
    public showBanner() {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        if (!this.ad_banner) {
            this.initBanner();
            // return;
        };
        this.ad_banner.show();
    };
    /** 隐藏Banner广告 */
    public hideBanner() {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        if (!this.ad_banner) { return; }
        this.ad_banner.hide();
    };
    /** 播放插屏广告 */
    public showIntersAd() {
        // return;
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        // 定义插屏广告
        let interstitialAd = null;
        interstitialAd = wx.createInterstitialAd({
            adUnitId: this.ad_inter_id
        });
        interstitialAd.show().catch((err: any) => {
            console.error(err)
        });
        console.log("showIntersAd");
    }
    /** 播放视频广告  成功回调   失败回调 */
    public showVideoAd(finishBack?: () => void, errorBack?: () => void) {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        // wx.showToast({
        //     title: '暂无视频广告！',
        //     icon: 'none',
        //     duration: 1500//持续的时间
        // })
        // return;
        this.videoBack = null;
        this.errorBack = null;
        if (finishBack) {
            this.videoBack = finishBack;
        } if (errorBack) {
            this.errorBack = errorBack;
        }

        if (!this.ad_video) {
            this.initVideoAd();
        }

        var self = this;
        this.ad_video.show().then(() => {
            console.log("广告显示成功");
        }).catch((err: any) => {
            this.errorVideo();
            console.log("广告组件出现问题", err);
            // 再手动加载一次
            this.ad_video.load().then(() => {
                console.log("手动加载成功");
                this.ad_video.show();  // 加载成功后需要再显示广告
            });
        });
    }
    /** 视频播放完成 */
    finishVideo() {
        if (this.videoBack) {
            this.videoBack();
        }
        this.videoBack = null;
        this.errorBack = null;
    }
    /** 视频播放失败 isOut 是否中途退出*/
    errorVideo(isOut: boolean = false) {
        if (this.errorBack) {
            this.errorBack(isOut);
        }
        this.videoBack = null;
        this.errorBack = null;
    };

    /** 分享视频   shareTitle 分享内容  imgUrl 分享图路径 resource下的 */
    shareFriends(shareTitle?: string , imgUrl:string = "share") {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        var self = this;
        // wx.showShareMenu();

        shareTitle = shareTitle || '快来大战25个回合~~';
        cc.resources.load(imgUrl,cc.Asset, (err:Error,asset:cc.Asset) => {
            wx.shareAppMessage({
                title: shareTitle,
                imageUrl: asset.url,
                success(res) {
                    console.log("分享成功:", res);
                    return;
                },
                fail(res) {
                    // 转发失败
                    wx.showToast({
                        title: '分享失败',
                        icon: 'none',
                        duration: 1500//持续的时间
                    })
                    return;
                }
            });
        } );
    };
    /** 添加右上角三个点分享 */
    addShareMenu(shareTitle?: string ,imgUrl:string = "share") {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }

        shareTitle = shareTitle || ""
        wx.showShareMenu( {
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
        } );
        cc.resources.load( imgUrl , cc.Asset , (err:Error,asset:cc.Asset) => {
            wx.onShareAppMessage(() => {
                return {
                  title: this.gameName,
                  imageUrl: asset.url // 图片 URL
                }
            });
        } );
    };
    /** 跳转其他更多游戏 */
    toMoreGame() {
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        wx.navigateToMiniProgram({
            appId: 'wxda02fde13d108205',  //其他游戏的appid
            path: 'page/index/index?id=123',
            extraData: {
                foo: 'bar'
            },
            envVersion: 'develop',
            success(res: any) {

            }
        });
    };
    /** 震动 */
    vibrate(){
        if (PlatformManager.releaseType != releaseType.applet_wechat) { return; }
        // console.log("vibrateShort")
        wx.vibrateShort({
            type:'medium'
          })
    }
    /** 添加桌面功能 */
    addTable() {
    }
    /** 是否已经添加过桌面了 */
    isAddTable() {

    }
}