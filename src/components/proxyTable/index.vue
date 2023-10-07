<template>
  <div class="layout-responsive-auto--column proxy-table-container">
    <slot v-if="isShowSlotToolBar" name="toolBar"></slot>
    <div v-if="isShowDefaultToolBar" class="default-toolBar">
      <div class="table-title" v-if="tableTitle">
        {{ tableTitle }}
      </div>
      <div class="toolbar" v-if="isShowToolBar">
        <el-input
            clearable
            :title="searchValue"
            :placeholder="placeholder"
            size="small"
            v-model="searchValue"></el-input>
        <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            @click="handleSearch"
        >
          {{ searchBtnLabel }}
        </el-button>
        <el-dropdown :hide-on-click="false" trigger="click">
          <el-button class="filter-btn" size="small">筛选</el-button>
          <template #dropdown>
            <el-dropdown-menu class="filter-dropdown">
              <el-dropdown-item>
                <el-checkbox-group
                    class="filter-group"
                    v-model="checkList"
                    @change="handleCheckedChange"
                >
                  <el-checkbox
                      v-for="item in columns"
                      :key="item.prop || item.name"
                      :label="item.prop">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small">确定</el-button>
                <el-button size="small" @click="handleReset">重置</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>

        </el-dropdown>
      </div>
    </div>
    <el-table
        ref="table"
        class="layout-responsive-auto__grow"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :lazy="lazy"
        :load="load"
        :size="size"
        :fit="fit"
        row-key="id"
        height="100%"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="getSummaries"
        :span-method="spanMethod"
        style="width: 100%"
        @select="handleSelect"
        @select-all="handleSelectAllFn"
    >
      <!-- 是否显示多选框-->
      <el-table-column
          v-if="showCheckbox"
          type="selection"
          :fixed="isCheckboxFixed"
          :selectable="hasCheckBox"
          reserve-selection
          class-name="choose-input-table-selection"
          :show-overflow-tooltip="false"
          align="center"
          header-align="center"
          width="50">
      </el-table-column>
      <!-- 是否显示序号-->
      <el-table-column
          v-if="showIndex"
          type="index"
          :fixed="isIndexFixed"
          :index="indexMethod"
          label="序号"
          class-name="choose-input-table-index"
          :show-overflow-tooltip="false"
          header-align="center"
          align="center"
          width="80">
      </el-table-column>
      <template v-for="item in columns">
        <!-- 是否有插槽-->
        <el-table-column
            :prop="item.prop || item.name"
            :label="item.label"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :sort-method="sortMethod"
            :filters="item.filters"
            :align="item.align"
            :show-overflow-tooltip="showOverflowTooltip"
            :width="item.width"
            :min-width="item.minWidth"
            v-if="item.slot"
            :render-header="item.renderHeader || renderHeader"
            :key="item.label"
        >
          <!-- 列值插槽 -->
          <template v-if="item.slotColumn" v-slot="scope">
            <slot
                :name="item.slotColumn"
                :column="item"
                :row="scope.row"
                :index="scope.$index"
            />
          </template>
          <!-- 表格头部插槽 -->
          <template v-if="item.slotHeader" v-slot:header>
            <slot :name="item.slotHeader"></slot>
          </template>
        </el-table-column>
        <tableColumn
            v-else
            :key="item.id"
            :col="item"
        >
        </tableColumn>
      </template>
      <el-table-column
          align="right"
          fixed="right"
          class-name="operation"
          prop="operation"
          width="250px"
          label="操作">
        <template v-if="slotOperation" v-slot="scope">
          <slot name="operation" :row="scope.row"/>
        </template>
        <template v-else v-slot="scope">
          <div ref="btns" class="operation-btns-box" v-if="isShowTextBtn">
            <template
                v-for="item in tableBtns">
              <div class="btn"
                   :key="item.value"
                   v-if="(scope.row.rowBtns ? scope.row.rowBtns.includes(item.value): true)"
                   :style="{color: item?.color?item.color:(btnColor[item.value]?btnColor[item.value]: '#1b6ef3')}"
              >
                <div @click="handleClickBtn(item.value,scope.row)">{{ item.label }}
                </div>
              </div>
            </template>
          </div>
          <div ref="btns" class="operation-btns-box" v-else>
            <div class="btn svg-btn"
                 v-for="item in tableBtns"
                 :key="item.value"
                 :style="{color: item?.color?item.color:(btnColor[item.value]?btnColor[item.value]: '#1b6ef3')}"
            >
              <svg-icon
                  :icon-class="item?.svg?item.svg:(btnSvg[item.value]?btnSvg[item.value]: 'btn4')"
                  :title="item.label"
                  :fill="item?.fill?item.fill: ''"
                  @click="handleClickBtn(item.value,scope.row)"
              >
              </svg-icon>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableColumn from './table-column/index.vue';

