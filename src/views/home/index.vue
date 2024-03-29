<template>
  <div>首页</div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {};
  },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // this.getWeather();
  },
  methods: {
    async getWeather () {
      const apiUrl = 'https://api.codelife.cc/api/getWeather?lang=cn&location=101280102';

      try {
        const response = await fetch(apiUrl);
        console.log('response', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
      } catch (error) {
        console.error('An error occurred while fetching the weather data:', error);
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
