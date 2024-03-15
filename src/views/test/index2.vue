<template>
  <div>
    <p>测试</p>
    <p>测试</p>
    <p>值： {{ value }}</p>
    <p>
      多选-禁选
      <proxySelect
          multiple
          disabled
          v-model="value"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      多选-可选
      <proxySelect
          ref="11"
          multiple
          v-model="value"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      单选-可选
      <proxySelect
          ref="11"
          v-model="value1"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      单选-禁选
      <proxySelect
          ref="11"
          :disabled="true"
          v-model="value1"
          :options="options"
          clearable
          @clear="handleClear">
      </proxySelect>
    </p>
    <p>
      <input id="file" accept="" type="file" @change="handleChange"/>
    </p>
    <p>
      <proxyInput
          prefix-icon="el-icon-search"
          suffix-icon="el-icon-date"
          clearable
          :is-remove-spaces="true"
          v-model="inputValue">
          <span slot="prepend">前</span>
          <span slot="append">后</span>
      </proxyInput>
    </p>
  </div>
</template>

<script>
import proxySelect from '@/components/proxySelect/index.vue';
import proxyInput from '@/components/proxyInput/index.vue';
import axios from 'axios';
import imgURL from '../imageWatermark/img/bj.jpg';
export default {
  name: 'index',
  components: {
    proxySelect,
    proxyInput
  },
  data () {
    return {
      inputValue: '测试测试',
      value1: '选项2',
      value: ['选项2', '选项1'],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    // this.addWatermarkAndDownload(imgURL, 'Watermark Text', 'my_watermarked_image.png');
  },
  methods: {
    addWatermarkAndDownload (imageUrl, watermarkText, outputFilename) {
      // 加载原始图片
      const image = new Image();
      image.crossOrigin = 'Anonymous'; // 跨域处理
      image.onload = function () {
        // 创建画布
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');

        // 绘制水印
        ctx.font = '50px Arial';
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // 半透明白色水印
        ctx.fillStyle = '#000000'; // 半透明白色水印
        ctx.fillText(watermarkText, 50, 50); // 在(50, 50)位置添加水印

        // 绘制原始图片
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // 生成图片数据并下载
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = outputFilename || 'watermarked.png';
        link.click();
      };
      image.src = imageUrl;
    },
    handleClear () {
      console.log(111111);
    },
    /**
     * @Description 选择文件后触发
     * @author qianyinggenian
     * @date 2024/01/08
    */
    handleChange (event) {
      const file = event.target.files[0];
      // 打印文件名及类型
      console.log('文件名:', file.name);
      console.log('文件类型:', file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('文件路径:', reader.result);
        this.getFileInfo(reader.result);
      };
      reader.readAsDataURL(file);
    },
    /**
     * @Description 获取文件中的内容
     * @author qianyinggenian
     * @date 2024/01/08
    */
    getFileInfo (path) {
      axios.get(path) // 这里的路径应根据实际情况修改
        .then(response => {
          this.fileContent = response.data;
          console.log('fileContent', this.fileContent);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select,.el-input {
  width: 600px;
}

p {
  margin-top: 10px;
}
</style>
