<template>
  <!--  对el-select的二次封装-->
  <el-select
      :title="selectTitle"
      v-model="selectValue"
      v-bind="$attrs"
      v-on="$listeners">
    <slot></slot>
    <template v-slot:prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-slot:empty>
      <slot name="empty"></slot>
    </template>
    <el-option
        v-for="item in options"
        :key="item[keyValue]"
        :label="item[keyLabel]"
        :value="item[keyValue]">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      selectTitle: '',
      selectValue: null
    };
  },
  props: {
    value: {
      type: [String, Array]
    },
    keyValue: {
      type: String,
      default: 'value'
    },
    keyLabel: {
      type: String,
      default: 'label'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value: {
      handler (newVal) {
        this.selectValue = newVal;
      },
      immediate: true
    },
    selectValue: {
      handler (newVal) {
        if (newVal && newVal.length) {
          if (typeof newVal === 'string') {
            const result = this.options.find(item => item[this.keyValue] === newVal);
            if (result) {
              this.selectTitle = result[this.keyLabel];
            } else {
              this.selectTitle = '';
            }
          } else {
            this.getArrTitle();
          }
        } else {
          this.selectTitle = '';
        }
      },
      immediate: true
    }
  },
  methods: {
    getArrTitle () {
      const list = JSON.parse(JSON.stringify(this.options));
      const arr = [];
      this.selectValue.forEach(val => {
        for (const key of list) {
          if (val === key[this.keyValue]) {
            arr.push(key);
          }
        }
      });
      this.selectTitle = arr.map(value => value[this.keyLabel]).toString();
    }
  }
};
</script>

<style scoped>

</style>
