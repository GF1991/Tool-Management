// pages/schedule/borrow/borrow.js
var app = getApp()
Page({
  data: {

    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示

    selectData: ['805  梅开扳手', '803  指挥棒', '806  耳机', '803  一字解刀 ', '805  对讲机 ', '803红油', '803 白布 ', '806 滑油提篮'],//下拉列表的数据
    index: 0,//选择的下拉列表下标

  },

  //用户名和密码输入框事件
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  // 点击下拉显示框

  selectTap() {

    this.setData({

      show: !this.data.show

    });

  },

  // 点击下拉列表

  optionTap(e) {

    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标

    this.setData({

      index: Index,

      show: !this.data.show

    });

  },

  addtext(e) {
    const index = e.currentTarget.dataset.index;
    const data = this.data.selectData[index].split(" ");

    console.log(data)
    this.Data = data
  },


  addbutton() {
    const data = this.Data;
    console.log(data)

    const endPoint = "/addPositionOfTools";
    const dataToSend = {
      number: data[0].trim(),
      name: data[1].trim(),
    }
    console.log(dataToSend)
    this.sendRequest(endPoint, dataToSend, "POST");
  },



  revise: function (event) {
    console.log(event)
  },


  // revise() {
  //   const endPoint = "/revisePositionOfTools";

  // },

  // remove() {
  //   const endPoint = "/removePositionOfTools";

  // },

  // query() {
  //   const endPoint = "/queryPositionOfTools";
  //   this.sendRequest(endPoint, {}, "GET").then((res) => {
  //     console.log(res)
  //     this.setData({ tools: res })
  //   })
  // },

  sendRequest(endPoint, data, method) {
    return request({
      url: `${serverUrl}${endPoint}`,
      method,
      data,
    }).then((res) => {
      if (res.data === "success") {
        wx.showToast({
          title: "操作成功",
          icon: "none"
        })
        return res;
      } else {
        wx.showToast({
          title: "操作失败",
          icon: "none"
        })
      }
    })
  },

})

