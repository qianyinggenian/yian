<template>
  <!-- 水印图片预览 -->
  <div class="content">
    <div class="imageBox" id="imageBox"></div>
    <el-button type="primary" @click="downFile" style="margin-top: 10px; width: 100px">下 载</el-button>
  </div>
</template>

<script>
import { drawWaterMark, imgToCanvas, canvasToImg, downloadCanves } from './comp/fileUtils.js';
import imgURL from './img/bj.jpg';
export default {
  data () {
    return {
      fileUrl: imgURL,
      fontSize: 50,
      objmsg: {
        canvas: null, // canvas  [必传]
        textArray: ['水印图片', '2022-01-01'], // /水印文字 数组类型  最大三行  [必传]
        fontFamily: 'fangsong', // 默认 microsoft yahei
        fontSize: 30, // 字体大小 默认 #dadbdc
        fontcolor: '#fff', // 字体颜色   默认 #dadbdc
        rotate: 30, // 旋转角度   数字类型
        textAlign: 'center', // 水印文字居中方式:left center right  默认 left
        density: 3.0 // 稠密度
      }
    };
  },
  mounted () {
    this.drawWaterMarkFn();// 添加水印
  },
  methods: {
    // 图片添加水印
    async drawWaterMarkFn () {
      // 1.图片路径转成canvas
      const tempCanvas = await imgToCanvas(this.fileUrl);
      this.objmsg.canvas = tempCanvas;
      // 2.canvas添加水印
      drawWaterMark(this.objmsg);
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
      this.objmsg.canvas = tempCanvas;
      // 2.canvas添加水印
      await drawWaterMark(this.objmsg);
      // 3.下载加水印后的图片
      downloadCanves(tempCanvas, '水印图片下载');
    }
  }
};
</script>

<style lang="scss" scoped>
.waterMakerinfo {
  .content {
    text-align: center;

    ::v-deep .imageBox {
      max-height: 650px;
      min-height: 500px;

      .img {
        width: 100%;
        height: 100%;
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
