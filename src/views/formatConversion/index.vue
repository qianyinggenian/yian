<template>
<div class="container">
  <div class="textarea-container">
    TXT格式源:
    <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="initialValue">
    </el-input>
  </div>
  <div class="btns-box">
    <el-button size="small" @click="handleFormat1">格式转换1</el-button>
    <el-button size="small" @click="handleFormat">格式转换</el-button>
    <el-button size="small" @click="handleClear">清空屏幕</el-button>
    <el-button size="small" @click="handleCopyResult">拷贝结果</el-button>
    <el-button size="small" @click="handleDownload">保存m3u8</el-button>
  </div>
  <div class="textarea-container">
    M3U格式转换结果:
    <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="resultValue">
    </el-input>
  </div>

</div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      initialValue: '',
      resultValue: ''
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {},
  methods: {
    handleFormat1 () {
      const lines = this.initialValue.split('\n');
      console.log('lines', lines);
    },
    /**
     * @Description 点击格式转换按钮触发
     * @author qianyinggenian
     * @date 2024/10/05
    */
    handleFormat () {
      if (!this.initialValue) {
        this.$message.error('请选填写TXT格式源');
        return false;
      }
      const lines = this.initialValue.split('\n');
      let m3uOutput = '#EXTM3U x-tvg-url="https://live.fanmingming.com/e.xml"\n';
      let currentGroup = null;
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine !== '') {
          if (trimmedLine.includes('#genre#')) {
            currentGroup = trimmedLine.replace(/,#genre#/, '').trim();
          } else {
            const [originalChannelName, channelLink] = trimmedLine.split(',').map(item => item.trim());
            const processedChannelName = originalChannelName.replace(/(CCTV|CETV)-(\d+).*/, '$1$2');
            m3uOutput += `#EXTINF:-1 tvg-name="${processedChannelName}" tvg-logo="https://live.fanmingming.com/tv/${processedChannelName}.png"`;
            if (currentGroup) {
              m3uOutput += ` group-title="${currentGroup}"`;
            }
            m3uOutput += `,${originalChannelName}\n${channelLink}\n`;
          }
        }
      }
      this.resultValue = m3uOutput;
    },
    /**
     * @Description 点击清空屏幕按钮触发
     * @author qianyinggenian
     * @date 2024/10/05
    */
    handleClear () {
      this.initialValue = '';
      this.resultValue = '';
    },
    /**
     * @Description 点击拷贝结果按钮触发
     * @author qianyinggenian
     * @date 2024/10/05
    */
    handleCopyResult () {
      // const m3uOutput = document.getElementById('m3uOutput');
      // m3uOutput.select();
      // document.execCommand('copy');
      // alert('内容已复制到剪贴板！');
      navigator.clipboard.writeText(this.resultValue).then(() => {
        this.$message.success('复制成功');
      });
    },
    /**
     * @Description 点击保存m3u8按钮触发
     * @author qianyinggenian
     * @date 2024/12/05
    */
    handleDownload () {
      if (this.resultValue) {
        const blob = new Blob([this.resultValue], { type: 'text/plain' });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = 'playlist.m3u'; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      } else {
        this.$message.error('内容为空，不可保存');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  .btns-box {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .textarea-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  :deep(.el-textarea) {
    height: 100%;
    .el-textarea__inner {
      height: 100%;
    }
  }
}
</style>
