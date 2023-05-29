'use strict';

var Fs = require("fs");
var fsextra = require("fs-extra"); 
// const { type } = require("os");
// var JSZip = require('jszip');
var zlib = require('zlib');
var archiver = require('archiver');
const path = require('path');
const buildH5 = require("./buildWeSane/buildH5");


module.exports = {
  load() {
     buildH5.load();
  },

  unload() {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    /** 打微伞包 */
    "weSaneZip"(){
      buildH5.writeIndex();  //写入Index
      buildH5.copyFloder("web-mobile_WeSane");  //复制替换文件 并打包zip
    },
    /** 打通用包 */
    "commonH5Zip"(){
      buildH5.writeIndex();  //写入Index
      buildH5.copyFloder("web-mobile_Other");  //复制替换文件 并打包zip
    }
  },
};