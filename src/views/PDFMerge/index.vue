<template>
  <div class="pdf-viewer" >
    <div class="file-box">
      <div class="file-select-box">
        <div class="item">
          <input style="display: none" type="file" ref="uploadBtn" accept=".pdf" multiple  @change="onFileChange">
          <el-button size="small" @click="handleUpload">选择文件</el-button>
          <span class="file-accept-tips">仅可上传pdf文件</span>
          <span v-if="totalPages > 0"> 总共：{{totalPages}}页</span>
        </div>
        <div class="item">
          <el-button
              size="small"
              class="download-btn"
              :loading="loading"
              @click="convertToPdfAndDownload">
            下载
          </el-button>
        </div>

      </div>
      <div class="file-list">
        <div class="item" v-for="(file,index) in files" :key="index">
<!--        <div class="item" v-for="(item,index) in 25" :key="index">-->
          <div class="icon">
            <svg-icon icon-class="pdf2" :size="40"></svg-icon>
          </div>
          <div class="content" :title="file.name">
            <span>{{file.name}}</span>
          </div>
          <div class="delete-file" @click="deleteFile(file,index)">
            <svg-icon icon-class="delete" fill="#dc2e1b" :size="20"></svg-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="pdf-Box" v-if="totalPages > 0">
      <canvas :id="index"  v-for="(_, index) in totalPages" :key="index" ref="pages"></canvas>
      <el-backtop target=".pdf-Box"></el-backtop>
    </div>
  </div>
