<template>
  <div class="layout-responsive-auto--column proxy-table-container">
    <slot v-if="isShowSlotToolBar" name="toolBar"></slot>
    <div v-if="isShowDefaultToolBar"
         class="default-toolBar"
         :class="{'default-toolBar-end':operations.length === 0}"
    >
      <div class="operations-box" v-if="operations && operations.length">
        <el-button
            size="small"
            :type="item?.type?item.type:(typeObj[item.value]?typeObj[item.value]:'primary')"
            v-for="item in operations"
            :key="item.value"
            @click="handleClick(item)"
        >
          <svg-icon
              :size="12"
              :icon-class="item?.svg?item.svg:(operationSvg[item.value]?operationSvg[item.value]: 'btn4')"
              :fill="item?.fill?item.fill: ''"
          >
          </svg-icon>
          {{ item.label }}
        </el-button>
      </div>
      <div class="toolbar" v-if="isShowToolBar">
        <slot class="search-box" name="search-box"></slot>
        <el-input
            v-if="isShowSearchInput"
            clearable
            :title="searchValue"
            :placeholder="placeholder"
            size="small"
            v-model="searchValue"/>
        <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            @click="handleSearch"
        >
          {{ searchBtnLabel }}
        </el-button>
        <el-dropdown v-if="isShowFilter" :hide-on-click="false" trigger="click">
          <el-button class="filter-btn" size="small">筛选</el-button>
          <template #dropdown>
            <el-dropdown-menu class="filter-dropdown">
              <el-dropdown-item>
                <el-checkbox-group
                    class="filter-group"
                    v-model="checkList"
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
                <el-button size="small" @click="handleConfirm">确定</el-button>
                <el-button size="small" @click="handleReset">重置</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="table-title" v-if="tableTitle">
      {{ tableTitle }}
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
        @row-click="handleRowClick"
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
      <template v-for="item in columnsFn(columns,filterCheckList)">
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
            :key="item.prop"
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
            :key="item.prop"
            :col="item"
        >
        </tableColumn>
      </template>
      <el-table-column
          align="right"
          fixed="right"
          class-name="operation"
          prop="operation"
          :width="operationWidth"
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
                   :style="{color: '#0af1f1'}"
              >
                <div @click.stop="handleClickBtn(item.value,scope.row)">{{ item.label }}
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
    <div class="pagination" v-show="isShowPagination">
      <el-pagination
          background
          popper-class="custom-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPageNum"
          :pager-count="5"
          :page-sizes="[20, 50, 100, 200]"
          :page-size.sync="pageSizeNum"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tableColumn from './table-column/index.vue';
import props from './props';

export default {
  name: 'index',
  components: {
    tableColumn
  },
  data () {
    return {
      currentPageNum: 1,
      pageSizeNum: 20,
      checkList: [],
      filterCheckList: [],
      searchValue: '',
      rowKey: 'rowKey',
      btnColor: {
        add: '#1b6ef3',
        edit: '#2abfd9',
        show: '#0af1f1',
        remove: '#f9620e',
        delete: '#f9620e'
      },
      typeObj: {
        add: 'primary',
        remove: 'danger',
        delete: 'danger'
      },
      operationSvg: {
        add: '新增',
        edit: 'edit',
        show: 'show',
        remove: '删除',
        delete: '删除'
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
    ...props
  },
  watch: {
    tableData: {
      handler (newVal) {
        this.$nextTick(() => {
          this.$refs.table.doLayout();
        });
      },
      immediate: true,
      deep: true
    },
    columns: {
      handler (newVal) {
        if (newVal && newVal.length > 0) {
          this.checkList = newVal.map(item => item.prop);
          this.filterCheckList = this.checkList;
        }
      },
      immediate: true
    },
    currentPage: {
      handler (newVal) {
        if (newVal !== this.currentPageNum) {
          this.currentPageNum = newVal;
        }
      },
      immediate: true
    },
    pageSize: {
      handler (newVal) {
        if (newVal !== this.pageSizeNum) {
          this.pageSizeNum = newVal;
        }
      },
      immediate: true
    }
  },
  computed: {
    columnsFn () {
      return (columns, filterCheckList) => {
        const list = JSON.parse(JSON.stringify(columns));
        return list.filter(item => {
          return filterCheckList.some(val => item.prop === val);
        });
      };
    }
  },
  mounted () {
  },
  methods: {
    /**
     * @Description 点击表格顶部功能按钮触发
     * @author qianyinggenian
     * @date 2023/10/9
     */
    handleClick (item) {
      this.$emit(item.value);
    },
    /**
     * @Description 切换条数触发
     * @author qianyinggenian
     * @date 2023/10/8
     */
    handleSizeChange (val) {
      this.pageSizeNum = val;
      this.$emit('size-change', val);
    },
    /**
     * @Description 切换页码触发
     * @author qianyinggenian
     * @date 2023/10/8
     */
    handleCurrentChange (val) {
      this.currentPageNum = val;
      this.$emit('current-change', val);
    },
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
     * @Description 当某一行被点击时会触发该事件
     * @author qianyinggenian
     * @date 2023/10/10
     */
    handleRowClick (row, column, event) {
      const params = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('rowClick', params);
    },
    /**
     * @Description 点击操作列按钮触发
     * @author qianyinggenian
     * @date 2023/9/27
     */
    handleClickBtn (type, row) {
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
     * @Description 筛选确定触发
     * @author qianyinggenian
     * @date 2023/10/8
     */
    handleConfirm () {
      this.filterCheckList = this.checkList;
    },
    /**
     * @Description 筛选重置触发
     * @author qianyinggenian
     * @date 2023/10/7
     */
    handleReset () {
      this.checkList = this.columns.map(item => item.prop);
      this.filterCheckList = this.checkList;
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

    .operations-box {
      :deep(.el-button) {
        span {
          font-size: 12px;
          display: flex;
          align-items: center;
        }

        .svg-icon {
          margin-right: 5px;
        }
      }
    }

    .toolbar {
      display: flex;
      justify-content: flex-end;

      .el-input {
        width: 250px;
        margin-right: 10px;
      }

      .filter-btn {
        margin-left: 10px;
      }

    }
  }

  .default-toolBar-end {
    justify-content: flex-end;
  }

  .table-title {
    font-size: var(--font-size-18);
    color: var(--body-title-color);
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
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

</style>
