<template>
  <proxyTable
      ref="proxyTable"
      :table-btns="tableBtns"
      :table-data="tableData"
      :columns="columns"
      @edit="handleEdit"
  >
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
import { list } from './data';

export default {
  name: 'demo',
  components: {
    proxyTable
  },
  data () {
    return {
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
          label: '设置设置',
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
    const Random = this.$Mock.Random;
    const data = this.$Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|100': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        name: '@cname',
        'age|40-50': 40,
        region: Random.region(), // 随机生成一个（中国）大区。
        province: Random.province(), // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
        city: Random.city(true), // 随机生成一个（中国）市。 布尔值。指示是否生成所属的省。
        county: Random.county(true), // 随机生成一个（中国）县。布尔值。指示是否生成所属的省、市。
        zip: Random.zip(), // 随机生成一个邮政编码（六位数字）。
        text: Random.cparagraph(),
        IDNumber: Random.id(),
        creatDate: Random.date('yyyy-MM-dd HH:mm:ss')
      }]
    });
    console.log('data', data.list);

    this.tableData = list.map(value => {
      if (value.name === '姜超') {
        value.rowBtns = ['show'];
      } else if (value.name === '苏秀英') {
        value.rowBtns = [];
      } else if (value.name === '夏杰') {
        value.rowBtns = ['show', 'edit', 'remove', 'setting'];
      } else {
        // value.rowBtns = this.tableBtns.map(item => item.value);
        value.rowBtns = ['show', 'edit', 'remove'];
      }
      return value;
    });
  },
  methods: {
    handleEdit (row) {
      console.log('rowrow', row);
    }
  }
};
</script>

<style scoped>

</style>
