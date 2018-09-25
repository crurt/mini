Page({
  onTapJump: function(event) {
    wx.navigateTo({
      url: '../post/post',
      success: function() {
        console.log("jump success")
      },
      fail: function() {
        console.log("jump failed")
      },
      complete: function() {
        console.log("jump complete")
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("page is unload")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("page is hide")
  }
})