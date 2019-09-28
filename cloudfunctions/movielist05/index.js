//电影列表
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入request-promise库
const rp = require("request-promise");
//创建url  
// 云函数入口函数
exports.main=async (event,context)=>{
  var url = `http://api.douban.com/v2/movie/in_theaters`;
  //访问密钥key
  url += `?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  url += `&start=${event.start}`;
  url += `&count=${event.count}`;
  //发送ajax请求
  return rp(url).then(res=>{
    //得出结果
    return res;
  }).catch(err=>{
//  失败回调
    console.log(err);
  })
}


