<template>
  <layout :is-show-left="false">
    <div slot="right"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(10, 38, 63,0.6)"
         element-loading-custom-class="loading-icon"
    >
      <proxy-table
          ref="proxyTable"
          :operations="operations"
          :columns="columns"
          operationWidth="200px"
          :table-btns="tableBtns"
          :table-data="tableData"
          :diy-has-check-box="diyHasCheckBox"
          @add="handleAdd"
          @edit="handleEdit"
          @show="handleShow"
          @remove="handleRemove"
          @delete="handleDelete"
          @select="handleSelect"
      >
      </proxy-table>
      <add-edit
          ref="addEdit"
          v-if="isShowAddEdit"
          @close="closeFn"
      />
    </div>
  </layout>
</template>

<script>
import api from '@/api/user';
import addEdit from './add-edit.vue';
import proxyTable from '@/components/proxyTable/index.vue';
import { sortDownDate } from '@/utils/util';
// , sortUpDate
export default {
  name: 'index',
  components: {
    addEdit,
    proxyTable
  },
  data () {
    return {
      loading: false,
      isShowAddEdit: false,
      tableData: [],
      selections: [],
      tableBtns: [
        {
          label: '查看',
          value: 'show'
        },
        {
          label: '编辑',
          value: 'edit'
        },
        {
          label: '删除',
          value: 'delete'
        }
      ],
      operations: [
        {
          value: 'add',
          label: '新增'
        },
        {
          value: 'remove',
          label: '删除'
        }
      ],
      columns: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'account',
          label: '账号'
        },
        {
          prop: 'type',
          label: '类型'
        },
        {
          prop: 'email',
          label: '邮箱'
        },
        {
          prop: 'status',
          label: '状态'
        },
        {
          prop: 'creator',
          label: '创建者'
        },
        {
          prop: 'creatDate',
          label: '创建时间'
        }
      ]
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.getList();
    });
  },
  methods: {
    /**
     * @Description 获取用户列表
     * @author qianyinggenian
     * @date 2023/10/10
     */
    async getList () {
      this.loading = true;
      const res = await api.userList();
      const { code, data, msg } = res;
      if (code === 200) {
        this.tableData = data.list || [];
        this.tableData.sort(sortDownDate);
      } else {
        this.$message.error(msg);
      }
      this.loading = false;
    },
    /**
     * @Description 点击新增按钮触发
     * @author qianyinggenian
     * @date 2023/10/10
     */
    handleAdd () {
      this.isShowAddEdit = true;
      this.$nextTick(() => {
        this.$refs.addEdit.getInfo({ type: 'add' });
      });
    },
    /**
     * @Description 点击编辑按钮触发
     * @author qianyinggenian
     * @date 2023/10/11 011
     */
    handleEdit (row) {
      this.handleDetail({ type: 'edit', id: row.id });
    },
    handleDetail (params) {
      this.isShowAddEdit = true;
      this.$nextTick(() => {
        this.$refs.addEdit.getInfo(params);
      });
    },
    /**
     * @Description 点击查看触发
     * @author qianyinggenian
     * @date 2023/10/11 011
     */
    handleShow (row) {
      this.handleDetail({ type: 'show', id: row.id });
    },
    /**
     * @Description 点击列表删除触发
     * @author qianyinggenian
     * @date 2023/10/11 011
     */
    handleDelete (row) {
      if (row.isAdmin === '1') {
        this.$message.info('该条数据不可删除');
        return false;
      }
      this.$confirm('确定删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true;
        const res = await api.userDelete({ id: row.id });
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.$nextTick(() => {
            this.getList();
          });
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /**
     * @Description
     * @author qianyinggenian
     * @date 2023/10/11 011
     */
    handleSelect (selections) {
      this.selections = selections;
    },
    diyHasCheckBox (row, index) {
      return row.isAdmin !== '1';
    },
    /**
     * @Description 批量删除
     * @author qianyinggenian
     * @date 2023/10/11 011
     */
    handleRemove () {
      const ids = this.selections.map(value => value.id);
      if (ids.length === 0) {
        this.$message.error('请选择数据！');
        return false;
      }
      this.$confirm('确定删除所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true;
        const res = await api.userBatchDelete({ ids });
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.$nextTick(() => {
            this.getList();
          });
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /**
     * @Description 关闭弹窗
     * @author qianyinggenian
     * @date 2023/10/10
     */
    closeFn (flag) {
      this.isShowAddEdit = false;
      if (flag) {
        this.getList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
