<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="中国销售">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>
    <div class="logo-bg">
      <p><img src="@/assets/img/Home/logobg1.png" alt=""></p>
      <div class="sale-search">
        <p><img src="@/assets/img/logo.png" alt=""></p>
        <ul>
          <li><input type="text" placeholder="输入药品/企业名称查询" ref="inputSearch" ></li>
          <li><a href="javascript:void(0)" @click="toList()"><img src="@/assets/img/Appear/search.png" alt=""></a></li>
        </ul>
        <p class="hot-con"><a href="javascript:void(0)" v-for="hotkey in hotkeys" @click="toList(hotkey)">{{hotkey}}</a><a href="javascript:void(0)" @click="openDialog()">领域检索</a></p>
      </div>
    </div>

    <div class="list_title">
      <ul>
        <li><img src="@/assets/img/Library/jb.png" alt=""><span>{{sales_title}}</span>&nbsp;&nbsp;<span>TOP50</span></li>
        <li @click="open_pop()"><img src="@/assets/img/Library/eye.png" alt=""><span>查看详细数据>></span></li>
      </ul>
    </div>

    <div class="list_content">
      <p class="add-small">样本医院用药2018Q1通用名销售额排行榜</p>
      <ul>
        <li v-for="(value,index) in sales_list"><span>{{index+1}}</span><span>{{value.yptongyongming}}</span><span>{{value.qymingcheng}}</span></li>
      </ul>
    </div>

    <mt-popup v-model="popupVisibles" position="top" popup-transition="popup-fade" style="height:100%;">
      <div class="overlayer"  @touchmove.prevent>
        <div class="popup">
          <h3>治疗领域检索</h3>
          <p>
            <button @click="show_ATC()" v-bind:class="{ change_hover: hide_Content }">ATC</button>
            <b>|</b>
            <button @click="show_PHIIC()" v-bind:class="{ change_hover: show_Content }">CPHIIC</button>
          </p>
          <ul v-bind:class="{ show_hide_Dialog: show_Content }">
            <li>
              <label for="">ATC一级</label>
              <select name="" ref="ATC_ONE" id="ATC_ONE" @change="get_ATC_one()">
                <option value="">请选择</option>
                <option v-bind:value="index" v-for="(datademo,index) in ATC_List1">{{datademo.name}}</option>
              </select>
            </li>
            <li>
              <label for="">ATC二级</label>
              <select name="" ref="ATC_TWO" id="ATC_TWO" @change="get_ATC_two()">
                <option value="">请选择</option>
                <option v-bind:value="index" v-for="(datademo,index) in ATC_List2">{{datademo.name}}</option>
              </select>
            </li>
            <li>
              <label for="">ATC三级</label>
              <select name="" ref="ATC_THREE" id="ATC_THREE" @change="get_ATC_three()">
                <option value="">请选择</option>
                <option v-bind:value="index" v-for="(datademo,index) in ATC_List3">{{datademo.name}}</option>
              </select>
            </li>
            <li>
              <label for="">ATC四级</label>
              <select name="" ref="ATC_FOUR" id="ATC_FOUR">
                <option value="">请选择</option>
                <option v-bind:value="index" v-for="(datademo,index) in ATC_List4">{{datademo.name}}</option>
              </select>
            </li>
            <p class="end_btn">
              <button @click="resetone()">重置</button>
              <button @click="areasearchone()">搜索</button>
            </p>
          </ul>
          <ul v-bind:class="{ show_hide_Dialog: hide_Content }">
            <li>
              <label for="">治疗大类</label>
              <select name="" ref="ZLDL" id="ZLDL" @change="get_PHIIC_one()">
                <option value="">请选择</option>
                <option v-bind:value="index" v-for="(shuju,index) in PHIIC_List1">{{shuju.name}}</option>
              </select>
            </li>
            <li>
              <label for="">治疗小类</label>
              <select name="" ref="ZLXL" id="ZLXL">
                <option value="">请选择</option>
                <option v-bind:value="index" v-for="(shuju,index) in PHIIC_List2">{{shuju.name}}</option>
              </select>
            </li>
            <p class="end_btn">
              <button @click="resettwo()">重置</button>
              <button @click="areasearchtwo()">搜索</button>
            </p>
          </ul>

        </div>
      </div>
    </mt-popup>

    <mt-popup v-model="popupVisible" position="center" popup-transition="popup-fade" style="width:85%;margin:auto;">
      <div class="pub_pop_con">
        <a class="close_pops" href="javascript:void(0)" @click="close_pop()">×</a>
        <h3>提示</h3>
        <p>查看更多数据，请联系</p>
        <p><a href="tel:021-62477965">021-62477965</a><a href="tel:021-62474272">021-62474272</a></p>
        <p>或直接点击下方按钮申请试用，我们会尽快联系您</p>
        <p><a href="https://www.wjx.top/jq/25480946.aspx">申请试用</a></p>
      </div>
    </mt-popup>

    <div class="backHome">
      <router-link to="/"><img src="@/assets/img/Home/home.png" alt=""></router-link>
    </div>

  </div>
