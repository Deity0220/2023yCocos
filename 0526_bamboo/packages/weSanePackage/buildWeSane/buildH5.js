var Fs = require("fs");
var fsextra = require("fs-extra"); 
var zlib = require('zlib');
var archiver = require('archiver');
const path = require('path');

module.exports = {
  load() {
    this.webUrl = Editor.Project.path + "/build/web-mobile";    //打h5包的路径
    this.replaceUrl = Editor.Project.path + "/build/replace_H5"; //替换文件路径
    this.indexUrl = this.webUrl + "/index.html";  //index 位置

    //需要 复制 的文件
    this.replaceUrls = [
      "/weSane.js",
      "/res",
    ]
    /** index 需要写入的  数据  row行数 */
    this.writeIndexData = [
      { rowNum:50, writeType:'ADD', str: '<div id="bgColorImg" style="align:center;width:100%;height:100%;position:absolute; ">  <img src="res/singleColor.png" width="100%" height="100%" />  </div>' } ,
      { rowNum:51, writeType:'ADD', str: '<div id="loadingImg" style="top:40%;align:center;width:100%;position:absolute;z-index:10;">  <img src="res/loading.gif" width="50" height="50" />  </div>' } ,
      { rowNum:52, writeType:'ADD', str: '<div id="loadingText" type="text"  style="width:100%;text-align:center;position:absolute;top:50%;z-index:99;font-size:25px;color:#f99f0a" > </div> ' },

      { rowNum:53, writeType:'ADD', str: '<div style="align:center;display: none"><img src="res/share.jpg" width="10%" /></div> ' },
      { rowNum:54, writeType:'ADD', str: ' <script src="weSane.js" charset="utf-8"> </script> ' },
    ]
  },
  
  /** 写入 index 文件 */
  writeIndex() {
    let indexStr = Fs.readFileSync(this.indexUrl, 'utf8');//读取文件
    let strArr = indexStr.split("\n"); //按回车分割成数组
    this.addStrArrData(this.writeIndexData,strArr);
   
    let weSaneJs = Fs.readFileSync( this.replaceUrl + "/weSane.js" , 'utf8').split("\n");
    strArr[5] = "    <title>" + weSaneJs[4].split('"')[1] + '</title>' ; //修改标题

    let writeStr = "";  //写入inex的字符串
    for (let i = 0; i < strArr.length; i++) {
        if( i < strArr.length - 1){
          writeStr += (strArr[i] + "\n");
        }
    }
    Fs.writeFileSync(this.indexUrl,  writeStr, 'utf8' );
    Editor.log("index 写入成功");
  },
  /** 复制文件  打包zip 的名字 */
  copyFloder(zipName){
    for (let i = 0; i < this.replaceUrls.length; i++) {
      fsextra.copySync( this.replaceUrl + this.replaceUrls[i] , this.webUrl + this.replaceUrls[i] , 0 );
    }
    Editor.log("复制文件完成");
    // this.gzip(Editor.Project.path + "/build/web-mobile/weSane.js" );
    let outurl = Editor.Project.path + '/build/' + zipName + '.zip';  //zip 输出目录
    this.deleteFile(outurl);

    this.zipFolder(this.webUrl , outurl , function(err, msg) {
      console.log(err, msg);
    });
  },
  /** 删除文件 */
  deleteFile(url) {
    if (Fs.existsSync(url)) {
        Fs.unlinkSync(url);
    }
  },
  /** 打包Zip */
  zipFolder(sourceFolder, destZip, cb, subdir) {
    var output = Fs.createWriteStream(destZip);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });
    archive.pipe(output);
    archive.directory(sourceFolder, subdir ? sourceFolder.substr(path.dirname(sourceFolder).length + 1) : false);
    archive.finalize();
    Editor.log("打包zip 完成");
  },

  /** 添加 需要写入的配置里面的字符串 */
  addStrArrData(dataArr,strArr){

    for (let i = 0; i < dataArr.length; i++) {
      if( dataArr[i].writeType == 'ADD' ){
        if(strArr[dataArr[i].rowNum - 1] == dataArr[i].str) { continue; }
        strArr.splice( dataArr[i].rowNum - 1 , 0, dataArr[i].str );
      }else if(dataArr[i].writeType == 'REVISE'){
        strArr[dataArr[i].rowNum - 1] = dataArr[i].str;
      }else if(dataArr[i].writeType == 'DELETE'){
        strArr[dataArr[i].rowNum - 1] = '';
      }
    }

  }
};