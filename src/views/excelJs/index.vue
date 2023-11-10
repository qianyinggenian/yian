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
     * @author wangkangzhang
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
              const rowCount = worksheet.getColumn(1).values;
              const columnCount = worksheet.getRow(1);
              //  validate table data
              console.log(rowCount);
              console.log(columnCount);
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
    },
    readFile () {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (!this.files[0]) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('上传文件异常!');
        } else {
          reader.readAsArrayBuffer(this.files[0]);
          reader.onload = (ev) => {
            resolve(ev.target);
          };
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
