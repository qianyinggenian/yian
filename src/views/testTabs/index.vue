<template>
  <div class="tabs-container">
    <div class="tab-strip">
      <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-button"
          :class="{ active: tab.isActive }"
          @click="selectTab(index)">
        <img class="tab-icon" :src="tab.icon" alt="Icon">
        <span class="tab-text">{{ tab.text }}</span>
        <span class="close-btn" @click.stop="closeTab(index)">×</span>
      </div>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        { icon: 'path/to/icon1.png', text: '百度搜索', isActive: true },
        { icon: 'path/to/icon2.png', text: '通义千问', isActive: false }
      ]
    };
  },
  methods: {
    selectTab (index) {
      this.tabs.forEach((tab, i) => {
        tab.isActive = i === index;
      });
    },
    closeTab (index) {
      this.tabs.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
@import '~./index.scss';
</style>
