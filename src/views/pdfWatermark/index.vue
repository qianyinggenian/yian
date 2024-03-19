<template>
  <div class="pdf-viewer" >
    <el-form :model="form" ref="form" size="small" label-width="80px">
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-form-item>
            <input type="file" accept=".pdf"  @change="onFileChange">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  type="flex" justify="space-between" :gutter="20">
        <el-col :span="12">
          <el-form-item label="水印内容" prop="watermarkText" :title="form.watermarkText">
            <el-input v-model="form.watermarkText" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="字体" prop="fontFamily">
            <el-select size="small" filterable v-model="form.fontFamily" placeholder="请选择">
              <el-option
                  v-for="item in fontFamilyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="字体大小" prop="fontSize">
            <el-input-number v-model="form.fontSize" :min="10" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="透明度" prop="watermarkOpacity">
            <el-input-number v-model="form.watermarkOpacity" :step="0.1" :min="0" :max="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col :span="4">
          <el-form-item label="倾斜角度" prop="tiltAngle">
            <el-input-number v-model="form.tiltAngle" :min="-90" :max="90"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="间隔距离" prop="textSpacing">
            <el-input-number v-model="form.textSpacing" :step="1" :min="100" :max="200"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="字体颜色" prop="fontColor">
            <el-color-picker v-model="form.fontColor"></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button
                type="primary"
                class="download-btn"
                :loading="loading"
                @click="convertToPdfAndDownload">
              下载
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-form>
    <div class="pdf-Box" v-if="totalPages > 0">
      <canvas  v-for="(_, index) in totalPages" :key="index" ref="pages"></canvas>
      <el-backtop target=".pdf-Box"></el-backtop>
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
      loading: false,
      selectedFile: null,
      pdfDocument: null,
      arrayBuffer: null,
      totalPages: 0,
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
  watch: {
    form: {
      handler (newVal, oldVal) {
        if (this.selectedFile) {
          this.resetWatermark(this.selectedFile);
        }
      },
      deep: true // 深度监听form对象的变化
    }
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
      if (this.selectedFile) {
        await this.resetWatermark(file);
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
        pdf.save(`水印-${this.fileName}`);
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
.pdf-viewer {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  canvas {
    width: calc(100% - 10px);
    margin: 0 5px 10px 5px;
  }
  .el-form {
    border: 1px solid #409EFF;
    padding: 10px;
    box-sizing: border-box;
  }
  .pdf-Box {
    height: calc(100% - 190px);
    margin-top: 5px;
    border: 1px solid red;
    padding: 5px;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
::v-deep .el-input-number__increase {
  background: #153552 !important;
  border-left: 1px solid #409eff !important;
}
::v-deep .el-input-number__decrease {
  background: #153552 !important;
  border-right: 1px solid #409eff !important;
}

::v-deep .el-color-picker__trigger {
  border: 1px solid #409eff !important;
}
.download-btn {
  width: 80px;
}
::v-deep .el-icon-loading {
  font-size: 14px !important;
}
</style>
