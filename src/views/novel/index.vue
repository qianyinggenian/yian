<template>
  <div class="container" v-loading="loading">
    <div class="search-box">
      <div class="item">
        <div class="label">搜索：</div>
        <div class="value">
          <el-input size="small" placeholder="请输入内容" v-model="searchValue" class="input-with-select"  @keyup.enter.native="searchInfo">
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
<!--        <el-button size="small" type="primary" @click="handleDownloadFile">下载txt</el-button>-->
      </div>
    </div>
    <div  class="content">
      <layout>
        <div slot="left" class="left">
          <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              highlight-current
              :default-expanded-keys="defaultExpandedKeys"
              @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div slot="right" class="right">
          <div class="top-box">
            <div class="title">{{title}}</div>
          </div>
          <div class="right-content" ref="refContent" v-html="htmlContent"></div>
          <div class="btns-box" v-if="chapterId" >
            <template v-if="listBtns.length > 0">
              <template v-for="(item,index) in listBtns" >
                <el-button v-if="item.url" size="small" @click="handleClick(item)" :key="index">
                  {{item.title}}
                </el-button>
              </template>
            </template>
            <template v-else>
              <el-button size="small" @click="handlePrev">上一章</el-button>
              <el-button size="small" @click="handleNext">下一章</el-button>
            </template>
          </div>
          <el-backtop ref="backTop" target=".right-content"></el-backtop>
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
      title: '',
      loading: false,
      currentNodeKey: '',
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
      novelId: '', // 小说id
      chapterId: '', // 章节id
      filename: '',
      textContent: '',
      htmlContent: '',
      searchValue: '',
      websiteValue: '书库5',
      websiteUrl: 'http://www.ujxsw.net',
      websiteList: [
        {
          url: 'http://www.xbiquzw.com',
          value: '书库1',
          label: '书库1',
          titleInfo: {
            info: '.grid tbody > tr',
            title: 'td:nth-child(1)',
            author: 'td:nth-child(3)',
            path: 'td:nth-child(1)'
          },
          chapterInfo: {
            info: '#list dd',
            title: 'a',
            path: 'a'
          }
        },
        {
          url: 'https://www.biqusk.com/',
          value: '书库2',
          label: '书库2',
          titleInfo: {
            info: '.grid tbody > tr',
            title: 'td:nth-child(1)',
            author: 'td:nth-child(3)',
            path: 'td:nth-child(1)'
          },
          chapterInfo: {
            info: '#list dd',
            title: 'a',
            path: 'a'
          }
        },
        {
          url: 'https://www.douyinxs.com/',
          value: '书库3',
          label: '书库3',
          titleInfo: {
            info: 'ul li',
            title: '.s2 a',
            author: '.s4',
            path: '.s2 a',
            isFirst: true
          },
          chapterInfo: {
            info: '#list dd',
            title: 'a',
            path: 'a'
          }
        },
        {
          url: 'http://www.ujxsw.org',
          value: '书库4',
          label: '书库4',
          titleInfo: {
            info: '.shulist ul',
            title: 'li.three a:first',
            author: 'li.four a',
            path: 'li.three a:first'
          },
          chapterInfo: {
            info: '#readerlist ul li',
            title: 'li a',
            path: 'li a',
            isFirst: true
          }
        },
        {
          url: 'https://www.luoxiaxiaoshuo.com/',
          value: '书库5',
          label: '书库5',
          titleInfo: {
            info: '.book-coverlist',
            title: 'h4 a',
            author: 'h4 a',
            path: 'a.thumbnail'
          },
          chapterInfo: {
            info: '#newlist.panel-chapterlist dd',
            title: 'a',
            path: 'a',
            isFirst: false
          }
        }
      ],
      listBtns: []
    };
  },
  props: {},
  watch: {},
  computed: {},
  created () {},
  mounted () {
    axios.defaults.withCredentials = true;
    axios.defaults.crossDomain = true;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  },
  methods: {
    backTop () {
      this.$nextTick(() => {
        this.$refs.backTop.handleClick();
      });
    },
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
        // if (this.websiteUrl.includes('https://')) {
        //   axios.defaults.withCredentials = true;
        // } else {
        //   axios.defaults.withCredentials = false;
        // }
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
      // axios.defaults.withCredentials = true;
      // axios.defaults.crossDomain = true;
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      let url = '';
      let method = 'get';
      let params = {};
      if (this.websiteValue === '书库2') {
        url = '/biqusk/s.php';
        params = {
          q: this.searchValue
        };
      } else if (this.websiteValue === '书库1') {
        url = '/biquge/modules/article/search.php';
        params = {
          searchkey: this.searchValue
        };
      } else if (this.websiteValue === '书库3') {
        method = 'post';
        url = '/douyinxs/search/';
        params = {
          searchkey: this.searchValue
        };
      } else if (this.websiteValue === '书库4') {
        method = 'post';
        url = '/ujxsw/searchbooks.php';
        params = {
          searchkey: this.searchValue
        };
      } else if (this.websiteValue === '书库5') {
        // method = 'post';
        url = '/luoxiaxiaoshuo/search/';
        params = {
          searchkey: this.searchValue
        };
      }
      const titleInfo = this.websiteList.find(item => item.value === this.websiteValue).titleInfo;
      try {
        axios({
          method: method,
          url: url,
          data: method === 'post' ? params : null, // POST 请求传递 data
          params: method === 'get' ? params : null // GET 请求传递 params
        })
          .then(response => {
            console.log('response', response);
            const result = [];
            const res = response.data;
            const $ = cheerio.load(res);
            const { info, title: tempTitle, author: tempAuthor, path: pt } = titleInfo;
            const that = this;
            $(`${info}`).each(function (i, elem) {
              // 忽略第一个 li 标签（表头）
              if (i === 0 && titleInfo.isFirst) return;
              const titleElement = $(elem).find(`${tempTitle}`);
              const pathElement = $(elem).find(`${pt}`);
              const title = titleElement.text().trim();
              const author = $(elem).find(`${tempAuthor}`).text().trim();
              let path = pathElement.attr('href');
              if (that.websiteValue === '书库4') {
                path = path.replace('book', 'read');
              }
              if (title && author) {
                result.push({
                  type: 'root',
                  label: `${title} - ${author}`,
                  children: [],
                  id: `${title} - ${author}-${i}`,
                  isDirectory: true,
                  path: path
                });
              }
            });
            this.treeData = result;
            this.loading = false;
            console.log('result', result);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    },
    /**
     * @Description 获取章节列表
     * @author qianyinggenian
     * @date 2024/3/14
     */
    async getChapter (treeNode, pathStr) {
      let url = '';
      if (this.websiteValue === '书库1') {
        const url1 = `${this.websiteUrl}${pathStr}`;
        url = url1.replace(/http:\/\/www.xbiquzw.com/g, '/biquge');
      } else if (this.websiteValue === '书库2') {
        url = pathStr.replace(/https:\/\/www.biqusk.com/g, '/biqusk');
      } else if (this.websiteValue === '书库3') {
        url = `/douyinxs${pathStr}`;
      } else if (this.websiteValue === '书库4') {
        url = `/ujxsw${pathStr}`;
      } else if (this.websiteValue === '书库5') {
        url = `/luoxiaxiaoshuo${pathStr}`;
      }
      this.loading = true;
      await axios.get(url).then(async (response) => {
        this.loading = false;
        const result = [];
        const res = response.data;
        const $ = cheerio.load(res);
        const chapterInfo = this.websiteList.find(item => item.value === this.websiteValue).chapterInfo;
        const { info, title: tempTitle, path: pt } = chapterInfo;
        const that = this;
        console.log($(`${info}`));
        $(`${info}`).each((index, elem) => {
          console.log('elem', elem);
          // 忽略第一个 li 标签（表头）
          if (index === 0 && chapterInfo.isFirst) return;
          const titleElement = $(elem).find(`${tempTitle}`);
          const pathElement = $(elem).find(`${pt}`);
          const label = titleElement.text().trim(); // 获取书名
          const path = pathElement.attr('href'); // 获取书籍链接
          result.push({
            type: 'chapter',
            label,
            isDirectory: false,
            // path: pathStr + path
            path: that.websiteValue === '书库1' ? pathStr + path : path,
            id: `${treeNode.id}-${label}-${index}`,
            parentId: treeNode.id
          });
        });
        treeNode.children = result;
        this.currentChildren = result;
        if (result && result.length > 0) {
          this.defaultExpandedKeys.push(treeNode.id);
        }
      }).catch(error => {
        console.log('Error:', error);
      });
    },
    handleClick (item) {
      if (item.title === '上一章') {
        this.handlePrev(false);
      } else if (item.title === '下一章') {
        this.handleNext(false);
      }
      this.getContent(item.url, true);
    },
    /**
     * @Description 获取具体内容
     * @author qianyinggenian
     * @date 2024/3/14
     */
    async getContent (pathStr, flag = true, label = '') {
      let url = '';
      if (this.websiteValue === '书库1') {
        const url1 = `${this.websiteUrl}${pathStr}`;
        url = url1.replace(/http:\/\/www.xbiquzw.com/g, '/biquge');
      } else if (this.websiteValue === '书库2') {
        url = this.websiteUrl + pathStr;
        url = url.replace(/https:\/\/www.biqusk.com/g, '/biqusk'); // g标志表示全局替换
      } else if (this.websiteValue === '书库3') {
        url = `/douyinxs${pathStr}`;
      } else if (this.websiteValue === '书库4') {
        url = `/ujxsw${pathStr}`;
      } else if (this.websiteValue === '书库5') {
        url = `/luoxiaxiaoshuo${pathStr}`;
      }
      const t = new Date().getTime();
      axios.get(`${url}?t=${t}`).then(response => {
        const res = response.data.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '\n&nbsp;&nbsp;&nbsp;&nbsp;');
        const $ = cheerio.load(res);
        if (flag) {
          // const html = $('#content').html();
          let html;
          if (['书库1', '书库2', '书库3'].includes(this.websiteValue)) {
            html = $('#content');
          } else if (this.websiteValue === '书库4') {
            // html = $('.read-content p').first().text().trim();
            html = $('.read-content');
          } else if (this.websiteValue === '书库5') {
            html = $('#booktxt');
          }
          this.htmlContent = html || '';
          this.$nextTick(() => {
            this.backTop();
          });
          // 初始化结果数组
          const arr = [];

          // 定义目标标题的顺序
          const targetOrder = ['上一章', '上一页', '下一页', '下一章'];
          let page;
          if (['书库1', '书库2', '书库3'].includes(this.websiteValue)) {
            page = '.bottem2 a';
          } else if (this.websiteValue === '书库4') {
            page = '.mlfy_page a';
          } else if (this.websiteValue === '书库5') {
            page = '.readPager a';
          }
          // 遍历所有 a 标签
          $(`${page}`).each((index, element) => {
            const text = $(element).text().trim(); // 提取标签的文本内容
            const href = $(element).attr('href'); // 提取 href 属性

            // 判断是否为目标内容
            if (targetOrder.includes(text)) {
              arr.push({
                title: text,
                url: href || null // 如果没有 href，则设置为 null
              });
            }
          });

          // 按照目标顺序重新排序数组
          this.listBtns = targetOrder.map(title =>
            arr.find(item => item.title === title) || { title, url: null }
          );
          console.log('sortedArr', this.listBtns);
        } else {
          this.textContent += `${label}\n\n${$('#content').text()}\n\n`;
        }
      });
    },
    handleNodeClick (treeNode) {
      this.defaultExpandedKeys = [];
      this.title = '';
      if (treeNode.isDirectory) {
        this.filename = treeNode.label;
        this.novelId = treeNode.id;
        this.textContent = '';
        this.getChapter(treeNode, treeNode.path);
      } else {
        this.title = treeNode.label;
        this.novelId = treeNode.parentId;
        this.chapterId = treeNode.id;
        this.getContent(treeNode.path, true);
      }
    },
    /**
     * @Description 点击上一章触发
     * @author qianyinggenian
     * @date 2025/3/28
     */
    handlePrev (flag = true) {
      const res = this.treeData.find(item => item.id === this.novelId);
      const { children } = res || {};
      const index = children.findIndex(item => item.id === this.chapterId);
      if (index !== -1 && index !== 0) {
        const chapter = children[index - 1];
        this.title = chapter.label;
        this.novelId = chapter.parentId;
        this.chapterId = chapter.id;
        if (flag) {
          this.getContent(chapter.path, true);
        }
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.chapterId);
        });
      }
    },
    /**
     * @Description 点击下一章触发
     * @author qianyinggenian
     * @date 2025/3/28
     */
    handleNext (flag = true) {
      const res = this.treeData.find(item => item.id === this.novelId);
      const { children } = res || {};
      const index = children.findIndex(item => item.id === this.chapterId);
      if (index !== -1 && index !== children.length - 1) {
        const chapter = children[index + 1];
        this.title = chapter.label;
        this.novelId = chapter.parentId;
        this.chapterId = chapter.id;
        if (flag) {
          this.getContent(chapter.path, true);
        }
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.chapterId);
        });
      }
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
        ::v-deep .el-tree-node.is-current > .el-tree-node__content {
          background-color: red !important;
        }
      }
    }
    .right {
      height: 100%;
      color: #ffffff;
      .top-box {
        height: 32px;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .title {
          font-size: 20px;
          font-weight: bold;
          margin-right: 100px;
        }
      }
      .right-content {
        height: calc(100% - 32px - 5px - 42px);
        width: 100%;
        overflow-y: auto;
      }
      .btns-box {
        height: 42px;
        display: flex;
        padding: 5px 0;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
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
