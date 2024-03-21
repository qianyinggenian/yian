"use strict";(self["webpackChunkyian"]=self["webpackChunkyian"]||[]).push([[616],{2616:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"watermarkImage"},[t("el-form",{ref:"form",attrs:{model:e.form,size:"small","label-width":"80px"}},[t("el-row",{attrs:{type:"flex",justify:"space-between"}},[t("el-col",{attrs:{span:24}},[t("el-form-item",[t("input",{attrs:{type:"file",accept:"image/*"},on:{change:e.onFileChange}})])],1)],1),t("el-row",{attrs:{type:"flex",justify:"space-between",gutter:20}},[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"水印内容",prop:"watermarkText",title:e.form.watermarkText}},[t("el-input",{attrs:{clearable:""},model:{value:e.form.watermarkText,callback:function(t){e.$set(e.form,"watermarkText",t)},expression:"form.watermarkText"}})],1)],1),t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"字体",prop:"fontFamily"}},[t("el-select",{attrs:{size:"small",filterable:"",placeholder:"请选择"},model:{value:e.form.fontFamily,callback:function(t){e.$set(e.form,"fontFamily",t)},expression:"form.fontFamily"}},e._l(e.fontFamilyList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"字体大小",prop:"fontSize"}},[t("el-input-number",{attrs:{min:10,max:100},model:{value:e.form.fontSize,callback:function(t){e.$set(e.form,"fontSize",t)},expression:"form.fontSize"}})],1)],1),t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"透明度",prop:"watermarkOpacity"}},[t("el-input-number",{attrs:{step:.1,min:0,max:1},model:{value:e.form.watermarkOpacity,callback:function(t){e.$set(e.form,"watermarkOpacity",t)},expression:"form.watermarkOpacity"}})],1)],1)],1),t("el-row",{attrs:{type:"flex",justify:"space-between",gutter:20}},[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"倾斜角度",prop:"tiltAngle"}},[t("el-input-number",{attrs:{min:-90,max:90},model:{value:e.form.tiltAngle,callback:function(t){e.$set(e.form,"tiltAngle",t)},expression:"form.tiltAngle"}})],1)],1),t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"间隔距离",prop:"textSpacing"}},[t("el-input-number",{attrs:{step:1,min:100,max:200},model:{value:e.form.textSpacing,callback:function(t){e.$set(e.form,"textSpacing",t)},expression:"form.textSpacing"}})],1)],1),t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"字体颜色",prop:"fontColor"}},[t("el-color-picker",{model:{value:e.form.fontColor,callback:function(t){e.$set(e.form,"fontColor",t)},expression:"form.fontColor"}})],1)],1),t("el-col",{attrs:{span:6}},[t("el-form-item",[t("el-button",{staticClass:"download-btn",attrs:{type:"primary"},on:{click:function(t){return e.downloadImage(e.previewData)}}},[e._v(" 下载 ")])],1)],1)],1)],1),e.previewData?t("div",{staticClass:"imageBox"},[t("img",{staticStyle:{"max-width":"100%"},attrs:{src:e.previewData,alt:"预览图片"}})]):e._e()],1)},r=[],o={data(){return{selectedFile:null,previewData:null,fontFamilyList:[{value:"Arial",label:"Arial"},{value:"宋体",label:"宋体"},{value:"楷体",label:"楷体"},{value:"仿宋",label:"仿宋"},{value:"黑体",label:"黑体"},{value:"等线",label:"等线"},{value:"微软雅黑",label:"微软雅黑"},{value:"思源黑体",label:"思源黑体"},{value:"Times New Roman",label:"Times New Roman"},{value:"Helvetica Neue",label:"Helvetica Neue"},{value:"Helvetica",label:"Helvetica"},{value:"PingFang SC",label:"PingFang SC"},{value:"Hiragino Sans GB",label:"Hiragino Sans GB"},{value:"Microsoft YaHei",label:"Microsoft YaHei"},{value:"sans-serif",label:"sans-serif"}],form:{watermarkText:"Watermark",tiltAngle:-30,fontFamily:"Arial",watermarkOpacity:.7,fontSize:20,textSpacing:100,fontColor:"#ffffff"}}},watch:{form:{handler(e,t){this.selectedFile&&this.addWatermarkAndDownload()},deep:!0}},methods:{onFileChange(e){this.selectedFile=e.target.files[0],this.fileName=this.selectedFile.name||"水印图片.png",console.log("fileName",this.fileName),this.addWatermarkAndDownload()},addWatermarkAndDownload(){if(!this.selectedFile)return void this.$message.error("请先选择一张图片！");const e=new FileReader;e.onload=e=>{const t=new Image;t.onload=()=>{this.addWatermark(t,e.target.result)},t.src=e.target.result},e.readAsDataURL(this.selectedFile)},addWatermark(e,t){const a=document.createElement("canvas"),l=a.getContext("2d");a.width=e.width,a.height=e.height,l.clearRect(0,0,a.width,a.height),l.drawImage(e,0,0,e.width,e.height);const{watermarkText:r,tiltAngle:o,fontSize:i,fontColor:n,watermarkOpacity:s,fontFamily:m,textSpacing:f}=this.form,c=Math.max(e.width,e.height),p=Math.ceil(c/f);for(let u=0;u<p;u++)for(let e=0;e<p;e++){const t=e*f,a=u*f;l.save(),l.translate(t,a),l.rotate(o*Math.PI/180),l.font=`${i}px ${m}`,l.fillStyle=n,l.globalAlpha=s,l.fillText(r,0,i),l.restore()}l.globalAlpha=1,this.previewData=a.toDataURL("image/png")},downloadImage(e){if(e){const t=document.createElement("a");t.href=e,t.download=`水印-${this.fileName}`,t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}else this.$message.error("请先选择一张图片！")}}},i=o,n=a(81656),s=(0,n.A)(i,l,r,!1,null,"6fa01ff8",null),m=s.exports}}]);
//# sourceMappingURL=616.7ea47bff.js.map