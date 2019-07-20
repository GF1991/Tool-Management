//index.js
//获取应用实例

const app = getApp();
const { serverUrl } = require("../../utils/constants");
const { request } = require("../../utils/util")




Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
    },
  bindLogin: function () {
        if (this.inputValue ){
       if ( this.inputValue.length == 6) {
         const num = this.inputValue ;
         const endPoint = "/queryPositionOfUser";
         const dataToSend = {
              num
         }
         console.log(dataToSend)
         this.sendRequest(endPoint, dataToSend, "POST").then((res) => {
           console.log(res.data);
           if (res.data.length!==0) {
             
           const user = res.data[0].name;
            console.log(user)
             getApp().globalData.user = res.data[0].name
           this.setData({ user })
             wx.showToast({
               title: '登录成功',
               icon: 'success'
             })
             
            

         }
           else {
             const user = res.data;
             wx.showToast({
               title: '该工号未授权',
               icon: 'none'
             })
             this.setData({ user })
         }
         }
         )
          


    }
       else {
         wx.showToast({
           icon: "none",
           title: "工号输入有误"
         })
       }
    }
       
     else {
      wx.showToast({
        icon: "none",
        title: "请输入工号"
      })
    }
    
  },
  onLoad: function () {
    this.inputValue = "";
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  userNameInput(event){
     const value = event.detail.value
    //  console.log(value)
     this.inputValue=value
  },

  sendRequest(endPoint, data, method) {
    return request({
      url: `${serverUrl}${endPoint}`,
      method,
      data,
    }).then((res) => {
      if (res.statusCode === 200) {
        // console.log(res.data)
        
        wx.showToast({
          title: "操作成功",
          icon: "none",
          
        })
      } else {
        wx.showToast({
          title: "操作失败",
          icon: "none"
        })
      }
      return res;
    })
  },



})
