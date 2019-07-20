// pages/schedule/check/check.js

Page({

  data: {

    show: true,//控制下拉列表的显示隐藏，false隐藏、true显示

    selectData: ['805  梅开扳手', '803  指挥棒', '806  耳机', '803  一字解刀 ', '805  对讲机 ', '803红油', '803 白布 ', '806 滑油提篮'],//下拉列表的数据

    index: 0//选择的下拉列表下标

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
  

  
  onLoad: function (options) {



  }



})

