<template>
  <layout :is-show-left="false">
    <div slot="right">
      <proxy-table
          ref="proxyTable"
          :operations="operations"
          :columns="columns"
          operationWidth="200px"
          :table-btns="tableBtns"
          :table-data="tableData"
          @add="handleAdd"
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

export default {
  name: 'index',
  components: {
    addEdit,
    proxyTable
  },
  data () {
    return {
      isShowAddEdit: false,
      tableData: [],
      tableBtns: [
        {
          label: '查看',
          value: 'show',
          svg: 'show',
          color: '#0af1f1'
        },
        {
          label: '编辑',
          value: 'edit',
          svg: 'edit',
          color: '#2abfd9',
          fill: 'red'
        },
        {
          label: '删除',
          value: 'remove',
          svg: 'remove',
          color: 'red'
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
  props: {},
  watch: {},
  computed: {},
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
      const res = await api.userList();
      const { code, data, msg } = res;
      if (code === 200) {
        this.tableData = data.list || [];
        console.log('tableData', this.tableData);
      } else {
        this.$message.error(msg);
      }
    },
    /**
     * @Description 点击新增按钮触发
     * @author qianyinggenian
     * @date 2023/10/10
     */
    handleAdd () {
      this.isShowAddEdit = true;
      this.$nextTick(() => {
        this.$refs.addEdit.getInfo();
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
