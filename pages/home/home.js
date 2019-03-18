var userInfo_ = wx.getStorageSync('userInfo');
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false,
        name:'',
        score:0,
        children:0,
        msg:'',
        userId:''
    },
    onLoad: function () {
      let that = this;
        if (!userInfo_ || userInfo_.type == 0 || userInfo_.state == 0) {
            wx.showLoading({
              title: '加载中',
            });
            wx.login({
                success: function (res) {
                    var code = res.code;//登录凭证
                    wx.request({
                        url: 'http://127.0.0.1:8080/star-server/lgoin/',
                        method: 'get',
                        header: {
                            "Content-Type": "applciation/json"
                        },
                        data: {code: code},
                        success: function (data) {
                          console.log(data.data.success)
                            if (data.data.success) {
                                var user = data.data.object.object;
                                wx.setStorageSync('userInfo', user)
                              typeof getChildren == "function" && getChildren(user)
                              that.setData({ userId: user.id})
                              if (user != null && user.type == 0) {
                                wx.reLaunch({
                                  url: '/pages/logi/logi/logi',
                                })
                                return ;
                              }
                              if (user != null && user.state == 0) {
                                    wx.reLaunch({
                                      url: '/pages/logi/logiMsg/logiMsg',
                                    })
                                } 
                              wx.hideLoading();
                            }else{
                              wx.reLaunch({
                                url: '/pages/logi/logi/logi',
                              })
                            }
                        },
                        fail: function () {
                            console.log('系统错误')
                        }
                    })
                },
                fail: function () {
                    console.log('登陆失败')
                }
            })
        }
  }, 
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  }, getChildren: function (user){
    wx.request({
      url: 'http://127.0.0.1:8080/star-server/children/get_children',
      data: { userId: user.id },
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        console.log(res.data.success)
        if (res.data.success) {
          var name = res.data.object.object.name;
          var score = res.data.object.object.score;
          var childrenId = res.data.object.object.id;
          that.setData({ name: name, score: score, childrenId: childrenId })
        }
      }
    })
  },
  addScore:function(e){
    var score = parseInt(e.currentTarget.dataset.score);
    var msg = e.currentTarget.dataset.msg;
    console.log(msg)
    this.setData({ score: this.data.score + score, msg: msg});
    wx.request({
      url: 'http://127.0.0.1:8080/star-server/children/add_score',
      data: this.data,
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        if (res.data.success) {
          
        }
      }
    })
  }
})
