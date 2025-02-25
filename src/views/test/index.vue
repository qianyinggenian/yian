<template>
  <div>
    <embed id="RoutonReader" type="application/mozilla-npruntime-scriptable-plugin" width="1" height="1" />
    <p>测试</p>
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

    <a href="http://localhost:8888/yian/img/45.e2456a6f.jpg"  download="w3logo">文件下载</a>
    <a :href="logoUrl"  download="下载链接">下载链接</a>
    <br>
    <a data-thunder :href="getThunderLink(href)">下载链接下载链接</a>
    <navTabs>
      <div style="width: 80px;margin-right: 0px;border: 1px solid red;text-align: center" v-for="item in 30" :key="item">
        标签{{item}}
      </div>
    </navTabs>

    <el-button style="width: 80px" type="primary" @click="showMap">编辑</el-button>
    <tMap ref="tMapRef" v-if="isShowTMap" @closeMap="closeMap"></tMap>
    <div style="background: #0A1A34">
    </div>

    <div class="btns-box">
      <button class="btn type-1" @click="handleClick('参数1','参数2',false)">按钮</button>
      <button class="btn type-2">按钮</button>
      <button class="btn type-3">按钮</button>
      <button disabled class="btn type-4">按钮</button>
      <button  class="btn type-5">按钮</button>
    </div>
  </div>
</template>

<script>
import proxySelect from '@/components/proxySelect/index.vue';
import proxyInput from '@/components/proxyInput/index.vue';
import navTabs from '../layout/navbar/index1.vue';
import axios from 'axios';
import tMap from './tMap.vue';
// import imgURL from '../imageWatermark/img/bj.jpg';
export default {
  name: 'index',
  components: {
    navTabs,
    tMap,
    proxySelect,
    proxyInput
  },
  data () {
    return {
      isShowTMap: false,
      href: 'http://localhost:8888/yian/img/45.jpg',
      logoUrl: require('@/assets/45.jpg'),
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
      }],
      data: [
        {
          id: 1,
          label: 'Level 1 - 1',
          children: [
            {
              id: 2,
              label: 'Level 2 - 1',
              children: [
                {
                  id: 3,
                  label: 'Level 3 - 1',
                  children: [
                    {
                      id: 20,
                      label: 'Level 4 - 1'
                    },
                    {
                      id: 21,
                      label: 'Level 4 - 2'
                    }
                  ]
                },
                {
                  id: 4,
                  label: 'Level 3 - 2'
                }
              ]
            },
            {
              id: 5,
              label: 'Level 2 - 2',
              children: [
                {
                  id: 6,
                  label: 'Level 3 - 3'
                },
                {
                  id: 7,
                  label: 'Level 3 - 4'
                }
              ]
            }
          ]
        },
        {
          id: 8,
          label: 'Level 1 - 2',
          children: [
            {
              id: 9,
              label: 'Level 2 - 3',
              children: [
                {
                  id: 10,
                  label: 'Level 3 - 5'
                },
                {
                  id: 11,
                  label: 'Level 3 - 6'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandedKeys: []
    };
  },
  props: {},
  watch: {},
  computed: {},
  mounted () {
    this.setDefaultExpandedKeys();
  },
  methods: {
    setDefaultExpandedKeys () {
      const keys = [];
      this.data.forEach(item => {
        if (item.children) {
          keys.push(item.id); // 展开第一级节点
          item.children.forEach(child => {
            if (child.children) {
              keys.push(child.id); // 展开第二级节点
              child.children.forEach(grandChild => {
                keys.push(grandChild.id); // 展开第三级节点
              });
            }
          });
        }
      });
      this.defaultExpandedKeys = keys;
    },
    /**
     * @Description
     * @author wangkangzhang
     * @date 2024/6/29
     */
    closeMap () {
      this.isShowTMap = false;
    },
    showMap () {
      this.isShowTMap = true;
      this.$nextTick(() => {
        this.$refs.tMapRef.getInfo({
          latitude: 23.050014,
          longitude: 113.294975,
          radius: 200
        });
      });
    },
    getThunderLink (href) {
      return `thunder://${btoa(`AA${href}ZZ`)}`;
    },
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
    handleClick (vm) {
      // this.$message({
      //   type: 'error',
      //   message: '所选设备（设备名称）断电/通电失败',
      //   duration: 0,
      //   showClose: true
      // });
      this.$message({
        type: 'success',
        message: '所选设备（设备名称）断电/通电成功',
        duration: 5000
      });
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
.btns-box {
  display: flex;
  margin-top: 100px;
  margin-left: 100px;
  .btn {
    height: 32px;
    width: 60px;
    border-radius: 4px;
  }
  .btn + .btn {
    margin-left: 10px;
  }
}
$btnColors: #409eff, #b03ac2,#8b590f,#f54343,#6c6d71;
@for $i from 1 through length($btnColors) {
  .btn.type-#{$i} {
    $color: nth($btnColors, $i);
    background: $color;
    color: #fff;
    border: 1px solid $color;
    &:hover {
      background: lighten($color,10%);
      border: 1px solid lighten($color,10%);
    }
    &:active {
      background: darken($color, 10%);
      border: 1px solid darken($color,10%);
    }
    &:disabled {
      background: lighten($color,20%);
      border: 1px solid lighten($color,20%);
      color: #fff;
    }
  }
}
</style>
