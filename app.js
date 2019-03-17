App({
    data: {
        userInfo: [],
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLaunch: function () {
        //获取用户登录信息
        this.userInfo = wx.getStorageSync('userInfo_');
        //判断用户是否登录
        if (this.userInfo != null) {
            // wx.reLaunch({
            //   url: '/pages/logi/logi/logi',
            // })
        }

    },
    globalData: {
        userInfo: null
    }
})