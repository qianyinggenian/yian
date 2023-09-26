<template>
  <layout>
    <div slot="left">
      <ztree
          :nodes="nodes"
          :setting="setting"
          :set-operate-privilege="setOperatePrivilege"
          :is-set-operate-privilege="true"
          @treeObj="getTreeObj"
          @click="handleClick"
          ref="ztree"
      />
    </div>
    <div slot="right">
      <add-edit ref="addEdit" @refresh="refreshTree"/>
    </div>
  </layout>
</template>

<script>
// import { menuTree } from '@/common/data';
import ztree from '@/components/ztree';
import AddEdit from './comp/add-edit.vue';
import api from '@/api/menu';

export default {
  name: 'index',
  components: {
    AddEdit,
    ztree
  },
  data () {
    return {
      zTreeObj: {},
      treeTool: null,
      // nodes: menuTree,
      nodes: [],
      setting: {
        data: {
          key: {
            name: 'name'
          }
        },
        check: {
          enable: false
        }
      },
      treeNode: {},
      operateBtns: [
        { name: '新增', eventName: 'add', color: '#409EFF', icon: 'el-icon-plus' },
        { name: '编辑', eventName: 'edit', color: '#409EFF', icon: 'el-icon-edit' },
        { name: '删除', eventName: 'remove', color: 'red', icon: 'el-icon-close' }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    this.$nextTick(() => {
      this.getTree();
    });
  },
  methods: {
    /**
     * @Description 获取导航数据
     * @author qianyinggenian
     * @date 2023/9/25
     */
    async getTree () {
      const res = await api.menuTree();
      const { code, data, msg } = res;
      if (code === 200) {
        this.nodes = data.list || [];
      } else {
        this.$message.error(msg);
      }
    },
    getTreeObj (params) {
      this.zTreeObj = params.zTreeObj;
      this.treeTool = params.treeTool;
    },
    /**
     * @Description 点击触发
     * @author qianyinggenian
     * @date 2023/9/22
     */
    handleClick (treeNode) {
      console.log('treeNode', treeNode);
      if (treeNode) {
        this.$nextTick(() => {
          const params = { treeNode, disabled: true, type: 'show' };
          this.$refs.addEdit.getInfo(params);
        });
      }
    },
    /**
     * @Description 刷新树
     * @author qianyinggenian
     * @date 2023/9/25
     */
    refreshTree (treeNode) {
      this.$nextTick(() => {
        this.getTree();
      });
    },
    /**
     * @Description 新增
     * @author qianyinggenian
     * @date 2023/9/22
     */
    addFn (event) {
      this.addEditFn(event, 'add');
    },
    /**
     * @Description 编辑
     * @author qianyinggenian
     * @date 2023/9/25
     */
    editFn (event) {
      this.addEditFn(event, 'edit');
    },
    addEditFn (event, type) {
      event.stopPropagation();
      const treeNode = this.treeTool.getSelectNode(event);
      this.zTreeObj.selectNode(treeNode);
      this.$nextTick(() => {
        const params = {
          treeNode,
          disabled: false,
          type
        };
        this.$refs.addEdit.getInfo(params);
      });
    },

    /**
     * @Description 删除
     * @author qianyinggenian
     * @date 2023/9/26
     */
    removeFn (event) {
      event.stopPropagation();
      const treeNode = this.treeTool.getSelectNode(event);
      if (treeNode.id !== 'root') {
        const msg = '确定删除该节点吗？';
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await api.menuDelete({ id: treeNode.id });
          console.log(res);
          if (res.code === 200) {
            this.$nextTick(() => {
              this.getTree();
            });
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消删除'
          });
        });
      }
    },
    /**
     * @Description 自定义显示按钮
     * @author qianyinggenian
     * @date 2023/9/22
     */
    setOperatePrivilege (resourceTree) {
      const operateBtns = this.operateBtns;
      const length = operateBtns.length;
      const map = new Map();
      for (let i = 0; i < length; i++) {
        const key = {
          name: operateBtns[i].eventName,
          color: operateBtns[i].color,
          icon: operateBtns[i].icon,
          hoverTitle: operateBtns[i].name
        };
        map.set(key, Reflect.get(this, `${operateBtns[i].eventName}Fn`));
      }
      const operates = map;
      if (operates) {
        resourceTree.setting.view.addHoverDom = function (treeId, treeNode) {
          const sObj = $(`#${treeNode.tId}_a`);
          operates.forEach((value, key, mapObj) => {
            const style = `color:${key.color};margin-left:8px;font-size: 16px;text-decoration: none!important;`;
            // value:键值对的值;key:键值对的键;mapObj:Map对象
            // 根节点只有新增
            if ((treeNode.id === 'root' && key.name === 'add') ||
                // 非根节点和按钮节点有新增、编辑和删除
                (treeNode.id !== 'root' && treeNode.type !== 'btn' && (['add', 'edit', 'remove'].includes(key.name))) ||
                // 按钮节点只有编辑和删除
                ((treeNode.type === 'btn') && (['edit', 'remove'].includes(key.name)))
            ) {
              if ($(`#${key.name}Btn_${treeNode.id}`).length > 0) return;
              let addStr = `<a style='${style}' class='zTreeButton ${key.name}_ico_docu ${key.icon}' title='${key.hoverTitle}' lang='${treeNode.tId}' id='${key.name}Btn_${treeNode.id}'></a>`;
              addStr += `<input type='hidden' id='${key.name}${treeNode.id}' value='${treeNode.tId}'/>`;
              sObj.append(addStr);
              const btn = $(`#${key.name}Btn_${treeNode.id}`);
              if (btn) btn.bind('click', value);
              // style = `color:${key.color}; margin-left:8px;font-size: 15px;margin-top:-10px`;
            }
          });
        };
        resourceTree.setting.view.removeHoverDom = function (treeId, treeNode) {
          operates.forEach((value, key, mapObj) => {
            $(`#${key.name}Btn_${treeNode.id}`).unbind().remove();
            $(`#${key.name}${treeNode.id}`).unbind().remove();
          });
        };
      }
    }
  }
};
</script>

<style scoped>

</style>
