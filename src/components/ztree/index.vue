<template>
  <div>
    <ul id="treeDemo" class="ztree"></ul>
  </div>
</template>

<script>
import { deptZtreeList } from './js/data';

export default {
  name: 'index',
  components: {},
  data () {
    return {
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
      zNodes: deptZtreeList
    };
  },
  props: {
    // https://www.treejs.cn/v3/api.php, 参考官方设置
    setting: {
      type: Object,
      default: () => {
      }
    }
  },
  watch: {},
  computed: {},
  mounted () {
    this.initZTree();
  },
  methods: {
    initZTree () {
      const setting = { ...this.defaultSetting, ...this.setting };
      this.zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, this.zNodes);
      console.log('zTreeObj', this.zTreeObj);
      this.zTreeObj.setting.callback.onClick = this.clickNode;
      this.zTreeObj.setting.callback.onCheck = this.checkNode;
      this.zTreeObj.setting.callback.beforeClick = this.beforeClick;
      this.zTreeObj.setting.callback.beforeClick = this.beforeClick;
      this.zTreeObj.setting.callback.beforeCheck = this.beforeCheck;
    },
    /**
     * @Description 点击节点触发
     * @author wangkangzhang
     * @date 2023/9/19
     */
    clickNode (event, treeId, treeNode, clickFlag) {
      event.preventDefault();
      this.$emit('click', treeNode);
    },
    /**
     * @Description 点击节点前触发
     * @author wangkangzhang
     * @date 2023/9/19
     */
    beforeClick (treeId, treeNode, clickFlag) {
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
      console.log(treeId, treeNode);
    }
  }
};
</script>

<style scoped>

</style>
