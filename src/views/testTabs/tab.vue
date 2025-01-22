<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: { required: true },
    selected: { type: Boolean, default: false }
  },
  data () {
    return {
      isActive: this.selected
    };
  }
};
</script>
