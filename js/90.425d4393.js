(self["webpackChunkyian"]=self["webpackChunkyian"]||[]).push([[90],{45800:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return x}});var n=function(){var e=this,t=e._self._c;return t("layout",{attrs:{"is-show-left":!1}},[t("div",{attrs:{slot:"right"},slot:"right"},[t("proxy-table"),t("proxyDialog")],1)])},a=[],l=function(){var e=this,t=e._self._c;return t("proxyTable",{ref:"proxyTable",attrs:{"table-btns":e.tableBtns,"table-data":e.tableData,"table-title":"表格标题（注：表中数据均为MockJs随机生成的数据）",columns:e.columns,operations:e.operations,pageSize:50,total:e.tableData.length,isCheckboxFixed:!0,"is-index-fixed":!0,"diy-get-list":e.diyGetList,"is-show-default-tool-bar":!0},on:{edit:e.handleEdit,add:e.handleAdd,export:e.handleExport},scopedSlots:e._u([{key:"operation",fn:function({row:o}){return[t("div",{staticClass:"btns"},[t("span",{on:{click:function(t){return e.handleEdit(o)}}},[e._v("编辑")])])]}},{key:"province",fn:function({row:o}){return[t("span",[e._v("省份列插槽："+e._s(o.province))])]}},{key:"region",fn:function(){return[t("span",[e._v("区域头部插槽")])]},proxy:!0}])},[t("div",{staticClass:"search-box",attrs:{slot:"search-box"},slot:"search-box"},[t("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.operations,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)])},i=[],r=o(25567),s=o(24974),c=o.n(s),d=o(4213),p=o.n(d),u={name:"demo",components:{proxyTable:r.A},data(){return{value:"",input:"",operations:[{value:"add",label:"新增"},{value:"remove",label:"删除"},{value:"test",label:"测试"},{value:"export",label:"导出"}],columns:[{prop:"name",label:"姓名",minWidth:"150px"},{prop:"region",label:"区域",minWidth:"250px",slot:!0,slotHeader:"region"},{prop:"province",label:"省份",slot:!0,slotColumn:"province",minWidth:"250px"},{prop:"city",label:"城市",minWidth:"350px"},{prop:"county",label:"市县",minWidth:"250px"},{prop:"zip",label:"邮政编码",minWidth:"150px"},{prop:"creatDate",label:"创建日期",minWidth:"150px"}],tableData:[],tableBtns:[{label:"查看",value:"show",svg:"show",color:"#0af1f1"},{label:"编辑",value:"edit",svg:"edit",color:"#2abfd9",fill:"red"},{label:"删除",value:"remove",svg:"remove",color:"red"},{label:"关联",value:"association"},{label:"设置",svg:"setting",value:"setting"}]}},props:{},watch:{},computed:{},mounted(){const e=this.$Mock.mock({"list|500":[{id:"@guid",name:"@cname","age|40-50":40,area:"@region",region:"@region",province:"@province",city:"@city",county:"@county(true)",zip:"@zip",text:"@cparagraph",email:"@email",creatDate:"@date('yyyy-MM-dd HH:mm:ss')"}]});console.log("data",e.list),this.tableData=e.list.map((e=>("北京"===e.province?e.rowBtns=["show","edit"]:"上海"===e.province?e.rowBtns=["show","edit","remove","setting"]:"安徽省"===e.province?e.rowBtns=["show","edit","remove"]:e.rowBtns=["show","edit","remove","setting"],e)))},methods:{handleAdd(){console.log("asdad")},handleExport(){const e="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",t=new(c().Workbook);t.creator="Me",t.lastModifiedBy="Me",t.created=new Date,t.modified=new Date,t.lastPrinted=new Date;const o=t.addWorksheet("My Sheet",{views:[{state:"frozen",xSplit:1,ySplit:1}]}),n=JSON.parse(JSON.stringify(this.columns));o.columns=n.map((e=>(e.header=e.label,e.key=e.prop,e.width=20,e))),this.tableData.forEach((e=>{o.addRow(e)})),t.xlsx.writeBuffer().then((t=>{const o=new Blob([t],{type:e});p()(o,"excel导出测试.xlsx")}))},handleEdit(e){console.log("rowrow",e)},diyGetList(e){console.log("搜索搜索",e)}}},f=u,v=o(81656),b=(0,v.A)(f,l,i,!1,null,"1afefb31",null),m=b.exports,h=o(88604),w={name:"index",components:{proxyTable:m,proxyDialog:h.A},data(){return{}},props:{},watch:{},computed:{},mounted(){},methods:{}},y=w,g=(0,v.A)(y,n,a,!1,null,"c6dba4f4",null),x=g.exports},4213:function(e,t,o){var n,a,l;(function(o,i){a=[],n=i,l="function"===typeof n?n.apply(t,a):n,void 0===l||(e.exports=l)})(0,(function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function n(e,t,o){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){s(n.response,t,o)},n.onerror=function(){console.error("could not download file")},n.send()}function a(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function l(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(n){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof o.g&&o.g.global===o.g?o.g:void 0,r=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!r?function(e,t,o){var r=i.URL||i.webkitURL,s=document.createElement("a");t=t||e.name||"download",s.download=t,s.rel="noopener","string"==typeof e?(s.href=e,s.origin===location.origin?l(s):a(s.href)?n(e,t,o):l(s,s.target="_blank")):(s.href=r.createObjectURL(e),setTimeout((function(){r.revokeObjectURL(s.href)}),4e4),setTimeout((function(){l(s)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,o,i){if(o=o||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,i),o);else if(a(e))n(e,o,i);else{var r=document.createElement("a");r.href=e,r.target="_blank",setTimeout((function(){l(r)}))}}:function(e,t,o,a){if(a=a||open("","_blank"),a&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof e)return n(e,t,o);var l="application/octet-stream"===e.type,s=/constructor/i.test(i.HTMLElement)||i.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||l&&s||r)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var e=d.result;e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=e:location=e,a=null},d.readAsDataURL(e)}else{var p=i.URL||i.webkitURL,u=p.createObjectURL(e);a?a.location=u:location.href=u,a=null,setTimeout((function(){p.revokeObjectURL(u)}),4e4)}});i.saveAs=s.saveAs=s,e.exports=s}))}}]);
//# sourceMappingURL=90.425d4393.js.map