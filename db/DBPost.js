var util = require('../util/util.js')

class DBPost {

  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId=postId;
  }
  //得到全部文章信息
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  //保存或更新本地缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  getPostItemById(){
    var postData=this.getAllPostData();
    var len=postData.length;
    for(var i=0;i<len;i++){
      if(postData[i].postId==this.postId){
        return{
          //当前文章
          index:i,
          data:postData[i]
        }
      }
    }
  }

  collect(){
    return this.updatePostData('collect');
  }

  up() {
    return this.updatePostData('up');
  }

  updatePostData(category){
    var itemData=this.getPostItemById(),
      postData=itemData.data,
      allPostData=this.getAllPostData();
    switch(category){
      case 'collect':
        if(!postData.collectionStatus){
          postData.collectionNum++;
          postData.collectionStatus=true;
        }else{
          postData.collectionNum--;
          postData.collectionStatus=false;
        }
        break;
      case 'up':
        if (!postData.upStatus) {
          postData.upNum++;
          postData.upStatus = true;
        } else {
          postData.upNum--;
          postData.upStatus = false;
        }
        console.log(postData.upStatus)
        break;
      default:
        break;
    }
    //更新缓存数据库
    allPostData[itemData.index]=postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }

  //获取文章的评论数据
  getCommentData(){
    var itemData=this.getPostItemById().data;
    //按时间降序排列评论
    itemData.comments.sort(this.compareWithTime);
    var len=itemData.comments.length,
      comment;
    for(var i=0;i<len;i++){
      //将comment中的时间戳转换成可阅读格式
      comment=itemData.comments[i];
      comment.create_time=util.getDiffTime(comment.create_time,true)
    }
    return itemData.comments;
  }

  compareWithTime(value1,value2){
    var flag = parseFloat(value1.crete_time) - parseFloat(value2.crete_time);
    if(flag<0){
      return 1;
    }else if(flag>0){
      return -1;
    }else{
      return 0;
    }
  }

}

export {
  DBPost
}