</template>
<script>
import JsPDF from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min';
export default {
  name: 'index',
  components: {},
  data () {
    return {
      loading: false,
      selectedFile: null,
      pdfDocument: null,
      arrayBuffer: null,
      totalPages: 0,
      pdfFiles: [],
      fileName: '',
      files: [],
      fontFamilyList: [
        {
          value: 'Arial',
          label: 'Arial'
        },
        {
          value: '宋体',
          label: '宋体'
        },
        {
          value: '楷体',
          label: '楷体'
        },
        {
          value: '仿宋',
          label: '仿宋'
        },
        {
          value: '黑体',
          label: '黑体'
        },
        {
          value: '等线',
          label: '等线'
        },
        {
          value: '微软雅黑',
          label: '微软雅黑'
        },
        {
          value: '思源黑体',
          label: '思源黑体'
        },
        {
          value: 'Times New Roman',
          label: 'Times New Roman'
        },
        {
          value: 'Helvetica Neue',
          label: 'Helvetica Neue'
        },
        {
          value: 'Helvetica',
          label: 'Helvetica'
        },
        {
          value: 'PingFang SC',
          label: 'PingFang SC'
        },
        {
          value: 'Hiragino Sans GB',
          label: 'Hiragino Sans GB'
        },
        {
          value: 'Microsoft YaHei',
          label: 'Microsoft YaHei'
        },
        {
          value: 'sans-serif',
          label: 'sans-serif'
        }
      ],
      form: {
        watermarkText: 'Watermark',
        tiltAngle: -30,
        fontFamily: 'Arial',
        watermarkOpacity: 0.5,
        fontSize: 20,
        textSpacing: 150,
        fontColor: '#D02424'
      }
    };
  },
  props: {},
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @Description
     * @author qianyinggenian
     * @date 2024/3/19
     */
    handleUpload () {
      this.$refs.uploadBtn.value = '';
      this.$refs.uploadBtn.click();
    },
    /**
     * @Description 删除文件
     * @author qianyinggenian
     * @date 2024/3/19
     */
    deleteFile (file, index) {
      this.files.splice(index, 1);
      this.totalPages = 0;
      console.log('this.files', this.files);
      for (const file of this.files) {
        if (file.type.includes('application/pdf')) {
          this.resetWatermark(file);
        } else {
          this.$message.error('请选择PDF文件！');
        }
      }
    },
    /**
     * @Description 选择文件后触发
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async onFileChange (event) {
      const files = event.target.files;
      // this.files = files;
      this.selectedFile = files;
      this.files = Array.from(files);
      for (const file of files) {
        if (file.type.includes('application/pdf')) {
          await this.resetWatermark(file);
        } else {
          this.$message.error('请选择PDF文件！');
        }
      }
    },
    /**
     * @Description 重置水印
     * @author qianyinggenian
     * @date 2024/3/19
     */
    async resetWatermark (file) {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      if (this.files && this.files.length > 0) {
        await this.loadPDF(arrayBuffer);
      }
    },
    /**
     * @Description 读取文件为ArrayBuffer
     * @author qianyinggenian
     * @date 2024/3/18
     */
    readFileAsArrayBuffer (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result instanceof ArrayBuffer) {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read the file as ArrayBuffer'));
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    async loadPDF (data) {
      const loadingTask = pdfjsLib.getDocument({ data });
      const pdfDocument = await loadingTask.promise;
      const numPages = pdfDocument.numPages;
      const startPageNum = this.totalPages === 0 ? 0 : this.totalPages;
      this.totalPages += numPages;
      if (pdfDocument && this.totalPages > 0) {
        this.$nextTick(() => {
          this.renderAllPages(pdfDocument, startPageNum, numPages);
        });
      }
    },
    /**
     * @Description 渲染
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async renderAllPages (pdfDocument, startPageNum, numPages) {
      for (let pageNum = startPageNum; pageNum < this.totalPages; pageNum++) {
        this.$nextTick(async () => {
          const canvas = this.$refs.pages[pageNum];
          if (!canvas) {
            console.error(`Canvas element for page ${pageNum} not found.`);
            return false;
          }
          // const page = await this.pdfDocument.getPage(pageNum);
          const pdfPageNum = startPageNum === 0 ? pageNum + 1 : pageNum + 1 - startPageNum;
          const page = await pdfDocument.getPage(pdfPageNum);
          const viewport = page.getViewport({ scale: 2 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height); // 清除canvas上的所有内容
          const renderContext = {
            canvasContext: context,
            viewport
          };

          await page.render(renderContext).promise;
          // this.drawWatermark(context, pageNum, canvas);
        });
      }
    },
    /**
     * @Description 下载pdf
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async convertToPdfAndDownload () {
      if (this.files && this.files.length > 0) {
        this.$message.success('开始下载');
        this.loading = true;
        const pdf = new JsPDF('p', 'mm', 'a4'); // 初始化PDF文档

        // 遍历所有的canvas元素
        const canvases = this.$refs.pages; // 示例列表，根据实际情况替换为你的canvas refs
        for (let i = 0; i < canvases.length; i++) {
          const canvasRef = canvases[i];
          // 将canvas转换为图像数据
          const canvasImgData = canvasRef.toDataURL('image/jpeg', 1.0);
          // const canvasImgData = canvas.toDataURL('image/jpeg');

          // 将图像数据转换为PDF可用的图像
          const img = await this.loadImage(canvasImgData);
          // 获取canvas的实际大小
          // const canvasWidth = canvas.clientWidth;
          // const canvasHeight = canvas.clientHeight;
          // console.log(canvasWidth, canvasWidth);
          // console.log(canvasHeight, canvasHeight);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          // 添加图像到PDF文档
          // pdf.addImage(img, 'JPEG', 15, 40, canvasWidth, canvasHeight); // 调整坐标和尺寸以适应你的布局
          pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight); // 调整坐标和尺寸以适应你的布局

          // 添加页面分隔（如果需要在每个canvas后换页）
          // 如果有更多canvas且不是最后一张，则增加新页
          if (i !== canvases.length - 1) {
            pdf.addPage();
          }
        }

        // 生成并下载PDF文件
        // pdf.save(`${this.fileName}.pdf`);
        this.$message.success('完成');
        this.loading = false;
        pdf.save('pdf合并文件.pdf');
      } else {
        this.$message.error('请选择PDF文件！');
      }
    },
    loadImage (dataUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.pdf-viewer {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;

  flex-direction: column;
  box-sizing: border-box;
  .file-box {
    padding: 10px;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    .file-select-box {
      display: flex;
      align-items: center;
      .item {
        flex: 1 0 auto;
      }
      .file-accept-tips {
        margin-left: 10px;
        margin-right: 50px;
      }
    }
    .file-list {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      margin-top: 10px;
      gap: 10px;
      .item {
        width: 250px;
        height: 50px;
        display: flex;
        margin-right: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        padding: 5px;
        cursor: pointer;
        position: relative;
        border: 1px solid var(--border-color);
        .icon {
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }
        .content {
          height: 40px;
          width: 190px;
          display: flex;
          margin-left: 5px;
          align-items: center;
          span {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            word-break: break-word; /* 对于英文单词，防止溢出容器 */
          }
        }
        .delete-file {
          display: none;
          position: absolute;
          right: 7px;
          top: 1px;
          width: 15px;
          height: 15px;
        }
        &:hover {
          .delete-file {
            display: block;
          }
        }
      }
    }
  }
  .pdf-Box {
    margin-top: 5px;
    border: 1px solid red;
    padding: 5px;
    box-sizing: border-box;
    overflow-y: auto;
    canvas {
      width: calc(100% - 10px);
      margin: 0 5px 10px 5px;
    }
  }
  .download-btn {
    width: 80px;
  }
}
::v-deep .el-icon-loading {
  font-size: 14px !important;
}
</style>
