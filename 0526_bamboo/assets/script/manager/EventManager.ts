
export class EventManager {
    /**添加一个全局监听
     * @param eventName 事件名
     * @param event 事件Function
     * @param target 添加监听事件的脚本this
    */
    public static addListener(eventName:string,event:any,target:any){
        cc.director.on(eventName,event,target);
    };
    /**
     * 移除一个监听事件
     * @param {*} eventName 事件名
     * @param {*} event 事件Function
     * @param {*} target 添加监听事件的Node
     */
    public static removeListener(eventName:string,event:any,target:any){
        cc.director.off(eventName,event,target);
    };
    /**
     * 派发一个事件   令所有监听此事件的Node执行事件
     * @param {*} eventName 事件名
     * @param {*} arg1 传递的参数1
     * @param {*} arg2 传递的参数2
     * @param {*} arg3 传递的参数3
     * @param {*} arg4 传递的参数4
     * @param {*} arg5 传递的参数5
     */
    public static dispachEvent(eventName:string,arg1?:any,arg2?:any,arg3?:any,arg4?:any,arg5?:any){
        cc.director.emit(eventName,arg1,arg2,arg3,arg4,arg5);
    };
    /**
     * 移除 Node 上的所有事件
     * @param {*} target 需要移除事件的Node
     */
    public static removeListenerForTarget(target:any){
        cc.director.targetOff(target);
    };
};

export enum EventData{
    /** 开始游戏 */
    START_GAME = "START_GAME",
    /** 显示金币 */
    SHOW_GLOD = "SHOW_GLOD",
    /** 复活 */
    REIVE_GAME = "REIVE_GAME",
}