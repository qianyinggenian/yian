<template>
  <div>
    <div class="tabs">
      <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-button', { active: tab.isActive }]"
          @click="selectTab(tab)">
        {{ tab.name }}
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
    return { tabs: [] };
  },
  mounted () {
    this.tabs = this.$children;
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name);
      });
    }
  }
};
</script>
