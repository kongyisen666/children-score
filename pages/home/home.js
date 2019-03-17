var userInfo_ = wx.getStorageSync('userInfo');
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false,
        name:'',
        score:0
    },
    onLoad: function () {
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
                            if (data.data.success == 0) {
                                var user = data.data.userInfo;
                                wx.setStorageSync('userInfo', user)
                                if (user != null && user.state == 0) {
                                    wx.reLaunch({
                                        url: '/pages/logi/logi/logi',
                                    })
                                } 
                                if (user != null && user.type == 0) {
                                    wx.reLaunch({
                                        url: '/pages/logi/logiMsg/logiMsg',
                                    })
                                }
                            }
                            wx.hideLoading();
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
    //获取用户孩子信息
      wx.request({
        url: 'http://127.0.0.1/get_children',
        data: {openid:userInfo_.openid} ,
        method: 'get',
        header: {
          "Content-Type": "applciation/json"
        },
        success: function (res) {
          if (res.data.success) {
            var name = res.data.name;
            var score = res.data.score;
            this.setData({ name: name, score:score})
          }
        }
      })
  },
  addScore:function(data){
    var score = parseInt(data.currentTarget.dataset['score']);
    this.setData({ score: this.data.score + score});
  }
})
