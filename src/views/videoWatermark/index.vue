<template>
  <div class="video-watermark-container">
    <!-- 视频播放与画布绘制部分省略，与之前示例相同 -->
    <div class="top">
      <button @click="startRecording">开始录制带水印的视频</button>
      <button @click="stopRecording">停止录制带水印的视频</button>
      <a ref="downloadLink" style="display: none"></a>
    </div>
   <div class="bottom">
     <video
         id="video01"
         ref="videoElement"
         src="@/assets/shanghai.mp4"
         crossorigin="anonymous"
         controls
         @canplay="onVideoCanPlay"
         @pause="onVideoPause"
         @ended="onVideoEnded"
     ></video>
     <canvas
         ref="canvasElement"
         class="watermarked-video"
     ></canvas>
   </div>
  </div>
</template>

<script>
export default {
  props: {
    // videoSrc: {
    //   type: String,
    //   required: true
    // }
  },
  data () {
    return {
      videoContext: null,
      canvasContext: null,
      // canvasElement: null,
      watermarkImage: null,
      isPlaying: false
    };
  },
  mounted () {
    // document.body.oncontextmenu = function (e) {
    //   e.preventDefault();
    // };
    $('#video01').bind('contextmenu', function () {
      return false;
    });
  },
  methods: {
    onVideoCanPlay () {
      this.isPlaying = true;
      this.setupCanvas();
      this.drawFrame();
      this.$nextTick(() => {
        this.setupRecorder(); // 初始化 MediaRecorder
      });
    },
    onVideoPause () {
      this.isPlaying = false;
    },
    onVideoEnded () {
      this.isPlaying = false;
    },
    setupCanvas () {
      const canvas = this.$refs.canvasElement;
      canvas.width = this.$refs.videoElement.videoWidth;
      canvas.height = this.$refs.videoElement.videoHeight;
      console.log('canvas.width', canvas.width);
      console.log('canvas.height', canvas.height);
      this.canvasContext = canvas.getContext('2d');
    },
    drawFrame () {
      if (!this.isPlaying) return;

      // 绘制视频帧
      this.canvasContext.drawImage(
        this.$refs.videoElement,
        0,
        0,
        this.$refs.canvasElement.width,
        this.$refs.canvasElement.height
      );

      // 设置字体样式和颜色
      this.canvasContext.font = '30px Arial'; // 字体大小和类型
      this.canvasContext.fillStyle = '#ffffff'; // 文字颜色
      this.canvasContext.globalAlpha = 0.3; // 设置透明度

      // 计算文字水印的位置，这里假设放在右下角
      const watermarkText = 'Sample Watermark'; // 水印文字内容
      const textWidth = this.canvasContext.measureText(watermarkText).width;
      const watermarkX = this.$refs.canvasElement.width - textWidth - 10;
      const watermarkY = this.$refs.canvasElement.height - 40; // 考虑到字体高度和可能需要的边距

      // 绘制文字水印
      this.canvasContext.fillText(watermarkText, watermarkX, watermarkY);

      // 请求下一帧
      requestAnimationFrame(this.drawFrame);
    },
    startRecording () {
      if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
        this.recordedChunks = [];
        this.mediaRecorder.start();
        console.log('Recording started');
      } else {
        console.error('MediaRecorder is not initialized or is in an invalid state.');
      }
    },

    stopRecording () {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
        console.log('Recording stopped');
      } else {
        console.error('Recording was not in progress.');
      }
    },

    async downloadRecordedVideo () {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      this.$refs.downloadLink.href = url;
      this.$refs.downloadLink.download = 'watermarked_video.webm';
      this.$refs.downloadLink.click();
      URL.revokeObjectURL(url);
    },

    setupRecorder () {
      const stream = this.$refs.canvasElement.captureStream();
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        console.log(1111);
        this.downloadRecordedVideo();
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.video-watermark-container {
  position: relative;
  width: 100%;
  height: 100%;
  .top {
    height: 50px;
    width: 100%;
  }
  .bottom {
    height: calc(100% - 60px);
    position: relative;
  }
}

.watermarked-video {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
