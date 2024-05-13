"use strict";(self["webpackChunkyian"]=self["webpackChunkyian"]||[]).push([[593],{34612:function(e,t,s){s.r(t),s.d(t,{default:function(){return P}});var a=function(){var e=this,t=e._self._c;return t("layout",{attrs:{"is-show-left":!1}},[t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{slot:"right","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(10, 38, 63,0.6)","element-loading-custom-class":"loading-icon"},slot:"right"},[t("proxy-table",{ref:"proxyTable",attrs:{operations:e.operations,columns:e.columns,operationWidth:"200px","table-btns":e.tableBtns,"table-data":e.tableData,"diy-has-check-box":e.diyHasCheckBox},on:{add:e.handleAdd,edit:e.handleEdit,show:e.handleShow,remove:e.handleRemove,delete:e.handleDelete,select:e.handleSelect}}),e.isShowAddEdit?t("add-edit",{ref:"addEdit",on:{close:e.closeFn}}):e._e()],1)])},r=[],l=s(14518),o=function(){var e=this,t=e._self._c;return t("proxy-dialog",{ref:"dialog",attrs:{visible:e.isShowDialog,"is-show-footer":"show"!==e.type},on:{"update:visible":function(t){e.isShowDialog=t},close:e.handleClose}},[t("div",{staticClass:"dialog-form"},[t("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,size:"small","label-width":"auto"}},[t("el-row",{attrs:{type:"flex",justify:"space-around",gutter:50}},[t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"姓名",prop:"name",title:e.ruleForm.name}},[t("el-input",{attrs:{disabled:e.disabled,clearable:"",placeholder:"请输入"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1),t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"账号",prop:"account",title:e.ruleForm.account}},[t("el-input",{attrs:{disabled:e.disabled,clearable:"",placeholder:"请输入"},model:{value:e.ruleForm.account,callback:function(t){e.$set(e.ruleForm,"account",t)},expression:"ruleForm.account"}})],1)],1)],1),t("el-row",{attrs:{type:"flex",justify:"space-around",gutter:50}},[t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{autocomplete:"new-password",type:"password","show-password":"",disabled:e.disabled,clearable:"",placeholder:"请输入"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1)],1),t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"确认密码",prop:"confirmPassword"}},[t("el-input",{attrs:{type:"password",autocomplete:"new-password",disabled:e.disabled,clearable:"",placeholder:"请输入","show-password":""},model:{value:e.ruleForm.confirmPassword,callback:function(t){e.$set(e.ruleForm,"confirmPassword",t)},expression:"ruleForm.confirmPassword"}})],1)],1)],1),t("el-row",{attrs:{type:"flex",justify:"space-around",gutter:50}},[t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"状态",prop:"status"}},[t("proxySelect",{attrs:{disabled:e.disabled,options:e.accountStatusOptions,clearable:""},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}})],1)],1),t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"邮箱",prop:"email",title:e.ruleForm.email}},[t("el-input",{attrs:{disabled:e.disabled,clearable:"",placeholder:"请输入"},model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1)],1)],1),t("el-row",{attrs:{type:"flex",justify:"space-around",gutter:50}},[t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"是否超管",prop:"isAdmin"}},[t("proxySelect",{attrs:{disabled:e.disabled,options:e.yesOrNo,clearable:""},model:{value:e.ruleForm.isAdmin,callback:function(t){e.$set(e.ruleForm,"isAdmin",t)},expression:"ruleForm.isAdmin"}})],1)],1),t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{label:"类型",prop:"type"}},[t("proxySelect",{attrs:{disabled:e.disabled,options:e.typeOptions,clearable:""},model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}})],1)],1)],1)],1)],1),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.handleSave}},[e._v("保存")])],1)])},i=[],n=s(74353),d=s.n(n),c=s(1315),u=s.n(c),m=s(95353),p=s(27421),h=s.n(p),g=s(63526),b=s(88604),f=s(3972),y=s(43172);const w=u().Random;var F={name:"add-edit",components:{proxyDialog:b.A,proxySelect:f.A},data(){return{encryptionKey:g.rs,decryptKey:g.$Q,type:"add",ruleForm:{isAdmin:""},rules:{name:[{required:!0,message:"请输入",trigger:"blur"}],account:[{required:!0,message:"请输入",trigger:"blur"}],password:[{required:!0,message:"请输入",trigger:"blur"}],confirmPassword:[{required:!0,message:"请输入",trigger:"blur"}],status:[{required:!0,message:"请选择",trigger:"change"}],isAdmin:[{required:!0,message:"请选择",trigger:"change"}],type:[{required:!0,message:"请选择",trigger:"change"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]},typeOptions:y.xW,accountStatusOptions:y.uU,yesOrNo:y.GX,disabled:!1,isShowDialog:!1}},props:{},watch:{},computed:{...(0,m.L8)(["personalMsg"])},mounted(){},methods:{encrypt(e){const t=new(h());return t.setPublicKey(this.encryptionKey),t.encrypt(e)},decrypt(e){const t=new(h());return t.setPrivateKey(this.decryptKey),t.decrypt(e)},async getInfo(e){const{type:t,id:s}=e;if(console.log("Random.guid()",w.guid()),this.isShowDialog=!0,this.type=t,this.disabled="show"===t,"add"===t)return this.$set(this.ruleForm,"isAdmin","0"),this.$set(this.ruleForm,"status","启用"),!1;const a=await l.A.userDetail({id:s}),{code:r,data:o,msg:i}=a;if(200===r){this.ruleForm=o;const{confirmPassword:e,password:t}=this.ruleForm;this.ruleForm.password=t?this.decrypt(t):t,this.ruleForm.confirmPassword=e?this.decrypt(e):e}else this.$message.error(i)},handleClose(){this.isShowDialog=!1,this.$emit("close")},handleSave(){try{this.$refs.ruleForm.validate((async e=>{if(e){let e={};const{confirmPassword:t,password:s}=this.ruleForm;e="add"===this.type?{...this.ruleForm,id:w.guid(),creatDate:d()().format("YYYY-MM-DD HH:mm:ss"),creator:this.personalMsg.username,password:this.encrypt(s),confirmPassword:this.encrypt(t)}:{...this.ruleForm,password:this.encrypt(s),confirmPassword:this.encrypt(t)};const a=await l.A["add"===this.type?"userSave":"userUpdate"](e),{code:r,msg:o}=a;200===r?(this.$message.success(o),this.$emit("close",!0)):this.$message.error(o)}}))}catch(e){console.log(e)}}}},v=F,x=s(81656),$=(0,x.A)(v,o,i,!1,null,"650313ce",null),A=$.exports,D=s(25567),S=s(4901),k={name:"index",components:{addEdit:A,proxyTable:D.A},data(){return{loading:!1,isShowAddEdit:!1,tableData:[],selections:[],tableBtns:[{label:"查看",value:"show"},{label:"编辑",value:"edit"},{label:"删除",value:"delete"}],operations:[{value:"add",label:"新增"},{value:"remove",label:"删除"}],columns:[{prop:"name",label:"姓名"},{prop:"account",label:"账号"},{prop:"type",label:"类型"},{prop:"email",label:"邮箱"},{prop:"status",label:"状态"},{prop:"creator",label:"创建者"},{prop:"creatDate",label:"创建时间"}]}},mounted(){this.$nextTick((()=>{this.getList()}))},methods:{async getList(){this.loading=!0;const e=await l.A.userList(),{code:t,data:s,msg:a}=e;200===t?(this.tableData=s.list||[],this.tableData.sort(S.jL)):this.$message.error(a),this.loading=!1},handleAdd(){this.isShowAddEdit=!0,this.$nextTick((()=>{this.$refs.addEdit.getInfo({type:"add"})}))},handleEdit(e){this.handleDetail({type:"edit",id:e.id})},handleDetail(e){this.isShowAddEdit=!0,this.$nextTick((()=>{this.$refs.addEdit.getInfo(e)}))},handleShow(e){this.handleDetail({type:"show",id:e.id})},handleDelete(e){if("1"===e.isAdmin)return this.$message.info("该条数据不可删除"),!1;this.$confirm("确定删除该条数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((async()=>{this.loading=!0;const t=await l.A.userDelete({id:e.id});200===t.code?(this.$message.success(t.msg),this.$nextTick((()=>{this.getList()}))):this.$message.error(t.msg),this.loading=!1})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))},handleSelect(e){this.selections=e},diyHasCheckBox(e,t){return"1"!==e.isAdmin},handleRemove(){const e=this.selections.map((e=>e.id));if(0===e.length)return this.$message.error("请选择数据！"),!1;this.$confirm("确定删除所选数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((async()=>{this.loading=!0;const t=await l.A.userBatchDelete({ids:e});200===t.code?(this.$message.success(t.msg),this.$nextTick((()=>{this.getList()}))):this.$message.error(t.msg),this.loading=!1})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))},closeFn(e){this.isShowAddEdit=!1,e&&this.getList()}}},C=k,E=(0,x.A)(C,a,r,!1,null,"4a1a3a77",null),P=E.exports},43172:function(e,t,s){s.d(t,{GX:function(){return l},uU:function(){return r},xW:function(){return a}});const a=[{value:"超管",label:"超管",id:"EeFDC299-f42b-8cc7-1bfB-dF189C655661"},{value:"用户",label:"用户",id:"C82CB616-1173-2eA6-4dD1-b92EfF2406eb"},{value:"访客",label:"访客",id:"E59Dcfb1-0d6b-11C2-F884-6FC26e9815C3"}],r=[{value:"启用",label:"启用"},{value:"禁用",label:"禁用"}],l=[{value:"1",label:"是"},{value:"0",label:"否"}]}}]);
//# sourceMappingURL=593.ba2414ef.js.map