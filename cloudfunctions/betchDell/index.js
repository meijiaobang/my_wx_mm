// 云函数入口文件
const cloud = require('wx-server-sdk')
//创建数据库对象
cloud.init()
const db=cloud.database();
// 添加main函数
// 云函数入口函数
exports.main = async (event, context) => {
  //对a的数据库操作
  try{
  return await db.collection("a")
  // 删除条件为
  .where({c:3000})
  .remove();
}catch(e){
  console.log(e)
  }
}