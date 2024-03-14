<template>
  <div>
    <input id="file" accept=".xlsx, .xls" type="file" @change="handleChange"/>
  </div>
</template>

<script>
import Excel from 'exceljs';

export default {
  name: 'index',
  components: {},
  data () {
    return {};
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
  },
  methods: {
    /**
     * @Description 选择文件后触发
     * @author qianyinggenian
     * @date 2023/14/10
     */
    handleChange (e) {
      this.filePath = e.target.files[0].name;
      this.files = e.target.files;
      console.log('files', this.files);
      console.log('files[0]', this.files[0]);
      let flag = true;
      for (let i = 0; i < this.files.length; i++) {
        const arr = this.files[i].name.split('.');
        const fileType = arr[arr.length - 1];
        if (!['xls', 'xlsx'].includes(fileType)) {
          flag = false;
        }
      }
      if (!flag) {
        this.$message.error('请选择正确文件类型(.xls，.xlsx)导入！');
        if (this.$refs.file) {
          this.filePath = '';
          this.$refs.file.value = '';
        }
      }
      this.fileInfo();
      this.validateExcelFile(this.files[0]);
      // this.readFile().then(value => {
      //   console.log('value', value);
      // });
    },
    validateExcelFile (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const buffer = reader.result;
          const workbook = new Excel.Workbook();
          workbook.xlsx
            .load(buffer)
            .then(() => {
              const worksheet = workbook.getWorksheet(1);
              const rowCount = worksheet.getRow(1).values; // 获取行
              // const columnCount = worksheet.getColumn(1).values; // 获取列
              //  validate table data
              rowCount.shift();
              console.log('rowCount', rowCount);
              // console.log('columnCount', columnCount);
              const excelList = [];

              worksheet.getSheetValues().filter(temp => !!temp?.length).forEach(item => { // 移除空行
                // 移除每行首个空元素
                item.shift();
                // 定义临时对象存储每一行内容
                const tempObj = {};
                item.forEach((item2, index2) => {
                  tempObj[rowCount[index2]] = item2;
                });
                excelList.push(tempObj);
              });
              excelList.shift();
              console.log('excelList', excelList);
              resolve('Excel file is valid.');
            }).catch(e => {
            // eslint-disable-next-line prefer-promise-reject-errors
              reject('Error occurred while loading the workbook.');
            });
        };
      });
    },
    async fileInfo () {
      const workbook = new Excel.Workbook();
      const res = await workbook.xlsx.load(this.files[0]);
      console.log('res', res);
    }
  }
};
</script>

<style scoped>

</style>
