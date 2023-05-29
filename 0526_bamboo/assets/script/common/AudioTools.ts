import { LoadTools } from "./LoadTools";
import { Tools } from "./Tools";

/** 声音相关工具类 */
export class AudioTools {
    /** 单例模式 */
    private static _instance: AudioTools = new AudioTools();
    private constructor() { }
    public static get _ins() {
        return this._instance;
    }
    bgAudio: any;  //背景音乐
    isPlayAudio: boolean = true; //是否播放音效
    isPlayBG: boolean = true; //是否播放音乐

    /** 播放背景音乐 */
    playBG(audioUrl: string, value = 0.5) {
        if (!this.isPlayBG) { return; }
        this.stopBG();
        if (Tools.AudioClipDic.get(audioUrl) != null) {
            this.bgAudio = cc.audioEngine.play(Tools.AudioClipDic.get(audioUrl), true, value);
        } else {
            LoadTools._ins.loadResAny(cc.url.raw('resources/music/' + audioUrl + '.mp3'), cc.AudioClip, (audio: cc.AudioClip) => {
                this.bgAudio = cc.audioEngine.play(audio, true, value);
            });
        }
    };
    /** 停止播放背景音乐 */
    stopBG() {
        this.stopAudio(this.bgAudio);
    };
    /**
     * 播放游戏音效
     * @param audioUrl 音效文件的res/music/的路径 或者 resArr拖动的名字
     * @param value 音量大小
     * @param isLoop 是否循环播放
     */
    playAudio(audioUrl: string, value = 0.5, isLoop = false) {
        if (!this.isPlayAudio) { return; }
        if (Tools.AudioClipDic.get(audioUrl) != null) {
            return cc.audioEngine.play(Tools.AudioClipDic.get(audioUrl), isLoop, value);
        } else {
            LoadTools._ins.loadResAny(cc.url.raw('resources/music/' + audioUrl + '.mp3'), cc.AudioClip, (audio: cc.AudioClip) => {
                cc.audioEngine.play(audio, true, value);
            });
        }
    };
    /** 停止播放某个音效 */
    stopAudio(audioE: any) {
        if (audioE != null) {
            cc.audioEngine.stop(audioE);
            audioE = null;
        }
    }
    /**
     * 新建一个audioSource 来播放音效
     * @param audioUrl 音效文件的res/music/的路径 或者 resArr拖动的名字
     * @param value 音量大小
     * @param isLoop 是否循环播放
     */
    playAudioSource(audioUrl: string, value = 0.5, isLoop = false) {
        if (!this.isPlayAudio) { return; }
        if (Tools.AudioClipDic.get(audioUrl) != null) {
            return this.newAduioSource(Tools.AudioClipDic.get(audioUrl), value, isLoop);
        } else {
            LoadTools._ins.loadResAny(audioUrl, cc.AudioClip, (audioE: cc.AudioClip) => {
                this.newAduioSource(audioE, value, isLoop);
            });
        }
    }
    /** 新建一个 audioSource 播放音效 */
    newAduioSource(audioClip: cc.AudioClip, value = 0.5, isLoop = false) {
        let node = new cc.Node();
        let audioE = node.addComponent(cc.AudioSource);
        audioE.clip = audioClip;
        audioE.loop = isLoop;
        audioE.volume = value;

        audioE.play();
        if (isLoop == false) {
            cc.tween(node).delay(audioE.getDuration() + 0.1)
                .removeSelf().union().start();
        }
        return audioE;
    };
}