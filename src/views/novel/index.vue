<template>
  <div class="container" v-loading="loading">
    <div class="search-box">
      <div class="item">
        <div class="label">搜索：</div>
        <div class="value">
          <el-input size="small" placeholder="请输入内容" v-model="searchValue" class="input-with-select">
            <template v-slot:prepend>
              <el-select size="small" v-model="websiteValue"  placeholder="请选择网站" @change="handleChange">
                <el-option
                    v-for="item in websiteList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-slot:append>
              <el-button icon="el-icon-search" @click="searchInfo"></el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="item">
        <el-button size="small" type="primary" @click="handleDownloadFile">下载txt</el-button>
      </div>
    </div>
    <div  class="content">
      <layout>
        <div slot="left" class="left">
          <el-tree
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :default-expanded-keys="defaultExpandedKeys"
              @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div slot="right" class="right">
          <div class="right-content" v-html="htmlContent"></div>
        </div>
      </layout>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as cheerio from 'cheerio';
import { downloadFile } from '@/utils/util';
export default {
  name: 'index',
  components: { },
  data () {
    return {
      loading: false,
      defaultExpandedKeys: [],
      rootData: [
        {
          type: 'root',
          label: '根节点',
          isDirectory: true,
          children: [],
          path: ''
        }
      ],
      currentChildren: [],
      currentChildrenIndex: 0,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      filename: '',
      textContent: '',
      htmlContent: '',
      searchValue: '',
      websiteValue: '笔趣阁',
      websiteUrl: 'http://www.xbiquzw.com',
      websiteList: [
        {
          url: 'https://www.biqusk.com/',
          value: '必去书库',
          label: '必去书库'
        },
        {
          url: 'http://www.xbiquzw.com',
          value: '笔趣阁',
          label: '笔趣阁'
        }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  created () {},
  mounted () {
    const $ = cheerio.load('<html><head><title>Hello, world!</title></head></html>');
    console.log('sdf', $('h1').text());
  },
  methods: {
    handleDownloadFile () {
      if (this.textContent) {
        downloadFile(this.textContent, this.filename);
      } else {
        this.$message.error('内容为空，下载');
      }
    },
    handleChange (val) {
      const res = this.websiteList.find(item => item.value === val);
      if (res) {
        this.websiteUrl = res.url;
      }
    },
    resetValue () {
      this.filename = '';
      this.textContent = '';
      this.htmlContent = '';
      this.currentChildren = [];
      this.currentChildrenIndex = 0;
    },
    async searchInfo () {
      this.resetValue();
      axios.defaults.withCredentials = true;
      axios.defaults.crossDomain = true;
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      // 正式环境接口转向
      // axios.defaults.baseURL = '//aaa.eos.dev.enbrands.com';
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
      let url = '';
      if (this.websiteValue === '必去书库') {
        url = `/biqusk/s.php?q=${this.searchValue}`;
      } else if (this.websiteValue === '笔趣阁') {
        url = `/biquge/modules/article/search.php?searchkey=${this.searchValue}`;
      }
      this.loading = true;
      axios.get(url).then(response => {
        const result = [];
        const res = response.data;
        const $ = cheerio.load(res);
        $('.grid tbody > tr').each(function (i, elem) {
          const title = $(elem).find('td:nth-child(1)').text();
          const author = $(elem).find('td:nth-child(3)').text();
          const path = $(elem).find('td:nth-child(1)').find('a').attr('href');
          if (title && author) {
            result.push({
              type: 'root',
              label: `${title} - ${author}`,
              children: [],
              id: `${title} - ${author}-1`,
              isDirectory: true,
              path
            });
          }
        });
        this.treeData = result;
        this.loading = false;
        console.log('result', result);
      }).catch(error => {
        console.log('Error:', error);
      });
      // console.log($);
    },
    /**
     * @Description 获取章节列表
     * @author qianyinggenian
     * @date 2024/3/14
     */
    async getChapter (treeNode, pathStr) {
      let url = '';
      if (this.websiteValue === '必去书库') {
        url = pathStr.replace(/https:\/\/www.biqusk.com/g, '/biqusk');
      } else if (this.websiteValue === '笔趣阁') {
        const url1 = `${this.websiteUrl}${pathStr}`;
        url = url1.replace(/http:\/\/www.xbiquzw.com/g, '/biquge');
      }
      this.loading = true;
      await axios.get(url).then(async (response) => {
        this.loading = false;
        const result = [];
        const res = response.data;
        const $ = cheerio.load(res);
        $('#list dd').each((i, elem) => {
          const label = $(elem).find('a').text();
          const path = $(elem).find('a').attr().href;
          result.push({
            type: 'biqusk',
            label,
            isDirectory: false,
            // path: pathStr + path
            path: this.websiteValue === '必去书库' ? path : pathStr + path
          });
          // this.getContent(path, false, label);
        });
        treeNode.children = result;
        this.currentChildren = result;
        if (result && result.length > 0) {
          this.defaultExpandedKeys.push(treeNode.id);
          // for (const resultElement of result) {
          //   await this.getContent(resultElement.path, false, resultElement.label);
          // }
        }
      }).catch(error => {
        console.log('Error:', error);
      });
    },
    /**
     * @Description 获取具体内容
     * @author qianyinggenian
     * @date 2024/3/14
     */
    async getContent (pathStr, flag = true, label = '') {
      let url = '';
      if (this.websiteValue === '必去书库') {
        url = this.websiteUrl + pathStr;
        url = url.replace(/https:\/\/www.biqusk.com/g, '/biqusk'); // g标志表示全局替换
      } else if (this.websiteValue === '笔趣阁') {
        const url1 = `${this.websiteUrl}${pathStr}`;
        url = url1.replace(/http:\/\/www.xbiquzw.com/g, '/biquge');
      }
      const t = new Date().getTime();
      axios.get(`${url}?t=${t}`).then(response => {
        const res = response.data.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '\n&nbsp;&nbsp;&nbsp;&nbsp;');
        const $ = cheerio.load(res);
        if (flag) {
          const html = $('#content').html();
          this.htmlContent = html || '';
        } else {
          this.textContent += `${label}\n\n${$('#content').text()}\n\n`;
        }
        // this.textContent += `${label}\n\n${$('#content').text()}\n\n`;
        // console.log('textContent', this.textContent);
      });
    },
    handleNodeClick (treeNode) {
      this.defaultExpandedKeys = [];
      if (treeNode.isDirectory) {
        this.filename = treeNode.label;
        this.textContent = '';
        this.getChapter(treeNode, treeNode.path);
      } else {
        this.getContent(treeNode.path, true);
      }
    },
    loadNode (node, resolve) {
      console.log('node', node);
      if (node.level === 0) {
        return resolve(this.rootData);
      }
      // if (node.level > 1) return resolve([]);
      setTimeout(() => {
        const data = [{
          label: 'leaf',
          leaf: true
        }, {
          label: 'zone'
        }];

        resolve(data);
      }, 500);
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .search-box {
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    .item {
      display: flex;
      margin-left: 10px;
      align-items: center;
      .label {
        margin-right: 10px;
      }
    }
  }
  .content {
    display: flex;
    height: calc(100% - 52px);
    .left {
      height: 100%;
      .el-tree {
        height: 100%;
        background: transparent;
        ::v-deep .el-tree-node__content:hover {
          background-color: #409eff !important;
        }
        ::v-deep .el-tree-node:focus > .el-tree-node__content {
          background-color: red !important;
        }
      }
    }
    .right {
      height: 100%;
      .right-content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
      }
    }
  }
}
.el-select {
  width: 100px;
}
.el-input {
  width: 500px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
