<template>
<div class="container">
  <el-select v-model="typeValue" placeholder="请选择" @change="handleClear">
    <el-option
        v-for="item in typeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
  <div class="textarea-container">
    <p>
      <span v-if="typeValue === 'txt'">txt格式源:</span>
      <span v-else>m3u8格式源:</span>
    </p>
    <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="initialValue"
    />
  </div>
  <div class="btns-box">
    <el-button size="small" v-if="typeValue === 'txt'" @click="handleFormatToM3u8">格式转换</el-button>
    <el-button size="small" v-else @click="handleFormatToTXT">格式转换</el-button>
    <el-button size="small" @click="handleClear">清空屏幕</el-button>
    <el-button size="small" @click="handleCopyResult">拷贝结果</el-button>
    <el-button size="small" @click="handleDownload">保存结果</el-button>
    <el-dropdown trigger="click" @command="downloadDemo">
      <el-button size="small">下载模板</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="templateTxt">txt格式模板</el-dropdown-item>
          <el-dropdown-item command="templateM3u8" >m3u8模板</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="textarea-container">
    <p>
      <span v-if="typeValue === 'txt'">m3u8格式转换结果:</span>
      <span v-else>txt格式转换结果:</span>
    </p>
    <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="resultValue"/>
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
      resultValue: '',
      typeValue: 'txt',
      ul: '',
      templateM3u8: '/yian/static/template/demo.m3u8',
      templateTxt: '/yian/static/template/demo.txt',
      typeOptions: [
        {
          value: 'txt',
          label: 'txt转m3u8格式'
        },
        {
          value: 'm3u8',
          label: 'm3u8转txt格式'
        }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {},
  methods: {
    /**
     * @Description 点击格式转换按钮触发 m3u8转txt
     * @author qianyinggenian
     * @date 2024/10/05
     */
    handleFormatToTXT () {
      if (!this.initialValue) {
        this.$message.error('请先填写m3u8格式源');
        return false;
      }
      if (this.initialValue.includes('#genre#')) {
        this.$message.error('TXT格式源错误');
        return false;
      }
      const lines = this.initialValue.split('\n');
      let currentGroup = null;
      let oldCurrentGroup = null;
      let originalChannelName = null;
      let txtOutput = '';
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine !== '') {
          if (trimmedLine.includes('group-title')) {
            const startIndex = trimmedLine.lastIndexOf('group-title="');
            const endIndex = trimmedLine.lastIndexOf('",');
            currentGroup = trimmedLine.slice(startIndex, endIndex).replace(/group-title="/, '').trim();
            originalChannelName = trimmedLine.slice(endIndex, trimmedLine.length).replace(/",/, '').trim();
          } else if (!trimmedLine.includes('#EXTM3U')) {
            let genre = ',#genre#';
            let url = '';
            if (oldCurrentGroup !== currentGroup) {
              oldCurrentGroup = currentGroup;
              genre = `${currentGroup},#genre#`;
              url = `${genre}\n${originalChannelName},${trimmedLine}`;
            } else {
              url = `${originalChannelName},${trimmedLine}`;
            }
            txtOutput += `${url}\n`;
          }
        }
      }
      this.resultValue = txtOutput;
    },
    /**
     * @Description 点击格式转换按钮触发 txt转m3u8
     * @author qianyinggenian
     * @date 2024/10/05
    */
    handleFormatToM3u8 () {
      if (!this.initialValue) {
        this.$message.error('请先填写TXT格式源');
        return false;
      }
      if (this.initialValue.includes('#EXTINF') || this.initialValue.includes('#EXTM3U')) {
        this.$message.error('TXT格式源错误');
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
     * @Description 点击保存结果按钮触发
     * @author qianyinggenian
     * @date 2024/12/05
    */
    handleDownload () {
      if (this.resultValue) {
        const blob = new Blob([this.resultValue], { type: 'text/plain' });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        const filetype = this.typeValue === 'txt' ? 'm3u' : 'txt';
        downloadElement.download = `playlist.${filetype}`; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      } else {
        this.$message.error('内容为空，不可保存');
      }
    },
    /**
     * @Description  点击下载模板触发
     * @author qianyinggenian
     * @date 2024/15/05
    */
    downloadDemo (command) {
      console.log('command', command);
      const link = document.createElement('a');
      link.setAttribute('download', '');
      link.setAttribute('href', this[command]);
      // Firefox不支持 click()方法
      if (document.all) {
        link.click();
      } else {
        const evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        link.dispatchEvent(evt);
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
  .el-select {
    width: 250px;
  }
  .btns-box {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-dropdown {
    margin-left: 10px;
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
