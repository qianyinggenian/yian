<template>
  <div class="pdf-viewer" >
    <div class="file-box">
      <div class="file-select-box">
        <input style="display: none" type="file" ref="uploadBtn" accept=".pdf" multiple  @change="onFileChange">
        <el-button size="small" @click="handleUpload">选择文件</el-button>
        <span class="file-accept-tips">pdf文件</span>
        <el-button size="small" @click="convertToPdfAndDownload">下载</el-button>
      </div>
      <div class="file-list">
        <div class="item" v-for="(item,index) in selectedFile" :key="index">{{item.name}}</div>
      </div>
    </div>
    <div class="pdf-Box" v-if="totalPages > 0">
      <canvas :id="index"  v-for="(_, index) in totalPages" :key="index" ref="pages"></canvas>
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
      selectedFile: null,
      pdfDocument: null,
      arrayBuffer: null,
      totalPages: 0,
      files: [],
      pdfFiles: [],
      fileName: '',
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
  mounted () {
    // const startPageNum = this.totalPages === 0 ? 1 : this.totalPages;
    // console.log('startPageNum', startPageNum);
  },
  methods: {
    // download,
    /**
     * @Description
     * @author qianyinggenian
     * @date 2024/3/19
     */
    handleUpload () {
      this.$refs.uploadBtn.click();
    },
    /**
     * @Description 选择文件后触发
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async onFileChange (event) {
      const file = event.target.files[0];
      const files = event.target.files;
      this.selectedFile = files;
      console.log('file', file);
      console.log('files', files);
      // const arrayBuffer = await this.readFileAsArrayBuffer(file);
      // console.log('arrayBuffer', arrayBuffer);
      for (const item of files) {
        await this.resetWatermark(item);
      }
    },
    /**
     * @Description 重置水印
     * @author qianyinggenian
     * @date 2024/3/19
     */
    async resetWatermark (file) {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      if (this.selectedFile) {
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
      // this.pdfDocument = await loadingTask.promise;
      // this.totalPages += this.pdfDocument.numPages;
      const pdfDocument = await loadingTask.promise;
      const numPages = pdfDocument.numPages;
      console.log('totalPagestotalPages', this.totalPages);
      const startPageNum = this.totalPages === 0 ? 0 : this.totalPages;
      this.totalPages += numPages;
      console.log('totalPages', this.totalPages);
      // if (this.pdfDocument && this.totalPages > 0) {
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
      console.log('startPageNum', startPageNum);
      console.log('numPages', numPages);
      // for (let pageNum = startPageNum; pageNum <= this.totalPages; pageNum++) {
      for (let pageNum = startPageNum; pageNum < this.totalPages; pageNum++) {
        console.log('pageNum', pageNum);
        this.$nextTick(async () => {
          // const canvas = this.$refs.pages[pageNum - 1];
          const canvas = this.$refs.pages[pageNum];
          if (!canvas) {
            console.error(`Canvas element for page ${pageNum} not found.`);
            return false;
          }
          // const page = await this.pdfDocument.getPage(pageNum);
          const pdfPageNum = startPageNum === 0 ? pageNum + 1 : pageNum + 1 - startPageNum;
          // console.log('pdfPageNum', pdfPageNum);
          // const page = await pdfDocument.getPage(pageNum + 1);
          // const page = await pdfDocument.getPage(pageNum + 1);
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
          this.drawWatermark(context, pageNum, canvas);
        });
      }
    },
    /**
     * @Description 添加水印
     * @author qianyinggenian
     * @date 2024/3/18
     */
    drawWatermark (context, pageNumber, canvas) {
      const {
        watermarkText,
        tiltAngle,
        fontSize,
        fontColor,
        watermarkOpacity,
        fontFamily,
        textSpacing
      } = this.form;
      // const textSpacing = 150; // 水印之间的间距
      const num = Math.max(canvas.width, canvas.height);
      const numWatermarks = Math.ceil(num / textSpacing);

      for (let i = 0; i < numWatermarks; i++) {
        for (let j = 0; j < numWatermarks; j++) {
          const x = j * textSpacing;
          const y = i * textSpacing;
          context.save();
          context.translate(x, y);
          context.rotate((tiltAngle * Math.PI) / 180);
          context.font = `bold ${fontSize}px ${fontFamily}`;
          context.fillStyle = fontColor;
          context.globalAlpha = watermarkOpacity;
          context.fillText(`${watermarkText}`, 0, fontSize);
          context.restore();
        }
      }
    },
    /**
     * @Description 下载pdf
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async downloadPDF () {
      if (this.selectedFile) {
        const doc = new JsPDF('p', 'mm', 'a4'); // 设置为纵向、毫米单位、A4纸张

        const canvases = this.$refs.pages; // 示例中包含两个canvas

        for (let i = 0; i < canvases.length; i++) {
          const canvas = canvases[i];
          const canvasElement = canvas.getContext('2d').canvas; // 获取canvas DOM元素

          // 计算canvas在PDF页面上的居中坐标
          // const canvasWidth = canvasElement.width;
          // const canvasHeight = canvasElement.height;
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = doc.internal.pageSize.getHeight();

          // 将canvas转换为data URL
          const dataUrl = canvasElement.toDataURL();

          // 将data URL转换为image
          const img = new Image();
          img.src = dataUrl;
          await new Promise((resolve) => {
            img.onload = () => resolve();
          });

          // 添加图像至PDF，并居中显示
          // doc.addImage(img, 'PNG', centerX, centerY, canvasWidth, canvasHeight);
          doc.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);

          // 如果有更多canvas且不是最后一张，则增加新页
          if (i !== canvases.length - 1) {
            doc.addPage();
          }
        }

        // 生成并下载PDF文件
        // doc.save(`${this.fileName}.pdf`);
        doc.save(`水印-${this.fileName}`);
      } else {
        this.$message.error('请选择PDF文件！');
      }
    },
    /**
     * @Description 下载pdf
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async convertToPdfAndDownload () {
      if (this.selectedFile) {
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
  .file-box {
    padding: 10px;
    box-sizing: border-box;
    .file-select-box {
      .file-accept-tips {
        margin-left: 10px;
      }
    }
  }
  canvas {
    width: calc(100% - 10px);
    margin: 0 5px 10px 5px;
  }
}
</style>
