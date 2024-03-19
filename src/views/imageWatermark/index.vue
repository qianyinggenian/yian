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
                  <div class="label" @click="handleClick">水印文字：</div>
                  <div class="value text" v-for="(item, index) in watermarkObj.textArray" :key="index">
                      <el-input
                          size="small"
                          @change="resetWatermark"
                          clearable
                          :title="item.text"
                          v-model="item.text"
                          :placeholder="`请输入水印${index+1}内容`">
                      </el-input>
                  </div>
                  <div>
                    <el-button size="small" type="primary" @click="handleAdd">
                      <i class="el-icon-plus" style="font-size: 16px;color: red"></i>
                      新增
                    </el-button>
                  </div>
              </div>
          </div>
        <div class="font-style">
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
            <div class="label">字体：</div>
            <div class="value">
              <el-select @change="resetWatermark" size="small" clearable filterable v-model="watermarkObj.fontFamily" placeholder="请选择">
                <el-option
                    v-for="item in fontFamilyList"
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
            <div class="label">稠密度：</div>
            <div class="value">
              <el-slider @change="resetWatermark" :step="0.1" :min="0.1" :max="6" v-model="watermarkObj.density"></el-slider>
            </div>
            <div class="value1">{{watermarkObj.density}}</div>
          </div>
          <div class="item" v-if="false">
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
      <div class="download-btn">
        <el-button type="primary" @click="downFile" style="margin-top: 10px; width: 80px">下 载</el-button>
      </div>
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
      fontFamilyList: [
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
      fontSizeList: [],
      watermarkObj: {
        fontcolor: '#000000',
        fontSize: 64,
        opacity: 50,
        position: 1,
        // fontFamily: 'fangsong',
        fontFamily: '仿宋',
        canvas: null, // canvas  [必传]
        rotate: 30, // 旋转角度   数字类型
        density: 3.0, // 稠密度
        textAlign: 'center', // 水印文字居中方式:left center right  默认 left
        textArray: [
          {
            text: '水印内容'
          }
        ] // /水印文字 数组类型  最大三行  [必传]
      },
      watermarkParams: {}
    };
  },
  mounted () {
    // this.drawWaterMarkFn();// 添加水印
    for (let i = 12; i <= 128; i++) {
      const params = {
        value: i,
        label: `${i}px`
      };
      this.fontSizeList.push(params);
    }
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
    handleClick () {
      console.log(this.watermarkObj.textArray);
    },
    handleAdd () {
      const { textArray } = this.watermarkObj;
      if (textArray && textArray.length < 3) {
        this.watermarkObj.textArray.push({ text: '' });
      } else {
        this.$message.error('水印内容最多三行');
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
      if (this.fileUrl) {
        // 1.图片路径转成canvas
        const tempCanvas = await imgToCanvas(this.fileUrl);
        this.watermarkObj.canvas = tempCanvas;
        // 2.canvas添加水印
        await drawWaterMark(this.watermarkObj);
        // 3.下载加水印后的图片
        downloadCanvas(tempCanvas, '水印图片下载');
      } else {
        this.$message.error('请上传图片后再下载');
      }
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
      margin: 10px 0;
      max-height: 650px;
      min-height: 500px;
      border: 1px solid red;
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
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
        /*width: 400px;*/
        align-items: center;
        margin-right: 10px;
        .label {
          width: 100px;
        }
      }
      .text {
        margin-right: 20px;
      }
      ::v-deep .el-input {
        width: 300px;
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
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
