<template>
  <div>
    <ul id="treeDemo" class="ztree"></ul>
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
    }
  },
  watch: {
    nodes: {
      handler (newVal) {
        this.zNodes = JSON.parse(JSON.stringify(newVal));
        this.$nextTick(() => {
          this.initZTree();
        });
      },
      immediate: true
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    initZTree () {
      const setting = { ...this.defaultSetting, ...this.setting };
      const resourcesTree = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
      this.zTreeObj = resourcesTree;
      this.treeTool = new ZTreeTool(resourcesTree);
      this.treeTool.setBeforeClick(this.beforeClick);
      this.treeTool.setBeforeCheck(this.beforeCheck);
      this.treeTool.setOnClick(this.clickNode);
      this.treeTool.setOnCheck(this.checkNode);
      if (this.isSelectFirstNode) {
        const nodes = this.zTreeObj.getNodes();
        this.zTreeObj.selectNode(nodes[0]);
        this.$emit('click', nodes[0]);
      }
    },
    /**
     * @Description 点击节点触发
     * @author wangkangzhang
     * @date 2023/9/19
     */
    clickNode (event, treeId, treeNode, clickFlag) {
      event.preventDefault();
      console.log(treeNode);
      this.$emit('click', treeNode);
    },
    /**
     * @Description 点击节点前触发
     * @author wangkangzhang
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
     * @author wangkangzhang
     * @date 2023/9/19
     */
    checkNode (event, treeId, treeNode) {
      event.preventDefault();
      console.log(event, treeId, treeNode);
      this.$emit('check', treeNode);
    },
    /**
     * @Description 勾选节点前触发
     * @author wangkangzhang
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
