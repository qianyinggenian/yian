<template>
  <FlexBox class="full-width full-height gap-small" tag="section">
    <FlexBox class="gap-small" tag="header" inline flex="70px">
      <FlexBox flex="0 1 360px">
        <div class="full-height" style="background-color: #86efac; color: white;">Top Left</div>
      </FlexBox>
      <FlexBox flex>
        <div class="full-height" style="background-color: #4ade80; color: white;">Top Middle {{ count }}</div>
      </FlexBox>
      <FlexBox flex="1 0 360px">
        <div class="full-height" style="background-color: #22c55e; color: white;">Top Right</div>
      </FlexBox>
    </FlexBox>
    <FlexBox class="gap-small" tag="main" inline flex>
      <FlexBox class="gap-small" tag="aside" flex="256px">
        <FlexBox class="overflow-auto" flex="100px">
          <div style="width: 400px; height: 200px; background-color: #fb923c; color: white;">Left Top {{ count }}</div>
        </FlexBox>
        <FlexBox class="overflow-auto" flex>
          <div class="flex-shrink-0" style="height: 800px; background-color: #f97316; color: white;">Left Bottom</div>
        </FlexBox>
      </FlexBox>
      <FlexBox class="gap-small" :flex="2">
        <FlexBox>
          <div style="height: 100px; background-color: #facc15; color: white;">
            <FlexBox class="gap-small" inline justify="center" align="bottom">
              <FlexBox style="font-size: 24px;">Left</FlexBox>
              <FlexBox style="font-size: 48px;">Middle</FlexBox>
              <FlexBox flex="1/3">
                <div style="font-size: 24px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。</div>
              </FlexBox>
            </FlexBox>
          </div>
        </FlexBox>
        <FlexBox>
          <div style="height: 100px; background-color: #facc15; color: white;">
            <FlexBox class="gap-small" inline justify="center" align="bottom">
              <FlexBox style="font-size: 24px;">Left</FlexBox>
              <FlexBox style="font-size: 48px;">Middle</FlexBox>
              <FlexBox flex="1/3">
                <div style="font-size: 24px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。</div>
              </FlexBox>
            </FlexBox>
          </div>
        </FlexBox>
        <FlexBox class="overflow-auto" flex>
          <div class="flex-shrink-0" style="width: 100%; height: 800px; background-color: #eab308; color: white;">
            <FlexBox class="gap-small" inline justify="center" align="center">
              <FlexBox style="font-size: 24px;">Left</FlexBox>
              <FlexBox style="font-size: 48px;">Middle</FlexBox>
              <FlexBox style="font-size: 32px;">Right</FlexBox>
            </FlexBox>
          </div>
        </FlexBox>
      </FlexBox>
      <FlexBox class="gap-small" tag="aside" flex>
        <FlexBox>
          <div style="height: 60px; background-color: #fb7185; color: white;">Right Top</div>
        </FlexBox>
        <FlexBox class="overflow-auto" flex>
          <div class="flex-shrink-0" style="height: 800px; background-color: #f43f5e; color: white;">Right Middle</div>
        </FlexBox>
        <FlexBox class="overflow-x-hidden overflow-y-auto" flex="100px">
          <div class="flex-shrink-0" style="width: 1200px; height: 200px; background-color: #e11d48; color: white;">Right Bottom</div>
        </FlexBox>
      </FlexBox>
    </FlexBox>
    <FlexBox class="gap-small" tag="footer" inline style="height: 70px;">
      <FlexBox flex="1 / 6">
        <div class="full-height" style="background-color: #86efac; color: white;">Bottom Left</div>
      </FlexBox>
      <FlexBox flex>
        <div class="full-height" style="background-color: #4ade80; color: white;">Bottom Middle {{ count }}</div>
      </FlexBox>
      <FlexBox flex="2/6">
        <div class="full-height" style="background-color: #86efac; color: white;">Bottom Right</div>
      </FlexBox>
    </FlexBox>
  </FlexBox>
</template>

<script>
import FlexBox from './FlexBox';

export default {
  name: 'DemoLayout',

  components: {
    FlexBox
  },

  data () {
    return {
      count: 0
    };
  },

  mounted () {
    setInterval(() => {
      this.count += 1;
    }, 3 * 1000);
  }
};
</script>

<style scoped>

</style>
