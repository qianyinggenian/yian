export default {
  /* 是否显示自定义表格顶部工具栏插槽 */
  isShowSlotToolBar: {
    type: Boolean,
    default: false
  },
  /* 是否显示搜索输入框 */
  isShowSearchInput: {
    type: Boolean,
    default: true
  },
  /* 是否显示默认搜索工具栏 */
  isShowToolBar: {
    type: Boolean,
    default: true
  },
  /* 是否显示默认工具栏 */
  isShowDefaultToolBar: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number,
    default: 0
  },
  /* 是否显示分页 */
  isShowPagination: {
    type: Boolean,
    default: true
  },
  /* 表格标题 */
  tableTitle: {
    type: String,
    default: ''
  },
  /* 搜索框提示语 */
  placeholder: {
    type: String,
    default: '请输入'
  },
  /* 搜索按钮文字 */
  searchBtnLabel: {
    type: String,
    default: '搜索'
  },
  /* 表格数据 */
  tableData: {
    type: Array,
    default: () => []
  },
  /* 表格顶部功能按钮数据 */
  operations: {
    type: Array,
    default: () => []
  },
  /* 列数据 */
  columns: {
    type: Array,
    default: () => []
  },
  /* 表格列表按钮 */
  tableBtns: {
    type: Array,
    default: () => []
  },
  /* 是否显示边框 */
  border: {
    type: Boolean,
    default: false
  },
  /* 是否显示筛选，这里的筛选是筛选列的显示 */
  isShowFilter: {
    type: Boolean,
    default: true
  },
  /* 是否斑马条纹 */
  stripe: {
    type: Boolean,
    default: false
  },

  /* 是否懒加载子节点数据 */
  lazy: {
    type: Boolean,
    default: true
  },
  /* 加载子节点数据的函数 */
  load: {
    type: Function
  },
  /* Table 的尺寸 */
  size: {
    type: String,
    default: 'small'
  },
  /* 是否显示表头 */
  showHeader: {
    type: Boolean,
    default: true
  },
  /* 是否要高亮当前行 */
  highlightCurrentRow: {
    type: Boolean,
    default: true
  },
  /* 表尾合计 */
  showSummary: {
    type: Boolean,
    default: false
  },
  /* 表尾统计文案 */
  sumText: {
    type: String,
    default: '合计'
  },
  /* 自定义合计规则 */
  getSummaries: {
    type: Function
  },
  /* 自定义排序规则 */
  sortMethod: {
    type: Function
  },

  /* 表格行、列合并 */
  spanMethod: {
    type: Function
  },
  /* 是否显示多选框 */
  showCheckbox: {
    type: Boolean,
    default: true
  },
  /* 是否显示序号 */
  showIndex: {
    type: Boolean,
    default: true
  },
  /* 是否固定多选框 */
  isCheckboxFixed: {
    type: Boolean,
    default: false
  },
  /* 是否固定序号 */
  isIndexFixed: {
    type: Boolean,
    default: false
  },
  /* 是否超出隐藏浮现 */
  showOverflowTooltip: {
    type: Boolean,
    default: true
  },
  /* 自定义操作列 */
  slotOperation: {
    type: Boolean,
    default: false
  },
  /* 文字按钮 */
  isShowTextBtn: {
    type: Boolean,
    default: true
  },
  /* 自定义多选框可选 */
  diyHasCheckBox: {
    type: Function
  },
  /* 自定义序号 */
  diyIndexMethod: {
    type: Function
  },
  /* 查询函数 */
  diyGetList: {
    type: Function
  },

  /* 表头样式自定义 */
  renderHeader: {
    type: Function
  },
  pageSize: {
    type: Number,
    default: 20
  },
  currentPage: {
    type: Number,
    default: 1
  },
  operationWidth: {
    type: String,
    default: '250px'
  }

};
