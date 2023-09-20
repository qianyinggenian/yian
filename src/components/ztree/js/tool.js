export default class ZTreeTool {
  constructor (resourcesTree) {
    // super();
    this.resourcesTree = resourcesTree;
    this.treeNode = null;
  }

  /**
   * @Description 获取树
   * @author qianyinggenian
   * @date 2023/9/20
   */
  getTree () {
    return this.resourcesTree;
  }

  /**
   * @Description 设置点击事件
   * @author qianyinggenian
   * @date 2023/9/20
   * @event
   * @treeId
   * @treeNode
   * @clickFlag
   */
  setOnClick (clickFn) {
    this.resourcesTree.setting.callback.onClick = clickFn;
  }

  /**
   * @Description 设置双击事件
   * @author qianyinggenian
   * @date 2023/9/20
   * @event
   * @treeId
   * @treeNode
   */
  setOnDblClick (onDblClickFn) {
    this.resourcesTree.setting.callback.onDblClick = onDblClickFn;
  }

  /**
   * @Description 用于捕获节点被拖拽的事件回调函数
   * @author qianyinggenian
   * @date 2023/9/20
   * @event
   * @treeId
   * @treeNodes
   */
  setOnDrag (onDragFn) {
    this.resourcesTree.setting.callback.onDrag = onDragFn;
  }

  /**
   * @Description 用于捕获节点被拖拽的事件回调函数
   * @author qianyinggenian
   * @date 2023/9/20
   * @event
   * @treeId
   * @treeNodes
   * @targetNode
   * @moveType
   * @isCopy
   */
  setOnDrop (onDropFn) {
    this.resourcesTree.setting.callback.onDrop = onDropFn;
  }

  /**
   * @Description 设置点击前事件
   * @author qianyinggenian
   * @date 2023/9/20
   * @treeId
   * @treeNode
   * @clickFlag
   */
  setBeforeClick (beforeClickFn) {
    this.resourcesTree.setting.callback.beforeClick = beforeClickFn;
  }

  /**
   * @Description 设置鼠标双击时前事件
   * @author qianyinggenian
   * @date 2023/9/20
   * @treeId
   * @treeNode
   */
  setBeforeDblClick (beforeDblClickFn) {
    this.resourcesTree.setting.callback.beforeDblClick = beforeDblClickFn;
  }

  /**
   * @Description 用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
   * @author qianyinggenian
   * @date 2023/9/20
   * @treeId
   * @treeNode
   */
  setBeforeExpand (beforeExpandFn) {
    this.resourcesTree.setting.callback.beforeExpand = beforeExpandFn;
  }

  /**
   * @Description 用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作
   * @author qianyinggenian
   * @date 2023/9/20
   * @treeId
   * @treeNode
   */
  setBeforeDrag (beforeDragFn) {
    this.resourcesTree.setting.callback.beforeDrag = beforeDragFn;
  }

  /**
   * @Description 用于捕获节点拖拽操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作
   * @author qianyinggenian
   * @date 2023/9/20
   * @treeId
   * @treeNodes
   * @targetNode
   * @moveType
   * @isCopy
   */
  setBeforeDrop (beforeDropFn) {
    this.resourcesTree.setting.callback.beforeDrop = beforeDropFn;
  }

  /**
   * @Description 设置勾选事件
   * @author qianyinggenian
   * @date 2023/9/20
   * @event
   * @treeId
   * @treeNode
   */
  setOnCheck (checkFn) {
    this.resourcesTree.setting.callback.onCheck = checkFn;
  }

  /**
   * @Description 设置勾选前事件
   * @author qianyinggenian
   * @date 2023/9/20
   * @treeId
   * @treeNode
   * @clickFlag
   */
  setBeforeCheck (beforeCheckFn) {
    this.resourcesTree.setting.callback.beforeCheck = beforeCheckFn;
  }
}
