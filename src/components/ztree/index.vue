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
      setting: {
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
      // zNodes: [
      //   {
      //     id: '8a7480426fa34894016fa70516d400dd',
      //     parentId: 'root',
      //     parentIds: 'root',
      //     text: '蓝星科技发展有限科技公司',
      //     code: 'YJS',
      //     actionUrl: '',
      //     type: 'DeptRoot',
      //     showOperatePrivilege: true,
      //     effectiveFlag: '1',
      //     iconSkin: 'el-icon-s-home',
      //     chkDisabled: false,
      //     checked: false,
      //     open: true,
      //     nocheck: false,
      //     nocheckStr: '内设部门'
      //   }
      // ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    this.initZTree();
  },
  methods: {
    initZTree () {
      this.zTreeObj = $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    }
  }
};
</script>

<style scoped>

</style>
