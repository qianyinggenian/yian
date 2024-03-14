<template>
  <proxyTable
      ref="proxyTable"
      :table-btns="tableBtns"
      :table-data="tableData"
      table-title="表格标题（注：表中数据均为MockJs随机生成的数据）"
      :columns="columns"
      :operations="operations"
      :pageSize="50"
      :total="tableData.length"
      :isCheckboxFixed="true"
      :is-index-fixed="true"
      :diy-get-list="diyGetList"
      :is-show-default-tool-bar="true"
      @edit="handleEdit"
      @add="handleAdd"
      @export="handleExport"
  >
    <div slot="search-box" class="search-box">
      <el-select size="small" v-model="value" placeholder="请选择">
        <el-option
            v-for="item in operations"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <template v-slot:operation="{row}">
      <!--操作列插槽-->
      <div class="btns">
        <span @click="handleEdit(row)">编辑</span>
      </div>
    </template>
    <template v-slot:province="{row}">
      <!--省份列插槽-->
      <span>省份列插槽：{{ row.province }}</span>
    </template>
    <template v-slot:region>
      <!--区域头部插槽-->
      <span>区域头部插槽</span>
    </template>
  </proxyTable>
</template>

<script>
import proxyTable from './index.vue';
// import { list } from './data';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';

export default {
  name: 'demo',
  components: {
    proxyTable
  },
  data () {
    return {
      value: '',
      input: '',
      operations: [
        {
          value: 'add',
          label: '新增'
        },
        {
          value: 'remove',
          label: '删除'
        },
        {
          value: 'test',
          label: '测试'
        },
        {
          value: 'export',
          label: '导出'
        }
      ],
      columns: [
        {
          prop: 'name',
          label: '姓名',
          minWidth: '150px'
        },
        {
          prop: 'region',
          label: '区域',
          minWidth: '250px',
          slot: true,
          slotHeader: 'region' // slotHeader： 列表操作
        },
        {
          prop: 'province',
          label: '省份',
          slot: true, // 使用插槽
          slotColumn: 'province', // slotColumn： 列表操作
          minWidth: '250px'
        },
        {
          prop: 'city',
          label: '城市',
          minWidth: '350px'
        },
        {
          prop: 'county',
          label: '市县',
          minWidth: '250px'
        },
        {
          prop: 'zip',
          label: '邮政编码',
          minWidth: '150px'
        },
        {
          prop: 'creatDate',
          label: '创建日期',
          minWidth: '150px'
        }
      ],
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
        },
        {
          label: '关联',
          value: 'association'
        },
        {
          label: '设置',
          svg: 'setting',
          value: 'setting'
        }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    // const Random = this.$Mock.Random;
    const data = this.$Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|500': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        // 'id|+1': 1,
        id: '@guid',
        // IDNumber: '@id()',
        name: '@cname',
        'age|40-50': 40,
        area: '@region',
        region: '@region', // 随机生成一个（中国）大区。
        province: '@province', // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
        city: '@city', // 随机生成一个（中国）市。 布尔值。指示是否生成所属的省。
        county: '@county(true)', // 随机生成一个（中国）县。布尔值。指示是否生成所属的省、市。
        zip: '@zip', // 随机生成一个邮政编码（六位数字）。
        text: '@cparagraph',
        email: '@email',
        creatDate: "@date('yyyy-MM-dd HH:mm:ss')"
      }]
    });
    console.log('data', data.list);

    this.tableData = data.list.map(value => {
      if (value.province === '北京') {
        value.rowBtns = ['show', 'edit'];
      } else if (value.province === '上海') {
        value.rowBtns = ['show', 'edit', 'remove', 'setting'];
      } else if (value.province === '安徽省') {
        value.rowBtns = ['show', 'edit', 'remove'];
      } else {
        value.rowBtns = ['show', 'edit', 'remove', 'setting'];
      }
      return value;
    });
  },
  methods: {
    /**
     * @Description 点击新增按钮触发
     * @author qianyinggenian
     * @date 2023/10/9
     */
    handleAdd () {
      console.log('asdad');
    },
    /**
     * @Description 点击导出触发
     * @author qianyinggenian
     * @date 2023/11/16
     */
    handleExport () {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Me'; // 作者
      workbook.lastModifiedBy = 'Me'; // 上一次修改者
      workbook.created = new Date(); // 创建时间
      workbook.modified = new Date(); // 上次修改时间
      workbook.lastPrinted = new Date(); // 上一次打印时间
      const worksheet = workbook.addWorksheet('My Sheet', { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] });
      worksheet.columns = this.columns.map(item => {
        item.header = item.label;
        item.key = item.prop;
        item.width = 20;
        return item;
      });
      this.tableData.forEach(item => {
        worksheet.addRow(item);
      });
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(blob, 'excel导出测试.xlsx');
      });
    },
    /**
     * @Description 点击编辑按钮触发
     * @author qianyinggenian
     * @date 2023/10/9
     */
    handleEdit (row) {
      console.log('rowrow', row);
    },
    /**
     * @Description 点击搜索按钮触发
     * @author qianyinggenian
     * @date 2023/10/7
     */
    diyGetList (searchValue) {
      console.log('搜索搜索', searchValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  margin-right: 10px;
}
</style>
