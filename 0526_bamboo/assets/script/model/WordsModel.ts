import { Tools } from "../common/Tools";
import { weiSan } from "../common/weiSanTools";

/** 游戏内 文字翻译相关数据 */
export var WordsModel = {
    gameName:{
        CN:"游戏名字",   //中文
        CHT:"遊戲名字",  //繁体
        EN:"Game Name",   //英文
        KOR:"게임 이름",   //韩文
        JP:"ゲーム名",     //日文
        TH:"ชื่อเกม"       //泰语
    },
    overScoreInfo_0: { CN:"只得0分，全球独一个！",CHT:"只得0分，全球獨一個！", 
    EN:"Only 0, the only one in the world!", KOR:"0점밖에 안 돼, 전 세계에서 하나야!"
    , JP:"0点しか取れません。世界で唯一です", TH:"มีเพียง <NU>0 จุดหนึ่งในโลก" },

    overScoreInfo_1: { CN:"击败了全球",CHT:"擊敗了全球", EN:"Handy: beat the world ", KOR:"격파", JP:"打ち負かす", TH:"ทำให้พ่ายแพ้" },
    overScoreInfo_2: { CN:"的玩家！",CHT:"的玩家！", EN:" of the players!", KOR:"유저!", JP:"のプレイヤー！", TH:"ผู้เล่นของ" },
    overTitle_1:{
        CN:"我真是太厉害了，我在",CHT:"我真是太厲害了，我在",EN:"I'm really great.  I'm in ",
    },
    overTitle_2:{
        CN:"中,",CHT:"中,",EN:". "
    },

    /** 通过语言  获得文字翻译 */
    getStrForLanguage( modelKey:string , languageType?:string){
        languageType = languageType || Tools.getLanguageType();
        if(this[modelKey] ){
            if( this[modelKey][languageType] ){
                return this[modelKey][languageType];
            }
            return this[modelKey]["EN"];
        }else{
            weiSan.log("没有翻译:" + modelKey);
        }
    }

}
// window.WordsModel = WordsModel;