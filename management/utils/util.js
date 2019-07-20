
const {serverUrl} = require("./constants.js")
function request(option){
  return new Promise((resolve, reject)=>{
    wx.request({
      ...option,
      success: resolve,
      fail: reject,
    })
  })
}

function sendRequest(endPoint, data, method) {
  return request({
    url: `${serverUrl}${endPoint}`,
    method,
    data,
  }).then((res) => {
    if (res.statusCode === 200) {
      wx.showToast({
        title: "操作成功",
        icon: "none"
      })
    } else {
      wx.showToast({
        title: "操作失败",
        icon: "none"
      })
    }
    return res;
  })
}

module.exports = {
  request,
  sendRequest,
}
