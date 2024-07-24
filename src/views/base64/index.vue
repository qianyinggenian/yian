
<template>
<div class="container">
  <div class="tool-box">
    <div class="tips">图片转base64:</div>
    <input style="display: none" type="file" ref="uploadBtn" accept=".png,.jpeg,.jpg"  @change="onFileChange">
    <el-button size="small" @click="handleUpload">选择文件</el-button>
    <span style="margin-left: 10px" v-if="file">已选择的文件：{{file.name}}</span>
    <el-button class="btn" size="small" @click="handleDownload">下载</el-button>
    <el-button class="btn" size="small" @click="handleCopyResult">拷贝</el-button>
  </div>
  <div class="base64-container">
    {{resultValue}}
  </div>
</div>
</template>
<script>
import { getStr } from '@/utils/util';

export default {
  components: {},
  data () {
    return {
      file: null,
      resultValue: '',
      fileName: '',
      fileType: ['image/jpeg', 'image/jpg', 'image/png']
    };
  },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @Description
     * @author qianyinggenian
     * @date  2024/7/24
     */
    handleUpload () {
      this.$refs.uploadBtn.value = '';
      this.$refs.uploadBtn.click();
    },
    /**
     * @Description 选择文件后触发
     * @author qianyinggenian
     * @date  2024/7/24
     */
    async onFileChange (event) {
      const file = event.target.files[0];
      this.file = file;
      this.fileName = getStr(this.file.name, '.').startStr;
      if (!file || !this.fileType.includes(file.type)) {
        this.$message.error('请选择一个图片文件！');
        return;
      }
      // 使用FileReader读取文件
      const reader = new FileReader();

      // 定义读取完成的回调函数
      reader.onload = (e) => {
        // 获取Base64编码的数据
        this.resultValue = e.target.result;
      };

      // 读取文件为DataURL，即Base64编码
      reader.readAsDataURL(this.file);
    },
    /**
     * @Description 下载
     * @author qianyinggenian
     * @date 2024/7/24
     */
    handleDownload () {
      if (this.resultValue) {
        const blob = new Blob([this.resultValue], { type: 'text/plain' });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `${this.fileName}-base64.txt`; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      } else {
        this.$message.error('内容为空，不可保存');
      }
    },
    /**
     * @Description 拷贝
     * @author qianyinggenian
     * @date 2024/7/24
     */
    handleCopyResult () {
      if (!this.resultValue) {
        this.$message.error('请先上传文件再拷贝');
        return false;
      }
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(this.resultValue).then(() => {
          this.$message.success('复制成功');
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = this.resultValue;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          // 尝试执行复制操作
          const success = document.execCommand('copy');
          if (success) {
            this.$message.success('复制成功');
          } else {
            this.$message.error('复制失败');
          }
        } catch (error) {
          this.$message.error('复制失败:', error);
        }
        document.body.removeChild(textarea);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .tool-box {
    .tips {
      margin-bottom: 10px;
    }
  }
  .btn {
    width: 80px;
    letter-spacing: 2px;
    margin-left: 20px;
  }
  .base64-container {
    width: 100%;
    margin-top: 10px;
    height: calc(100% - 65px - 10px);
    border: 1px solid red;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    overflow-wrap: break-word; /* 当文本过长时允许换行 */
  }
}
</style>
