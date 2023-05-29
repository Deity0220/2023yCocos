
export class AdManager_H5 {
    /** 单例模式 */
    private static _instance: AdManager_H5 = new AdManager_H5();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }

    private videoBack:() => void | null;  //视频广告完成回调
    private errorBack:() => void | null;  //视频广告失败回调

    /** 播放插屏广告 */
    public showIntersAd(){
        adBreak({
            type: 'next', 
            name: 'restart-game'
        });
    }

    /** 播放视频广告 */
    public showVideoAd( finishBack?:() => void,errorBack?:() => void ){
        this.videoBack = null;
        this.errorBack = null;
        if(finishBack){
            this.videoBack = finishBack;
        }if(errorBack){
            this.errorBack = errorBack;
        }
        adBreak({
            type: 'reward',
            name: 'dasdf',
            beforeReward: (showAdFn: any) => {
                // cc.log('--beforeReward--');
                showAdFn();
            },
            adDismissed: () => {
                // cc.log('adDismissed');
                this.errorVideo();
            },              
            adViewed: () => {
                // cc.log('adViewed');
                this.finishVideo();
            },
            adBreakDone: (placementInfo: any) => {
                // cc.log('placementInfo');
                this.finishVideo();
            },
        });
    }
    /** 视频播放完成 */
    finishVideo(){
        if(this.videoBack){
            this.videoBack();
        }
        this.videoBack = null;
        this.errorBack = null;
    }
    /** 视频播放失败 */
    errorVideo(){
        if(this.errorBack){
            this.errorBack();
        }
        this.videoBack = null;
        this.errorBack = null;
    }
}