</template>

<script>
import {ApiConfig} from '../assets/js/ApiConfig.js'
import {setCookie,getCookie,delCookie,setToken} from '../assets/js/util.js'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  name: 'Sale',
  data () {
    return {
      allowget:true,
      backbtn:true,
      popupVisibles:false,
      popupVisible:false,
      GetRank:ApiConfig.Sales.GetRank,
      GetKeywords:ApiConfig.Sales.GetKeywords,
      GetATCInfo:ApiConfig.Sales.GetATCInfo,
      GetCPHIICInfo:ApiConfig.Sales.GetCPHIICInfo,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      sales_title:"",
      sales_list:[],
      hotkeys:[],
      ATC_List1:[],
      ATC_List2:[],
      ATC_List3:[],
      ATC_List4:[],
      PHIIC_List1:[],
      PHIIC_List2:[],
      show_Content: false,
      hide_Content: true,
      ATC1:"",
      ATC2:"",
      ATC3:"",
      ATC4:"",
    }
  },
  beforeCreate: function () {},
  created: function () {
    //this.checkAuth();
    this.pubgetdata();
    this.getshare();
    this.allowget = false;
  },
  beforeMount: function () {},
  mounted: function () {},
  beforeUpdate: function () {},
  updated: function () {
    Indicator.close();
  },
  beforeDestroy: function () {},
  destroyed: function () {},
  beforeRouteEnter:function(to,from,next){
    if(from.name=='List' || from.name=='Chart'){
      to.meta.isBack = true
    }
    next()
  },
  activated:function(){
    if(!this.$route.meta.isBack){
      //this.checkAuth();
      this.pubgetdata();
      this.getshare();
    }
    this.$route.meta.isBack ? Indicator.close() : Indicator.open('加载中...')
    this.$route.meta.isBack=false
  },
  methods: {
    getshare:function(){
      var aurl = location.href
      this.$http.get(this.getWechatJsInfo,{params:{url:aurl}},{emulateJSON: true}).then(response => {
        if (response.body.ResultType == 1) {
          var info = response.body.Data;
          var shareImg = encodeURI(document.querySelector(".share-img").nodeName.toLowerCase() === "div" ? document.querySelector(".share-img").querySelector("img").src : document.querySelector(".share-img").src);
          wx.config({
            debug: false,
            appId: info.appID,
            timestamp: info.timestamp,
            nonceStr: info.nonceStr,
            signature: info.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
          });
          wx.ready(function () {
            wx.onMenuShareTimeline({
              title: '药分享',
              link: "http://www.cphiic.com/dds/",
              imgUrl: shareImg,
              success: function () {

              }
            });
            wx.onMenuShareAppMessage({
              title: '药分享',
              desc: '一个整合了研发、生产、市场等多环节的医药综合性数据平台',
              link: "http://www.cphiic.com/dds/",
              imgUrl: shareImg,
              type: 'link',
              dataUrl: '',
              success: function () {

              }
            });
          });
          // wx.error(function (res) {
          //   console.log(wx.error);
          // });
          //
          // wx.checkJsApi({
          //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
          //   success: function (res) {
          //     console.log(res);
          //   }
          // });
          // return;
        }
      }, response => {
        this.$toast('加载失败！')
      });
    },
    checkAuth:function(){
      if(getCookie("token") == null){
        setCookie("token",setToken(16,16))
      }
      if(this.$route.query.code == undefined || this.$route.query.code == ""){
        this.$http.post(this.CheckWechatAuth,{token:getCookie("token")},{emulateJSON: true}).then(response => {
          if(response.body.ResultType == 1){
            this.pubgetdata();
          }else{
            var appid = response.body.Data.appID
            var redirect_uri = encodeURIComponent(window.location.origin + window.location.pathname + decodeURI(window.location.search))
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=abcde#wechat_redirect`
          }
        }, response => {
          this.$toast('加载失败！')
        });
      }else{
        if(this.allowget == true){
          this.$http.post(this.doWechatAuth,{token:getCookie("token"),code:this.$route.query.code},{emulateJSON: true}).then(response => {
            if(response.body.ResultType == 1){
              this.pubgetdata();
            }else{
              this.$toast(response.body.Message)
            }
          }, response => {
            this.$toast('加载失败！')
          });
        }
      }
    },
    pubgetdata:function(){
      Indicator.open('加载中...');
      this.$http.get(this.GetRank).then(response => {
        this.sales_title = response.body.Data.title;
        this.sales_list = response.body.Data.list;
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
      this.$http.get(this.GetKeywords).then(response => {
        this.hotkeys = response.body.Data;
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
      // ATC分类取得
      this.$http.get(this.GetATCInfo).then(response => {
        this.ATC_List1 = response.body.Data;
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
      // PHIIC分类取得
      this.$http.get(this.GetCPHIICInfo).then(response => {
        this.PHIIC_List1 = response.body.Data;
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
    },
    toList:function(somekey){
      if(somekey == undefined){
        somekey = this.$refs.inputSearch.value
        if(somekey.trim() != ""){
          var _this = this
          _this.$router.push({ name: 'List', query: { search_Type:-1,search_Con:somekey }});
        }else{
          this.$toast('请输入药品/企业名称')
        }
      }else if(somekey != undefined && somekey != ""){
        var _this = this
        _this.$router.push({ name: 'List', query: { search_Type:-1,search_Con:somekey }});
      }
    },
    openDialog:function() {
      this.popupVisibles = true
    },
    closeDialog:function(){
      this.popupVisibles = false
    },
    resetone:function(){
      this.$refs.ATC_ONE.value = ""
      this.$refs.ATC_TWO.value = ""
      this.$refs.ATC_THREE.value = ""
      this.$refs.ATC_FOUR.value = ""
      this.ATC_List2 = [];
      this.ATC_List3 = [];
      this.ATC_List4 = [];
    },
    resettwo:function(){
      this.$refs.ZLDL.value = ""
      this.$refs.ZLXL.value = ""
      this.PHIIC_List2 = [];
    },
    areasearchone:function(){
      if(this.$refs.ATC_ONE.value != ""){
        var ATCS1 = this.$refs.ATC_ONE.value==""?"":this.ATC_List1[this.$refs.ATC_ONE.value].name
        var ATCS2 = this.$refs.ATC_TWO.value==""?"":this.ATC_List2[this.$refs.ATC_TWO.value].name
        var ATCS3 = this.$refs.ATC_THREE.value==""?"":this.ATC_List3[this.$refs.ATC_THREE.value].name
        var ATCS4 = this.$refs.ATC_FOUR.value==""?"":this.ATC_List4[this.$refs.ATC_FOUR.value].name
        var _this = this
        _this.$router.push({name: 'Chart', query: { search_Type:2,ATC1:ATCS1,ATC2:ATCS2,ATC3:ATCS3,ATC4:ATCS4}});
      }else{
        //this.$toast('ATC一级是必选项！')
        MessageBox('提示', 'ATC一级是必选项！');
      }
    },
    areasearchtwo:function(){
      if(this.$refs.ZLDL.value != ""){
        var PHIIC1 = this.$refs.ZLDL.value==""?"":this.PHIIC_List1[this.$refs.ZLDL.value].name
        var PHIIC2 = this.$refs.ZLXL.value==""?"":this.PHIIC_List2[this.$refs.ZLXL.value].name
        var _this = this
        _this.$router.push({name: 'Chart', query: { search_Type:3,zldl:PHIIC1,zlxl:PHIIC2}});
      }else{
        //this.$toast('治疗大类是必选项！')
        MessageBox('提示', '治疗大类是必选项！');
      }
    },
    show_ATC:function(){
      this.show_Content = false
      this.hide_Content = true
    },
    show_PHIIC:function(){
      this.show_Content = true
      this.hide_Content = false
    },
    get_ATC_one:function(){
      this.ATC_List4 = [];
      this.$refs.ATC_FOUR.value = "";
      this.ATC_List3 = [];
      this.$refs.ATC_THREE.value = "";
      this.ATC_List2 = [];
      this.$refs.ATC_TWO.value = "";
      const index1 = this.$refs.ATC_ONE.value;
      if(index1 != ''){
        this.ATC_List2 = this.ATC_List1[index1].data;
      }
    },
    get_ATC_two:function(){
      this.ATC_List4 = [];
      this.$refs.ATC_FOUR.value = "";
      this.ATC_List3 = [];
      this.$refs.ATC_THREE.value = "";
      const index2 = this.$refs.ATC_TWO.value;
      if(index2 != ''){
        this.ATC_List3 = this.ATC_List2[index2].data;
      }
    },
    get_ATC_three:function(){
      this.ATC_List4 = [];
      this.$refs.ATC_FOUR.value = "";
      const index3 = this.$refs.ATC_THREE.value;
      if(index3 != '' && index3<=this.ATC_List3.length){
        this.ATC_List4 = this.ATC_List3[index3].data;
      }
    },
    get_PHIIC_one:function(){
      this.PHIIC_List2 = [];
      this.$refs.ZLXL.value = "";
      const index1 = this.$refs.ZLDL.value;
      if(index1 != ''){
        this.PHIIC_List2 = this.PHIIC_List1[index1].data;
      }
    },
    open_pop:function(){
      this.popupVisible = true
    },
    close_pop:function(){
      this.popupVisible = false
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-header.is-fixed{max-width: 768px;margin: auto;}

.logo-bg{position: fixed;margin-top: 2.5rem;}
.logo-bg p{-webkit-margin-before: 0;-webkit-margin-after: 0;}
.logo-bg p img{width:100%;display: block;}
.sale-search{position: absolute;top:0;right:0;bottom:0;left:0;margin-top: 1rem;}
.sale-search ul{width:90%;margin:auto;overflow: hidden;-webkit-margin-after: .3rem;-webkit-margin-before: 2rem;-webkit-margin-after: .2rem;-webkit-padding-start: 0;}
.sale-search ul li:nth-child(1){width:88%;float: left;overflow: hidden;}
.sale-search ul li:nth-child(2){width:12%;float: right;overflow: hidden;}
.sale-search ul li{list-style-type: none;}
.sale-search ul li input{width:80%;font-size:.875rem;background: #F2F3F5;border-radius: 42px;border: none;padding:.625rem 3rem .625rem .625rem;outline:none;}
.sale-search ul li a{background: transparent;border: none;outline: none;}
.sale-search ul li a img{width:2.1875rem;margin-top: .25rem;}

.sale-search p:nth-child(1){width:10rem;margin:0 auto;}
.sale-search p:nth-child(1) img{width:10rem;margin-left: -.4rem;}

.hot-con{width:86%;margin:0 auto;text-align: left;display: inherit;text-align: left;}
.hot-con a:nth-child(1),.hot-con a:nth-child(2),.hot-con a:nth-child(3),.hot-con a:nth-child(4){padding:0 .625rem 0 0;color: #93E9FF;font-size: .75rem;text-decoration: none;}
.hot-con a:last-child{text-align: right;font-size: .875rem;color: #FFFFFF;text-decoration: underline;}
.list_title{position:fixed;top:14rem;width:100%;background: #fff;height: 2.875rem;line-height: 2.875rem;}
.list_title ul{-webkit-padding-start: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
.list_title ul li{list-style-type: none;display: inline-block;font-size: 1rem;color: #33363A;}
.list_title ul li:nth-child(1){margin-left: 1rem;}
.list_title ul li:nth-child(1) img{width:.9375rem;margin: 0 .5rem 0 .5rem;}
.list_title ul li:nth-child(1) span:nth-child(1){font-size: 1rem;margin-right: .5rem;}
.list_title ul li:nth-child(2){margin-right: 1rem;}
.list_title ul li:nth-child(2) img{width: .625rem;margin-right: .175rem;}
.list_title ul li:nth-child(2) span{font-size: .75rem;color: #31363B;}

.list_content{position: absolute;top:17rem;z-index: -1;width:100%;}
.list_content ul{-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.list_content ul li{list-style-type: none;display: flex;padding:.3rem;font-size: .875rem;}
.list_content ul li span:nth-child(1){text-align: center;margin:.5rem 1rem 1rem 1rem;}
.list_content ul li span:nth-child(2){width:35%;text-align: left;padding: .5rem 0 1rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color:#151800;border-bottom: .0625rem solid #DDE0E6;}
.list_content ul li span:nth-child(3){width:53%;text-align: left;padding: .5rem 0 1rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-indent: .75rem;color:#151800;border-bottom: .0625rem solid #DDE0E6;}
.list_content ul li:nth-child(1) span:nth-child(1){color:#5974EC;font-size: 1rem;border-bottom:1px solid #5974EC;}
.list_content ul li:nth-child(2) span:nth-child(1){color:#1FB3E0;border-bottom:1px solid #1FB3E0;}
.list_content ul li:nth-child(3) span:nth-child(1){color:#38D6EF;border-bottom:1px solid #38D6EF;}

.add-small{-webkit-margin-before: .5em;-webkit-margin-after: .5em;font-size: .75rem;}

.mint-popup{width:86%;margin-left:7%;background: #fff;}
.overlayer{position:absolute;left:0;top:0;width:100%;height:100%;}

.popup ul li{display: flex;margin-bottom: 1rem;}
.popup ul li label{width:26%;font-size: .875rem;color: #494949;margin:0 .625rem 0 0;line-height: 1.875rem;}
.popup ul li select{width:67%;height:1.875rem;background:#F2F3F5;border:none;background-color:F2F3F5; border-color:transparent;-webkit-appearance: none;}

.show_hide_Dialog{display: none;}
.popup h3{font-size: 1rem;color: #33363A;    font-weight: normal;text-align: left;padding: 0 0 0 1rem;}
.popup p button{border:none;background: transparent;outline: none;font-size: 1rem;}
.change_hover{color:#00ABD6;}
.popup p b{color: #F2F3F5;}
.end_btn {width:100%;padding-top: 1rem;}
.end_btn button{width:40%;height:2.1875rem;margin:0 .5rem 0 .5rem;}
.end_btn button:nth-child(1){background: #fff;border:1px solid #F2F2F4;border-radius: 0;color: #33363A;font-size: 1rem;}
.end_btn button:nth-child(2){background: #00ABD6;border:1px solid #00ABD6;border-radius: 0;color:#fff;font-size: 1rem;}


.pub_pop_con{padding:0 1rem 1rem 1rem;}
.pub_pop_con h3{font-size: .875rem;color: #1D1D1D;-webkit-margin-after: 1rem;-webkit-margin-before: 1rem;}
.pub_pop_con p{font-size: .875rem;color: #1D1D1D;text-align: left;-webkit-margin-after: .5rem;-webkit-margin-before: .5rem;}
.pub_pop_con p a{font-size: .8125rem;text-decoration:none;color: #00BEEE;}
.pub_pop_con p a:nth-child(2){margin-left: 2rem;}
.pub_pop_con p:nth-last-child(1){text-align: right;}
.pub_pop_con p:nth-last-child(1) a{font-size: .9375rem;color: #00BEEE;}
.close_pops{float: right;margin:-.5rem -.25rem;color: #A8A8A8;text-decoration: none;}

@media screen and (min-width:414px){
  .sale-search ul li a img{width:2.1875rem;margin-top: .2rem;}
}

@media screen and (min-width:376px)and (max-width:413px){
  .sale-search ul li a img{width:2.1875rem;margin-top: -.005rem;}
}

</style>
