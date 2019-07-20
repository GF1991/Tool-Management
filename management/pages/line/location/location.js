// pages/line/location/location.js
Page({

  data: {

    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示

    selectData: ['801', '802', '803', '804', '805', '806'],//下拉列表的数据
    selectData2: ['剪刀', '锤子', '塞规', '指挥棒', '耳机', '快卸'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    index2: 0//选择的下拉列表下标
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



  // optionTap(e) {

  //   let Index = e.currentTarget.dataset.index2;//获取点击的下拉列表的下标

  //   this.setData({

  //     index2: Index,


  //     show: !this.data.show

  //   });

  // },

  onLoad: function (options) {



  }



})

