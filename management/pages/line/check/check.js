// pages/line/check/check.js
const app = getApp();
const { serverUrl } = require("../../../utils/constants");
const { sendRequest } = require("../../../utils/util")

Page({
  data: {
    showSource: true ,//控制下拉列表的显示隐藏，false隐藏、true显示
    showTools: true,
    showPosition: true,
    // index1: 0,
    // index2: 0,
    // index3: 0,
    
  },


  // 点击下拉显示框
  selectTap() {
    this.setData({
      showSource: !this.data.showSource
    });
  },

  selectToolsTap(){
    this.setData({
      // showTools: !this.data.showTools
    })

  },

  selectPositionTap() {
    this.setData({
      // showPosition: !this.data.showPosition
    })

  },

  // 点击下拉列表
    optiontext(e) {
    const index1 = e.currentTarget.dataset.index;
    const data = this.data.source[index1];
    console.log(data.name);
   this.Data1=data;
    this.setData({
      index1,
      showSource: !this.data.showSource
    });
  },

  optionPosition(e) {
    const index2 = e.currentTarget.dataset.index;
    const data = this.data.position[index2];
    console.log(data.position);
    this.Data2 = data;
    this.setData({
      index2,
      showPosition: !this.data.showPosition
    });
  },

  optionList(e) {
    const index3 = e.currentTarget.dataset.index;
    const data = this.data.tools[index3];
    console.log(data);
    this.Data3 = data;
    this.setData({
      index3,
      // show: !this.data.showPosition
    });
  },

  addbutton() {
    if (app.globalData.user==null){
      wx.showToast({
        title: '请登录员工号',
        icon: 'none'
    })
    }
    else {
    const data1 = this.Data1;
    const data2 = this.Data2;
    const endPoint = "/addPositionOfTools";
    const dataToSend = {
      name: data1.name,
      position:data2.position,
      user: app.globalData.user
    }
    console.log(dataToSend)
    sendRequest(endPoint, dataToSend, "POST").then(this.querybutton);
  }
    },

  // revise() {
  //   const endPoint = "/revisePositionOfTools";

  // },

  deletebutton() {
    const data3 = this.Data3;
    const endPoint = "/deletePositionOfTools";
    const dataToSend = {
      name:data3.name,
      position:data3.position
    }
    console.log(dataToSend)
    sendRequest(endPoint, dataToSend, "POST").then(this.querybutton);
  },
  

  querybutton() {
    const endPoint = "/queryPositionOfTools";
    sendRequest(endPoint, {}, "GET").then((res) => {
      const {data} = res || {};
      console.log(res)
      this.setData({ tools: data })
    })
  },

  loadbutton() {
    const endPoint = "/queryPositionOfPosition";
    sendRequest(endPoint, {}, "GET").then((res) => {
      const { data } = res || {};
      console.log(res)
      this.setData({ position: data })
    })
  },

  onLoad: function () {
     const endPoint = "/queryPositionOfSource";
    sendRequest(endPoint, {}, "GET").then((res) => {
      const { data } = res || {};
      console.log(res)
      console.log(app.globalData.user)
      const data4 = app.globalData.user
      this.setData({ 
        source: data 
        })
    })
      this.loadbutton();
      // .then(this.loadbutton) 
    },


  clearbutton() {
    const endPoint = "/clearPositionOfTools";
    sendRequest(endPoint, {}, "GET").then((res) => {
      const { data } = res || {};
      console.log(res)
      this.setData({ 
      tools: data,
      showTools: !this.data.showTools,
       })
     })
    .then(this.querybutton)
  },

  

})

