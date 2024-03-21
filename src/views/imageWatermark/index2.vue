<template>
  <div class="watermarkImage">
    <el-form :model="form" ref="form" size="small" label-width="80px">
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-form-item>
            <input type="file" @change="onFileChange" accept="image/*">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  type="flex" justify="space-between" :gutter="20">
        <el-col :span="6">
          <el-form-item label="水印内容" prop="watermarkText" :title="form.watermarkText">
            <el-input v-model="form.watermarkText" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item label="字体大小" prop="fontSize">
            <el-input-number v-model="form.fontSize" :min="10" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="透明度" prop="watermarkOpacity">
            <el-input-number v-model="form.watermarkOpacity" :step="0.1" :min="0" :max="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col :span="6">
          <el-form-item label="倾斜角度" prop="tiltAngle">
            <el-input-number v-model="form.tiltAngle" :min="-90" :max="90"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="间隔距离" prop="textSpacing">
            <el-input-number v-model="form.textSpacing" :step="1" :min="100" :max="200"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="字体颜色" prop="fontColor">
            <el-color-picker v-model="form.fontColor"></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button
                type="primary"
                class="download-btn"
                @click="downloadImage(previewData)">
              下载
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="imageBox" v-if="previewData">
      <img :src="previewData" alt="预览图片" style="max-width: 100%;">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile: null,
      previewData: null,
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
        watermarkOpacity: 0.7,
        fontSize: 20,
        textSpacing: 100,
        fontColor: '#ffffff'
      }
    };
  },
  watch: {
    form: {
      handler (newVal, oldVal) {
        if (this.selectedFile) {
          this.addWatermarkAndDownload();
        }
      },
      deep: true // 深度监听form对象的变化
    }
  },
  methods: {
    onFileChange (event) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name || '水印图片.png';
      console.log('fileName', this.fileName);
      this.addWatermarkAndDownload();
    },
    addWatermarkAndDownload () {
      if (!this.selectedFile) {
        this.$message.error('请先选择一张图片！');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.addWatermark(img, event.target.result);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    },
    addWatermark (image, sourceDataUrl) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除canvas上的所有内容
      // 接着绘制图片和添加水印...
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const {
        watermarkText,
        tiltAngle,
        fontSize,
        fontColor,
        watermarkOpacity,
        fontFamily,
        textSpacing
      } = this.form;
      // const textSpacing = 100; // 水印之间的间距
      const num = Math.max(image.width, image.height);
      // const numWatermarks = Math.ceil(image.width / textSpacing);
      const numWatermarks = Math.ceil(num / textSpacing);

      for (let i = 0; i < numWatermarks; i++) {
        for (let j = 0; j < numWatermarks; j++) {
          const x = j * textSpacing;
          const y = i * textSpacing;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((tiltAngle * Math.PI) / 180);
          ctx.font = `${fontSize}px ${fontFamily}`;
          ctx.fillStyle = fontColor;
          ctx.globalAlpha = watermarkOpacity;
          ctx.fillText(watermarkText, 0, fontSize);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
      this.previewData = canvas.toDataURL('image/png');
    },
    downloadImage (dataUrl) {
      if (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `水印-${this.fileName}`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        this.$message.error('请先选择一张图片！');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.watermarkImage {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .el-form {
    border: 1px solid #409EFF;
    padding: 10px;
    box-sizing: border-box;
  }
  .imageBox {
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
</style>
