<template>
  <el-table-column
      :fixed="col.fixed"
      :class-name="col.className"
      :width="col.width"
      :min-width="col.minWidth"
      :prop="col.prop || col.name"
      :label="col.label || col.title"
      :show-overflow-tooltip="true"
      :align="col.align || align"
      :sortable="col.sortable || false"
      :header-align="col.headerAlign || headerAlign"
      :filters="col.filters"
      :render-header="col.renderHeader"
      :filter-method="col.filterFn"
  >
    <template v-if="col.children && col.children.length > 0">
      <table-column
          v-for="item in col.children"
          :key="item.id"
          :col="item"
      >
      </table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'tableColumn',
  data () {
    return {
      align: 'center',
      headerAlign: 'center'
    };
  },
  props: {
    col: {
      type: Object
    }
  },
  created () {
    // console.log(this.col)
  },
  mounted () {
    // console.log(111111111111111111)
  }
};
</script>

<style lang="scss" scoped>
</style>
