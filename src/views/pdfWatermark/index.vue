<template>
  <div id="pdf-viewer">
    <div>
      <input type="file" accept=".pdf"  @change="onFileChange">

      <el-button @click="convertToPdfAndDownload">下载</el-button>
          <el-button @click="downloadPDF">下载1</el-button>
    </div>
    <div v-if="totalPages > 0">
      <canvas  v-for="(_, index) in totalPages" :key="index" ref="pages"></canvas>
    </div>
  </div>
</template>

<script>
import JsPDF from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min';

export default {
  data () {
    return {
      selectedFile: null,
      pdfDocument: null,
      totalPages: 0,
      tiltAngle: -30,
      fileName: ''
    };
  },
  async mounted () {
    // await this.loadPDF();
  },
  methods: {
    /**
     * @Description 选择文件后触发
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async onFileChange (event) {
      const file = event.target.files[0];
      if (!file || file.type !== 'application/pdf') {
        this.$message.error('请选择PDF文件！');
        return;
      }
      this.fileName = file.name || '水印文档.pdf';
      this.selectedFile = file;
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
      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      if (this.pdfDocument && this.totalPages > 0) {
        this.$nextTick(() => {
          this.renderAllPages();
        });
      }
    },
    /**
     * @Description 渲染
     * @author qianyinggenian
     * @date 2024/3/18
     */
    async renderAllPages () {
      for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
        this.$nextTick(async () => {
          const canvas = this.$refs.pages[pageNum - 1];
          if (!canvas) {
            console.error(`Canvas element for page ${pageNum} not found.`);
            return false;
          }
          const page = await this.pdfDocument.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
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
      const textSpacing = 150; // 水印之间的间距
      const num = Math.max(canvas.width, canvas.height);
      const numWatermarks = Math.ceil(num / textSpacing);

      for (let i = 0; i < numWatermarks; i++) {
        for (let j = 0; j < numWatermarks; j++) {
          const x = j * textSpacing;
          const y = i * textSpacing;
          context.save();
          context.translate(x, y);
          context.rotate((this.tiltAngle * Math.PI) / 180);
          context.font = 'bold 32px Arial';
          context.fillStyle = 'rgba(213,210,210,0.8)';
          context.globalAlpha = '0.8';
          context.fillText('pdf水印', 0, 20);
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
        doc.save(this.fileName);
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
        pdf.save(this.fileName);
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
<style lang="scss" scoped>
#pdf-viewer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  canvas {
    //height: 100%;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
