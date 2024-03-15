<template>
  <div id="pdf-viewer">
    <div v-if="totalPages > 0">
      <canvas  v-for="(_, index) in totalPages" :key="index" ref="pages"></canvas>
    </div>
  </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min';
export default {
  data () {
    return {
      pdfDocument: null,
      totalPages: 0,
      tiltAngle: -30
    };
  },
  async mounted () {
    await this.loadPDF();
  },
  methods: {
    async loadPDF () {
      const url = '/yian/static/template/豫章故郡.pdf'; // 替换为你的PDF文件路径
      const loadingTask = pdfjsLib.getDocument(url);
      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      console.log('totalPages', this.totalPages);
      if (this.pdfDocument && this.totalPages > 0) {
        this.$nextTick(() => {
          this.renderAllPages();
        });
      }
    },
    async renderAllPages () {
      for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
      // for (let pageNum = 0; pageNum <= this.totalPages; pageNum++) {
        this.$nextTick(async () => {
          // console.log('this.$refs.pages[pageNum - 1]', this.$refs.pages[pageNum - 1]);
          // const canvas = this.$refs[`pages${pageNum - 1}`];
          const canvas = this.$refs.pages[pageNum - 1];
          // let canvas;
          // if (pageNum === 1) {
          //   console.log(111);
          //   canvas = this.$refs.pages0;
          // } else if (pageNum === 2) {
          //   canvas = this.$refs.pages1;
          // } else if (pageNum === 3) {
          //   canvas = this.$refs.pages2;
          // }
          if (!canvas) {
            console.error(`Canvas element for page ${pageNum} not found.`);
            // continue;
            return false;
          }

          const page = await this.pdfDocument.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 });

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          const renderContext = {
            canvasContext: context,
            viewport
          };

          await page.render(renderContext).promise;
          this.drawWatermark(context, pageNum, canvas);
        });
      }
    },
    drawWatermark (context, pageNumber, canvas) {
      const textSpacing = 150; // 水印之间的间距
      const num = Math.max(canvas.width, canvas.height);
      const numWatermarks = Math.ceil(num / textSpacing);

      for (let i = 0; i < numWatermarks; i++) {
        for (let j = 0; j < numWatermarks; j++) {
          const x = j * textSpacing;
          const y = i * textSpacing;

          context.save();
          context.translate(x, y);
          context.rotate((this.tiltAngle * Math.PI) / 180);
          context.font = 'bold 32px Arial';
          context.fillStyle = 'rgb(224,10,10,0.8)';
          context.globalAlpha = '0.8';
          context.fillText('pdf水印', 0, 20);
          context.restore();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#pdf-viewer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  canvas {
    //height: 100%;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
