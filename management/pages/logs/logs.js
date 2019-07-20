//logs.js

const { serverUrl } = require("../../utils/constants");
const { sendRequest } = require("../../utils/util")

var idinfolist = [
  { "code": "1", "text": '红油' },
  { "code": "2", "text": '卡拉' },
  { "code": "3", "text": '磅表' },
  { "code": "4", "text": '警告牌' },
  { "code": "5", "text": '滑油提篮' },
  { "code": "6", "text": '对讲机' },
  { "code": "7", "text": '梅开扳手' }
]

Page({
  data: {
    listData: [],
    inputValue: '', //用于显示输入语句
    searchinput: '', //用户输入的查询语句
  },
  onLoad() {
    const userName = getApp().globalData.user
    const endPoint = "/queryUserTools";
    sendRequest(endPoint, { userName }, "post").then((res) => {
      const { data } = res || {};
      console.log(res)
      const listData = data.map(tool => {
        return {
          text: tool.name,
        }
      })
      console.log(this)
      this.setData({ listData })
    })
  },
  previewPDF(){
    console.log(9)
    wx.openDocument({
      fileType: "pdf",
      filePath: "/109-127.pdf"
    })
  },
    bindNew() {
      this.onLoad()

  },
})