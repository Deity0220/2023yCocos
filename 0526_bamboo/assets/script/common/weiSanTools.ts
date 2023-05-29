export class weiSan {
    /** 是否开启  Log 信息 */
    private static isLog = true;
    private static logName:string = "微伞游戏Log:"
    private static logInfo:string = "本游戏包含的所有内容（包括但不限于：代码、图片、视像及声音内容、名称）的所有权归北京米兜科技有限公司所有。任何单位或个人将本游戏提供的内容与服务用于商业、盈利、广告性等目的时，需征得北京米兜科技有限公司相关权利人的书面许可；将本网站提供的内容与服务用于非商业用途时，应遵守著作权法以及其他相关法律的规定，不得侵犯游戏所有者及相关权利人的权益。"

    /** 普通log信息 */
    public static log(...data: any[]): void {
        if (!this.isLog) { return; }
        console.log(this.logName,...data);
    }
    /** 追踪函数调用的log */
    public static logTrace(...data: any[]){
        if (!this.isLog) { return; }
        console.trace(this.logName,...data);
    }
    /** 打印错误log信息 */
    public static error(...data: any[]): void {
        if (!this.isLog) { return; }
        console.error(this.logName,...data);
    }
    /** 打印警告log信息 */
    public static warn(...data: any[]): void {
        if (!this.isLog) { return; }
        console.warn(this.logName,...data);
    }

    public static initLog(){
        console.log(this.logInfo);
    }
}