export default {
  name: 'index',
  components: {
    tableColumn
  },
  data () {
    return {
      checkList: [],
      searchValue: '',
      operationWidth: '0px',
      btnColor: {
        add: '#1b6ef3',
        edit: '#2abfd9',
        show: '#0af1f1',
        remove: '#f9620e',
        delete: '#f9620e'
      },
      btnSvg: {
        add: 'add',
        edit: 'edit',
        show: 'show',
        remove: 'remove',
        delete: 'delete'
      }
    };
  },
  props: {
    isShowSlotToolBar: {
      type: Boolean,
      default: false
    },
    isShowToolBar: {
      type: Boolean,
      default: true
    },
    isShowDefaultToolBar: {
      type: Boolean,
      default: true
    },
    tableTitle: {
      type: String,
      default: '表格标题'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    searchBtnLabel: {
      type: String,
      default: '搜索'
    },
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableBtns: {
      type: Array,
      default: () => []
    },
    /* 是否显示边框 */
    border: {
      type: Boolean,
      default: false
    },
    /* 是否斑马条纹 */
    stripe: {
      type: Boolean,
      default: false
    },

    /* 是否懒加载子节点数据 */
    lazy: {
      type: Boolean,
      default: true
    },
    /* 加载子节点数据的函数 */
    load: {
      type: Function
    },
    /* Table 的尺寸 */
    size: {
      type: String,
      default: 'small'
    },

    /* 列的宽度是否自撑开 */
    fit: {
      type: Boolean,
      default: true
    },
    /* 是否显示表头 */
    showHeader: {
      type: Boolean,
      default: true
    },
    /* 是否要高亮当前行 */
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    /* 表尾合计 */
    showSummary: {
      type: Boolean,
      default: false
    },
    /* 表尾统计文案 */
    sumText: {
      type: String,
      default: '合计'
    },
    /* 自定义合计规则 */
    getSummaries: {
      type: Function
    },
    /* 自定义排序规则 */
    sortMethod: {
      type: Function
    },

    /* 表格行、列合并 */
    spanMethod: {
      type: Function
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    isCheckboxFixed: {
      type: Boolean,
      default: false
    },
    isIndexFixed: {
      type: Boolean,
      default: false
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    /* 自定义操作列 */
    slotOperation: {
      type: Boolean,
      default: false
    },
    /* 文字按钮 */
    isShowTextBtn: {
      type: Boolean,
      default: true
    },
    diyHasCheckBox: {
      type: Function
    },
    diyIndexMethod: {
      type: Function
    },
    diyGetList: {
      type: Function
    },

    /* 表头样式自定义 */
    renderHeader: {
      type: Function
    }
  },
  watch: {
    table: {
      handler (newVal) {
        this.$nextTick(() => {
          // this.$refs.table.doLayout();
        });
      },
      immediate: true
    }
  },
  mounted () {
  },
  methods: {
    /**
     * @Description 复选框
     * @author qianyinggenian
     * @date 2023/9/27
     */
    hasCheckBox (row, index) {
      if (this.diyHasCheckBox && typeof this.diyHasCheckBox === 'function') {
        return this.diyHasCheckBox(row, index);
      } else {
        return true;
      }
    },
    /**
     * @Description 序号
     * @author qianyinggenian
     * @date 2023/9/27
     */
    indexMethod (index) {
      if (this.diyIndexMethod && typeof this.diyIndexMethod === 'function') {
        return this.diyIndexMethod(index);
      } else {
        return index + 1;
      }
    },
    /**
     * @Description 选择时触发
     * @author qianyinggenian
     * @date 2023/9/27
     */
    handleSelect (selection, row) {
      this.$emit('select', selection, row);
    },
    /**
     * @Description 全选时触发
     * @author qianyinggenian
     * @date 2023/9/27
     */
    handleSelectAllFn (selection) {
      this.$emit('select', selection);
    },
    /**
     * @Description 点击操作列按钮触发
     * @author qianyinggenian
     * @date 2023/9/27
     */
    handleClickBtn (type, row) {
      console.log('row', row);
      this.$emit(type, row);
    },
    /**
     * @Description 点击搜索按钮触发
     * @author qianyinggenian
     * @date 2023/10/7
     */
    handleSearch () {
      if (this.diyGetList && typeof this.diyGetList === 'function') {
        this.diyGetList(this.searchValue);
      }
    },
    /**
     * @Description 筛选选择触发
     * @author qianyinggenian
     * @date 2023/10/7
     */
    handleCheckedChange (value) {
      console.log('value', value);
    },
    /**
     * @Description 筛选重置触发
     * @author qianyinggenian
     * @date 2023/10/7
     */
    handleReset () {
      this.checkList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.proxy-table-container {

  .default-toolBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .table-title {
      font-size: var(--font-size-16);
      color: var(--body-title-color);
    }

    .toolbar {
      display: flex;
      justify-content: flex-end;

      .el-input {
        margin-right: 10px;
      }

      .filter-btn {
        margin-left: 10px;
      }

    }
  }

}

:deep(.filter-group) {
  display: flex;
  flex-direction: column;
}

:deep(.el-dropdown-menu__item) {
  &:hover {
    background: transparent !important;
  }
}

.operation-btns-box {
  display: flex;
  justify-content: flex-end;

  .btn {
    flex-shrink: 0;
    cursor: pointer;
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }

  .svg-btn {
    height: 20px;
    width: 20px;
  }
}

::v-deep .operation {
  width: 150px;
}
</style>
