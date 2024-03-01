<template>
  <!-- 水印图片预览 -->
  <div class="waterMakerInfo">
    <div class="content">
      <div class="statement">责任声明：本功能不存储数据，仅用于学习研究，请勿用于商业用途，如用于其他用途造成的法律后果，由使用人自行承担。使用本功能，即认为你同意本责任声明。</div>
      <div class="thanks">特别感谢：<a href="https://blog.csdn.net/qq_37831545/article/details/128846647" target="_blank">一朵野花压海棠</a>
        和 <a href="https://blog.csdn.net/cuixiping/article/details/45932793" target="_blank">cuixiping</a> 提供的分享
      </div>
      <div class="tool-bar">
        <div class="file">
          <div class="item">
            <div class="label">请选择文件：</div>
            <div class="value">
              <input id="file" accept="" type="file" @change="handleChangeFile"/>
            </div>
          </div>
        </div>
        <div class="font-style">
          <div class="item">
            <div class="label">水印文字：</div>
            <div class="value text">
              <el-input size="small" clearable v-model="watermarkObj.text" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="label">字体大小：</div>
            <div class="value">
              <el-select @change="resetWatermark" size="small" clearable filterable v-model="watermarkObj.fontSize" placeholder="请选择">
                <el-option
                    v-for="item in fontSizeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="label">字体颜色：</div>
            <div class="value">
              <el-color-picker @change="resetWatermark" size="small" v-model="watermarkObj.fontcolor"></el-color-picker>
            </div>
          </div>
        </div>
        <div class="layout">
          <div class="item">
            <div class="label">方向：</div>
            <div class="value">
              <el-slider @change="resetWatermark" :min="-180" :max="180" v-model="watermarkObj.rotate"></el-slider>
            </div>
            <div class="value1">{{watermarkObj.rotate}}°</div>
          </div>
          <div class="item">
            <div class="label">透明度：</div>
            <div class="value">
              <el-slider @change="resetWatermark" v-model="watermarkObj.opacity"></el-slider>
            </div>
            <div class="value1">{{watermarkObj.opacity}}%</div>
          </div>
          <div class="item">
            <div class="label">位置：</div>
            <div class="value">
              <el-radio-group v-model="watermarkObj.position">
                <el-radio :label="1">平铺</el-radio>
                <el-radio :label="2">九宫格</el-radio>
                <el-radio :label="3">自定义</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="imageBox" id="imageBox"></div>
      <el-button type="primary" @click="downFile" style="margin-top: 10px; width: 100px">下 载</el-button>
    </div>
  </div>
</template>

<script>
import { drawWaterMark, imgToCanvas, canvasToImg, downloadCanvas, delMask } from './comp/fileUtils.js';
// import imgURL from './img/bj.jpg';
export default {
  data () {
    return {
      // fileUrl: imgURL,
      fileUrl: '',
      fontList: [
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
          value: 'Arial',
          label: 'Arial'
        },
        {
          value: 'sans-serif',
          label: 'sans-serif'
        }
      ],
      fontSizeList: [
        {
          value: 12,
          label: '12px'
        },
        {
          value: 14,
          label: '14px'
        },
        {
          value: 16,
          label: '16px'
        },
        {
          value: 18,
          label: '18px'
        },
        {
          value: 20,
          label: '20px'
        },
        {
          value: 24,
          label: '24px'
        },
        {
          value: 28,
          label: '28px'
        },
        {
          value: 32,
          label: '32px'
        },
        {
          value: 36,
          label: '36px'
        },
        {
          value: 42,
          label: '42px'
        },
        {
          value: 48,
          label: '48px'
        },
        {
          value: 64,
          label: '64px'
        },
        {
          value: 72,
          label: '72px'
        },
        {
          value: 128,
          label: '128px'
        }
      ],
      watermarkObj: {
        fontcolor: '#3fa3cb',
        fontSize: 28,
        opacity: 50,
        position: 1,
        fontFamily: 'fangsong',
        canvas: null, // canvas  [必传]
        rotate: 30, // 旋转角度   数字类型
        density: 3.0, // 稠密度
        textAlign: 'center', // 水印文字居中方式:left center right  默认 left
        textArray: ['水印图片'] // /水印文字 数组类型  最大三行  [必传]
      },
      watermarkParams: {}
    };
  },
  mounted () {
    // this.drawWaterMarkFn();// 添加水印
  },
  methods: {
    handleChangeFile (event) {
      const file = event.target.files[0];
      // 打印文件名及类型
      console.log('文件名:', file.name);
      console.log('文件类型:', file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        // 文件路径
        this.fileUrl = reader.result;
        this.drawWaterMarkFn();
      };
      reader.readAsDataURL(file);
    },
    resetWatermark () {
      if (this.fileUrl) {
        this.drawWaterMarkFn();
      }
    },
    // 图片添加水印
    async drawWaterMarkFn () {
      delMask();
      // 1.图片路径转成canvas
      const tempCanvas = await imgToCanvas(this.fileUrl);
      this.watermarkObj.canvas = tempCanvas;
      // 2.canvas添加水印
      drawWaterMark(this.watermarkObj);
      // 3.canvas转成img
      const waterImage = await canvasToImg({
        canvas: tempCanvas,
        maxWidth: '650px', // 最大宽度
        maxHeight: '650px' // 最大高度
      });
      // 查看效果
      var Box = document.getElementById('imageBox');
      Box.appendChild(waterImage);
    },
    // 下载添加水印的图片
    async downFile () {
      // 1.图片路径转成canvas
      const tempCanvas = await imgToCanvas(this.fileUrl);
      this.watermarkObj.canvas = tempCanvas;
      // 2.canvas添加水印
      await drawWaterMark(this.watermarkObj);
      // 3.下载加水印后的图片
      downloadCanvas(tempCanvas, '水印图片下载');
    }
  }
};
</script>

<style lang="scss" scoped>
.waterMakerInfo {
  padding: 10px;
  box-sizing: border-box;
  .content {
    ::v-deep .imageBox {
      margin: 10px;
      max-height: 650px;
      min-height: 500px;
      border: 1px solid red;
      padding: 10px;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .tool-bar {
      display: flex;
      border: 1px solid #409EFF;
      flex-direction: column;
      box-sizing: border-box;
      padding: 5px;
      > div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }
      .item {
        display: flex;
        flex: 1;
        align-items: center;
        margin-right: 10px;
        .label {
          width: 100px;
        }
      }
      .text {
        width: 400px;
      }
      .layout {
        .item {
          .label {
            width: 100px;
          }
          .value {
            width: calc(100% - 100px - 50px);
          }
          .value1 {
            width: 50px;
            text-align: center;
          }
        }
      }
    }
    .statement {
      font-size: 20px;
      color: red;
    }
    .thanks {
      font-size: 18px;
      margin-bottom: 10px;
      a {
        color: #409EFF;
      }
    }
  }

  ::v-deep {
    .el-dialog__footer {
      text-align: right !important;
      position: absolute;
      width: 200px;
      top: unset;
      right: 20px;
      bottom: 0px;
      padding: 10px !important;
      padding-left: 20px !important;
      background-color: transparent !important;
      z-index: 99;
    }
  }
}
</style>
