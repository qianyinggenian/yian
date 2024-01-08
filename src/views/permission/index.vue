<template>
  <layout :is-show-left="false">
    <div slot="right" class="layout-responsive-auto--column">
      <div class="toolbar">
        <div>类型：</div>
        <proxySelect
            v-model="type"
            :options="typeOptions"
            @change="handleType"
        >
        </proxySelect>
      </div>
      <div class="layout-responsive-auto__grow content">
        <ztree
            :nodes="nodes"
            :setting="setting"
            :is-set-operate-privilege="true"
            @treeObj="getTreeObj"
            @check="handleCheck"
            ref="ztree"
        />
      </div>
      <div class="btns-box">
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
      </div>
    </div>
  </layout>
</template>

<script>
import ztree from '@/components/ztree';
import proxySelect from '@/components/proxySelect/index.vue';
import { typeOptions } from '@/common/data/dictionaryData';
import menuApi from '@/api/menu';
import api from '@/api/permission';

export default {
  name: 'index',
  components: {
    ztree,
    proxySelect
  },
  data () {
    return {
      type: '',
      typeId: '',
      zTreeObj: {},
      treeTool: null,
      nodes: [],
      checkList: [],
      permissionList: [],
      setting: {
        data: {
          key: {
            name: 'name'
          }
        },
        check: {
          enable: true
        }
      },
      treeNode: {},
      typeOptions: typeOptions
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    this.typeId = this.typeOptions[0].id;
    this.type = this.typeOptions[0].value;
    this.$nextTick(() => {
      this.getInfo();
    });
  },
  methods: {
    /**
     * @Description 获取权限数据
     * @author qianyinggenian
     * @date 2023/10/12
     */
    async getInfo () {
      const res = await api.permissionDetail({ id: this.typeId });
      const { code, data } = res;
      if (code === 200) {
        this.checkList = data.permission || [];
        this.$nextTick(() => {
          this.getTree();
        });
      }
    },
    /**
     * @Description 获取导航数据
     * @author qianyinggenian
     * @date 2023/9/25
     */
    async getTree () {
      const res = await menuApi.menuTree();
      const { code, data, msg } = res;
      if (code === 200) {
        this.nodes = data.list || [];
        this.checkList.forEach(value => {
          this.nodes = this.nodes.map(item => {
            if (item.id === value) {
              item.checked = true;
            }
            return item;
          });
        });
      } else {
        this.$message.error(msg);
      }
    },
    getTreeObj (params) {
      this.zTreeObj = params.zTreeObj;
      this.treeTool = params.treeTool;
    },
    /**
     * @Description
     * @author qianyinggenian
     * @date 2023/10/12 0012
     */
    handleType (val) {
      const result = this.typeOptions.find(item => item.value === val);
      if (result) {
        this.typeId = result.id;
      } else {
        this.typeId = '';
      }
      this.$nextTick(() => {
        this.getInfo();
      });
    },
    /**
     * @Description 勾选节点触发
     * @author qianyinggenian
     * @date 2023/10/12 0012
     */
    handleCheck (treeNode, checkNodes) {
      console.log('treeNode', treeNode);
      console.log('checkNodes', checkNodes);
      this.permissionList = checkNodes.map(value => value.id);
    },
    /**
     * @Description 保存
     * @author qianyinggenian
     * @date 2023/10/12 0012
     */
    handleSave () {
      this.$confirm('确定保存吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true;
        const params = {
          id: this.typeId,
          type: this.type,
          permission: this.permissionList
        };
        const res = await api.permissionSave(params);
        if (res.code === 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flexStyle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar {
  display: flex;
  align-items: center;
}

.content {
  padding: 10px 0;
  box-sizing: border-box;
}

.btns-box {
  @include flexStyle;
}
</style>
