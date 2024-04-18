export default {
  // 是否显示弹窗
  visible: {
    type: Boolean,
    default: false
  },
  // 按钮数组
  btnList: {
    type: Array,
    default: () => []
  },
  // 标题
  title: {
    type: String,
    default: '标题'
  },
  // 是否显示按钮
  isShowBtn: {
    type: Boolean,
    default: true
  },
  // 按钮名称
  btnName: {
    type: String,
    default: '保存'
  },
  // 弹窗宽度
  width: {
    type: String,
    default: '50%'
  },
  // 弹窗高度
  height: {
    type: String,
    default: '50%'
  },
  // 关闭前是否需要确认
  isNeedConfirm: {
    type: Boolean,
    default: true
  },
  // Dialog CSS 中的 margin-top 值
  top: {
    type: String,
    default: '10vh'
  },
  // 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
  modalAppendToBody: {
    type: Boolean,
    default: false
  },
  // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
  appendToBody: {
    type: Boolean,
    default: false
  },
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: {
    type: Boolean,
    default: true
  },
  // Dialog 的自定义类名
  customClass: {
    type: String
  },
  // 是否可以通过点击 modal 关闭 Dialog
  closeModal: {
    type: Boolean,
    default: false
  },
  // 是否可以通过按下 ESC 关闭 Dialog
  closeEscape: {
    type: Boolean,
    default: true
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  // 是否对头部和底部采用居中布局
  center: {
    type: Boolean,
    default: false
  },
  destroyClose: {
    type: Boolean,
    default: false
  },
  /* 是否显示按钮插槽  */
  isShowFooter: {
    type: Boolean,
    default: true
  },
  /* 层级  */
  zIndex: {
    type: Number,
    default: 2020
  }
};
