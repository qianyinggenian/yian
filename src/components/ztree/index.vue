<template>
  <div>
    <ul id="treeDemo" class="schema-tree-plus"></ul>
  </div>
</template>

<script>
// import { menuData } from '@/common/data';
import ZTreeTool from './js/tool';

export default {
  name: 'index',
  components: {},
  data () {
    return {
      treeTool: null,
      zTreeObj: {},
      defaultSetting: {
        view: {
          /* 不显示ztree默认的图标 */
          showIcon: false,
          selectedMulti: false
        },
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          drag: {
            isMove: true,
            isCopy: true
          }
        },
        data: {
          key: {
            name: 'text'
          },
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'parentId'
          }
        },
        check: {
          enable: true
        }
      },
      zNodes: []
    };
  },
  props: {
    // https://www.treejs.cn/v3/api.php, 参考官方设置
    setting: {
      type: Object,
      default: () => {
      }
    },
    nodes: {
      type: Array,
      default: () => []
    },
    /** 自定义点击前函数 */
    diyBeforeClick: {
      type: Function
    },
    /** 自定义勾选前函数 */
    diyBeforeCheck: {
      type: Function
    },
    /** 是否默认选中第一个节点 */
    isSelectFirstNode: {
      type: Boolean,
      default: true
    },
    isSetOperatePrivilege: {
      type: Boolean,
      default: false
    },
    setOperatePrivilege: {
      type: Function
    },
    /** 自定义展开的层级 */
    expandLevel: {
      type: Number,
      default: 1
    },
    /** 是否展开全部，是则展开全部，否则自定义展开到相应的层级 */
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    nodes: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.zNodes = JSON.parse(JSON.stringify(newVal));
          this.$nextTick(() => {
            this.initZTree();
          });
        }
      },
      immediate: true
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    initZTree () {
      const setting = $.extend(true, this.defaultSetting, this.setting);
      const resourcesTree = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
      this.zTreeObj = resourcesTree;
      this.treeTool = new ZTreeTool(resourcesTree);
      this.treeTool.setBeforeClick(this.beforeClick);
      this.treeTool.setBeforeCheck(this.beforeCheck);
      this.treeTool.setOnClick(this.clickNode);
      this.treeTool.setOnCheck(this.checkNode);
      // 树节点自定按钮
      if (this.isSetOperatePrivilege) {
        if (this.setOperatePrivilege && typeof this.setOperatePrivilege === 'function') {
          this.setOperatePrivilege(this.zTreeObj);
        }
      }
      // 是否默认选中第一个节点
      if (this.isSelectFirstNode) {
        const nodes = this.zTreeObj.getNodes();
        this.zTreeObj.selectNode(nodes[0]);
        this.$emit('click', nodes[0]);
      }
      if (this.expandAll) {
        // 展开全部
        this.zTreeObj.expandAll(true);
      } else {
        // 自定义展开层级
        let list = [];
        for (let level = 0; level <= this.expandLevel; level++) {
          const nodes = this.zTreeObj.getNodesByParam('level', level, null);
          list = [...list, ...nodes];
        }
        list.forEach(value => {
          this.zTreeObj.expandNode(value, true, false, false);
        });
      }
      this.$emit('treeObj', {
        zTreeObj: this.zTreeObj,
        treeTool: this.treeTool
      });
    },
    /**
     * @Description 点击节点触发
     * @author qianyinggenian
     * @date 2023/9/19
     */
    clickNode (event, treeId, treeNode, clickFlag) {
      event.preventDefault();
      this.$emit('click', treeNode);
    },
    /**
     * @Description 点击节点前触发
     * @author qianyinggenian
     * @date 2023/9/19
     */
    beforeClick (treeId, treeNode, clickFlag) {
      if (this.diyBeforeClick && typeof this.diyBeforeClick === 'function') {
        return this.diyBeforeClick(treeId, treeNode, clickFlag);
      } else {
        return true;
      }
    },
    /**
     * @Description 勾选节点触发
     * @author qianyinggenian
     * @date 2023/9/19
     */
    checkNode (event, treeId, treeNode) {
      event.preventDefault();
      const checkedNodesList = this.zTreeObj.getCheckedNodes();
      this.$emit('check', treeNode, checkedNodesList);
    },
    /**
     * @Description 勾选节点前触发
     * @author qianyinggenian
     * @date 2023/9/19
     */
    beforeCheck (treeId, treeNode) {
      if (this.diyBeforeCheck && typeof this.diyBeforeCheck === 'function') {
        return this.diyBeforeCheck(treeId, treeNode);
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>

</style>
