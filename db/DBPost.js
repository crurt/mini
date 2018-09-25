class DBPost {

  constructor(url) {
    this.storageKeyName = 'postList';
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
  execSetStorageSync() {
    wx.setStorageSync(this.storageKeyName, data);
  }

}

export {
  DBPost
}