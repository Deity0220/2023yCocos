import { EventData, EventManager } from "../manager/EventManager";
import { PlatformManager, releaseType } from "../manager/PlatformManager";

export class AdManager_ZJ {
    /** 单例模式 */
    private static _instance: AdManager_ZJ = new AdManager_ZJ();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }
    /** appID */
    app_id: string = "tta582d33f3abc001a02";
    /** 插屏ID */
    ad_inter_id: string = "2mrqugugp7e9f29c36";
    /** 激励ID */
    ad_video_id: string = "9e617go08ho2094lcq";
    /** bannerID */
    ad_banner_id: string = "5qmmte1agjm5fjd50r";

    /** 录屏相关 */
    recorder: any = null;
    videoPath: any = null;   //录屏路径
    videoTimer: any = null;   //录屏计时器 300s 内要停止录屏

    ad_banner: any = null;  //banner广告;
    ad_video: any = null;  //视频广告;

    videoBack: () => void | null;  //视频广告完成回调
    errorBack: (isOut:boolean) => void | null;  //视频广告失败回调

    /** 加载或者初始化所有广告 */
    loadAllAd() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }

        this.initBanner();
        this.initVideoAd();
    };
    /** 初始化加载 视频广告 */
    private initVideoAd() {
        let self = this;
        this.ad_video = tt.createRewardedVideoAd({
            adUnitId: self.ad_video_id,
        });

        this.ad_video.onLoad(() => {
            console.log("视频广告加载完成!");
        });
        this.ad_video.load();
    };
    /** 初始化加载 banner */
    private initBanner() {
        let self = this;
        let iphoneData = tt.getSystemInfoSync();
        var bannerData = {
            left: iphoneData.screenWidth,//广告位区域左上角横坐标
            top: iphoneData.screenHeight,//广告位区域左上角纵坐标
            width: iphoneData.screenWidth,//广告位区域宽度
        }

        this.ad_banner = tt.createBannerAd({
            adUnitId: self.ad_banner_id,
            adIntervals: 20,
            style: bannerData,
        });
    };
    /** 显示Banner广告 */
    public showBanner() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        if (!this.ad_banner) {
            this.initBanner();
            // return;
        };

        if (this.ad_banner.show) {
            this.ad_banner.show();
        } 

        this.ad_banner.onLoad( () => {
            this.ad_banner.show().then(() => {
                console.log("广告显示成功");
            }).catch((err: any) => {
                console.log("广告组件出现问题", err);
                this.ad_banner = null;
            });
        } );
    };
    /** 隐藏Banner广告 */
    public hideBanner() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        if (!this.ad_banner) { return; }
        this.ad_banner.hide();
    };
    /** 播放插屏广告 */
    public showIntersAd() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        let self = this;
        var interstitialAd = tt.createInterstitialAd({
            adUnitId: self.ad_inter_id,
        });
        interstitialAd.load()
        .then(() => {
            interstitialAd.show().then(() => {
                console.log("插屏广告展示成功");
            });
        }).catch((err: any) => {
            console.log(err);
        });
        console.log("showIntersAd");
    }
    /** 播放视频广告  成功回调   失败回调 */
    public showVideoAd(finishBack?: () => void, errorBack?: () => void) {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        this.videoBack = null;
        this.errorBack = null;
        if (finishBack) {
            this.videoBack = finishBack;
        } if (errorBack) {
            this.errorBack = errorBack;
        }

        if(!this.ad_video){
            this.initVideoAd();
        }

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

        this.ad_video.onClose((res: any) => {
            if (res.isEnded) {
                console.log("获取奖励")
                this.finishVideo();
            } else {
                console.log("没有观看完毕--")
                this.errorVideo(true);
            }
            if (res.count) {
                //在支持多例模式的版本上会返回该字段，并且是否返回该字段与multiton是否为true无关
                //判断观看了几次广告
            }
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
    errorVideo(isOut:boolean = false) {
        if (this.errorBack) {
            this.errorBack(isOut);
        }
        this.videoBack = null;
        this.errorBack = null;
    };


    /** 开始录屏 */
    createVideoScreen() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        if (this.videoTimer !== null) {
            clearTimeout(this.videoTimer);
            this.videoTimer = null;
        }
        var self = this;

        this.recorder = tt.getGameRecorderManager();
        this.recorder.onStart((s: any) => {
            console.log("开始录屏:", s);
        });
        this.recorder.onError((s: any) => {
            console.log("录屏错误:", s);
        });
        this.recorder.start({
            duration: 300
        });

        this.videoTimer = setTimeout(() => {
            self.stopVideoScreen();
        }, 1000 * 280);  //280s 后停止录屏
    };
    /** 停止录屏 */
    stopVideoScreen() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        if (this.videoTimer !== null) {
            clearTimeout(this.videoTimer);
            this.videoTimer = null;
        }
        var self = this;

        console.log(this.recorder)
        if (!this.recorder || !this.recorder.stop) { return; }

        this.recorder.onStop((s: any) => {
            self.videoPath = s.videoPath;
        });
        this.recorder.stop();
    };
    /** 分享视频   shareTopics 分享话题  shareTitle 分享内容 */
    shareScreenVideo(shareTopics?: [string], shareTitle?: string) {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }
        shareTopics = shareTopics || ['大战小黑'];
        shareTitle = shareTitle || '来大战25个回合~~';

        var self = this;
        tt.shareAppMessage({
            channel: 'video',
            title: shareTitle,
            imageUrl: '',
            query: '',
            extra: {
                videoPath: self.videoPath, // 可用录屏得到的视频地址
                videoTopics: shareTopics
            },
            success() {
                // EventManager.dispachEvent(EventData.SHARE_SUCESS);  //抛出分享成功的事件
                console.log('分享视频成功');
            },
            fail(e: any) {
                console.log('分享视频失败' + e);
            }
        });
        console.log("shareScreenVideo")
    };
    /** 添加更多游戏 */
    addMoreGame( ){
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }

        setTimeout( () => {
            let iphoneData = tt.getSystemInfoSync();
            console.log(iphoneData);
            tt.showGridGamePanel({
                query: {   //Json 格式
                    '花花僵尸': 'ttd12aa7974e142ca002'
                    // '套个甜甜圈神龙版': 'tt3fa54918a09c3fc802',
                    // '山楂串': 'ttcf15b9a8502cccbb02',
                    // '合成大西瓜原创版': 'tt425534e8dd6e24d1'
                },
                type: 'one',  // 'four', 'two'
                size: 'medium',
                position: {
                    top: iphoneData.screenHeight / 2 - 70,
                    left: iphoneData.screenWidth - 70,
                },
                fail(res:any) {
                    console.log(res);
                }
            });
        }, 100 );
    };
    /** 隐藏更多游戏 */
    hideMoreGame() {
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }

        tt.hideGridGamePanel();
    };
    /** 添加桌面功能 */
    addTable(){
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }

        tt.addShortcut( {
            success: function (res:any) {
                console.log("添加桌面成功！" + res);
                // EventManager.dispachEvent(EventData.ADD_TABLE_SUCESS);
            },
            fail: function (res:any) {
                console.log("添加桌面失败！" + res);
            }
        } );
    }
    /** 是否已经添加过桌面了 */
    isAddTable(){
        if (PlatformManager.releaseType != releaseType.applet_ziJie) { return; }

        tt.checkShortcut({
            success: function (res:any) {
                console.log(res.status);
                if (res.status.exist) {
                    console.log("已经添加桌面了")
                }
            },
            fail: function (res:any) {
            }
        });
    }
}