let app = getApp();
var userInfo_ = wx.getStorageSync('userInfo');
Page({
    data: {
        name: "",
        age: "",
        sex: "男",
        phone: "",
        userId: userInfo_.id,        
        hobby: [],
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
       let {name, age, sex, phone, hobby} = e.detail.value;
        this.setData({ userId: userInfo_.id })
        this.setData(e.detail.value)
        if (!name || !age || !phone) {
          wx.showModal({
            title: '提示',
            content: "姓名，年龄，联系方式均不能为空",
            success: function (res) {
              if (res.confirm) {
                //用户点击确定
              } else {
                //用户点击取消
              }
            }
          })
          return;
        }
        console.log(e.detail.value)
        wx.request({
          url: 'http://127.0.0.1:8080/star-server/children/add_children',
          data: this.data,
          method: 'get',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.data.success) {
              wx.setStorageSync('userInfo', res.data.object.object)
              wx.navigateTo({
                url: '/pages/logi/logiMsg/logiMsg',
              })
            } else {
              
            }
          }
        })
      }
})
