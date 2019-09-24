<template>
  <div class="hello">
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <div class="logo-bg">
      <router-link :to="{ name: 'Dingyue'}" class="dingyue">订阅</router-link>
      <router-link :to="{ name: 'About'}" class="lianxibtn">关于我们</router-link>
      <img src="@/assets/img/Home/logobg.png" alt="">
      <h3 class="logos"><img src="@/assets/img/logo.png" alt=""></h3>
    </div>

    <div class="second-part">
      <div class="second-part-con">
        <div class="nav">
            <mt-button v-bind:class="{ tabbtn: isActiveone }" size="small" @click.native.prevent="active = 'tab-container1',changePlaceholder(`输入药品名称查询`)"><span>药品</span></mt-button>
            <mt-button v-bind:class="{ tabbtn: isActivetwo }" size="small" @click.native.prevent="active = 'tab-container2',changePlaceholder(`输入企业名称查询`)"><span>企业</span></mt-button>
            <mt-button size="small" @click="openDialog()"><span>领域检索</span></mt-button>
          </div>

          <div class="home-search">
            <ul>
              <li class="dadeyi"><input type="text" placeholder="输入药品名称查询" ref="inputSearch" id="inputSearch" autofocus="autofocus"></li>
              <li class="dadeer"><a href="javascript:void(0)" @click="toLibrary()"><img src="@/assets/img/Home/tp04.png" alt=""></a></li>
            </ul>
          </div>

          <div class="page-tab-container">
            <mt-tab-container class="page-tabbar-tab-container" v-model="active">
              <mt-tab-container-item id="tab-container1">
                <ul class="hot-ul">
                  <li v-for="hotDrug in hotDrugList"><a href="javascript:void(0)" @click="toLibrary(hotDrug)">{{ hotDrug }}</a></li>
                </ul>
              </mt-tab-container-item>
              <mt-tab-container-item id="tab-container2">
                <ul class="hot-ul">
                  <li v-for="hotCompany in hotCompanyList"><a href="javascript:void(0)" @click="toLibrary(hotCompany)">{{ hotCompany }}</a></li>
                </ul>
              </mt-tab-container-item>
            </mt-tab-container>
          </div>

      </div>

    </div>

    <Spacelist></Spacelist>

    <Navbar></Navbar>

    <Dialog></Dialog>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="pub_pop_con">
        <a class="close_pops" href="javascript:void(0)" @click="close_pop()">×</a>
        <h3>{{datatitle}}</h3>
        <p>{{datacon1}}</p>
        <p>{{datacon2}}</p>
        <p><a href="https://www.wjx.top/jq/25480946.aspx">申请试用</a></p>
      </div>
    </mt-popup>

  </div>

</template>

<script>
import bus from '../assets/js/event.js'
import Navbar from './Navbar'
import Dialog from './Dialog'
import Spacelist from './Spacelist'
import {ApiConfig} from '../assets/js/ApiConfig.js'
import {setCookie,getCookie,delCookie,setToken} from '../assets/js/util.js'
import { Indicator } from 'mint-ui';
export default {
  name: 'Home',
  components: {'Navbar':Navbar,'Dialog':Dialog,'Spacelist':Spacelist},
  data () {
    return {
      allowget:true,
      popupVisible:false,
      goLibrary:"Home",
      search_Type:"0",
      search_Con:"",
      msg: '首页',
      hotDrugList:[],
      hotCompanyList:[],
      GetKeywords_Drug:ApiConfig.Index.GetKeywords_Drug,
      GetKeywords_Company:ApiConfig.Index.GetKeywords_Company,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      active: 'tab-container1',
      isActiveone: true,
      isActivetwo: false,
      datatitle:"",
      datacon1:"",
      datacon2:"",
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
  mounted: function () {
    this.receive();
  },
  beforeUpdate: function () {},
  updated: function () {
    Indicator.close();
  },
  beforeDestroy: function () {},
  destroyed: function () {},
  beforeRouteEnter:function(to,from,next){
    to.meta.isBack = true
    // if(from.name=='Library'|| from.name=='List' || from.name=='Zgsb' || from.name=='Yzxpj' || from.name=='Appear' || from.name=='Sale' || from.name=='Ksfb' || from.name=='Clxx' || from.name=='Dingyue'|| from.name=='DingyueList' || from.name=='DingyueTs'){
    //   to.meta.isBack = true
    // }
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
      if(getCookie("token") == null){
        setCookie("token",setToken(16,16))
      }
      Indicator.open('加载中...');
      // 热门搜索词-药品
      this.$http.get(this.GetKeywords_Drug).then(response => {
        this.hotDrugList = response.body.Data;
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
      // 热门搜索词-企业
      this.$http.get(this.GetKeywords_Company).then(response => {
        this.hotCompanyList = response.body.Data;
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
    },
    toLibrary:function(somekey){
      if(somekey == undefined){
        somekey = this.$refs.inputSearch.value
        if(somekey.trim() != ""){
          var _this = this
          _this.$router.push({ name: 'Library', query: { search_Type:this.search_Type,search_Con:somekey }});
        }else{
          this.$toast('请输入药品/企业名称')
        }
      }else if(somekey != undefined && somekey != ""){
        var _this = this
        _this.$router.push({ name: 'Library', query: { search_Type:this.search_Type,search_Con:somekey }});
      }
    },
    changePlaceholder:function(plaWord){
      this.$refs.inputSearch.value = ""
      document.getElementById("inputSearch").setAttribute("placeholder",plaWord);
      if(plaWord == "输入企业名称查询"){
        this.isActiveone = false
        this.isActivetwo = true
        this.search_Type = "1"
      }else{
        this.isActiveone = true
        this.isActivetwo = false
        this.search_Type = "0"
      }
    },
    openDialog:function(){
      bus.$emit('openDialog')
    },
    receive:function(){
      bus.$on('openPub',(data)=>{
        this.datatitle = data.datatitle
        this.datacon1 = data.datacon1
        this.datacon2 = data.datacon2
        this.popupVisible = true
      })
    },
    close_pop:function(){
      this.popupVisible = false
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {font-weight: normal;}
ul {list-style-type: none;padding: 0;}
li {display: inline-block;}
a {color: #42b983;}
.nav{margin-top: .5rem;}
.nav span{font-size: 1rem!important;}
.hello{background: #F6F7F5;}

.logo-bg {width:100%;position: relative;}
.logo-bg img{width:100%;}
.logos{position: absolute;top:0;right:0;bottom:0;left:0;margin-top: 2.7rem;}
.logos img{width:10rem;margin-left: -.8rem;}

.second-part{max-width:768px;width:100%;position: absolute;}
.second-part-con{background: #fff;box-shadow: 0 6px 14px 0 rgba(0,0,0,0.08);width:96%;margin:0 auto;margin-top: -4.5rem;padding-top: .125rem;}

.mint-button--default{-webkit-box-shadow: 0 0 0 0;-moz-box-shadow: 0 0 0 0;box-shadow: 0 0 0 0;background: transparent;border-radius:0;}

.tabbtn{color:#494949;}
.tabbtn span{border-bottom: 2px solid #00ABD6;padding:0 0 3px;}
.mint-button::after{background-color: transparent;}

.home-search ul{width:90%;margin:auto;-webkit-margin-after: .3rem;-webkit-margin-before: .5rem;overflow: hidden;}
.home-search ul li:nth-child(1){width:88%;float: left;overflow: hidden;}
.home-search ul li:nth-child(2){width:12%;float: right;overflow: hidden;}
.home-search ul li input{width: 78%;font-size:.875rem;background: #F2F3F5;border-radius: 42px;border: none;padding:.625rem 3rem .625rem .625rem;outline:none;}
.home-search ul li a{background: transparent;border: none;outline: none;}
.home-search ul li a img{width:2.1875rem;margin-top: .25rem;}

.hot-ul{margin:-.3rem 0 1rem 2rem;text-align: left;-webkit-margin-after: 1.5rem;}
.hot-ul li{font-size: .75rem;color: #8C9696;margin-right: .75rem;}
.hot-ul li a{color: #8C9696;text-decoration: none;}

.mint-popup{width:85%;}
.pub_pop_con{padding:0 1rem 1rem 1rem;}
.pub_pop_con h3{font-size: .875rem;color: #1D1D1D;-webkit-margin-after: 1rem;-webkit-margin-before: 1rem;}
.pub_pop_con p{font-size: .875rem;color: #1D1D1D;text-align: left;-webkit-margin-after: .5rem;-webkit-margin-before: .5rem;}
.pub_pop_con p a{font-size: .8125rem;text-decoration:none;color: #00BEEE;}
.pub_pop_con p a:nth-child(2){margin-left: 2rem;}
.pub_pop_con p:nth-last-child(1){text-align: right;}
.pub_pop_con p:nth-last-child(1) a{font-size: .9375rem;color: #00BEEE;}
.close_pops{float: right;margin:-1rem -.5rem;color: #A8A8A8;text-decoration: none;font-size: 1.5rem;}


.dingyue{position: absolute;top:.7rem;left:.7rem;text-decoration: none;color: #fff;}
.lianxibtn{position: absolute;top:.7rem;right:.7rem;text-decoration: none;color: #fff;}

.mint-swipe-indicator.is-active{background: #00ABD6!important;opacity: 0.7;}

@media screen and (min-width:414px){
  .logos{margin-top: 3.5rem}
  .home-search ul li a img{width:2.1875rem;margin-top: .2rem;}
}

@media screen and (min-width:376px)and (max-width:413px){
  .logos{margin-top: 3.5rem}
  .home-search ul li a img{width:2.1875rem;margin-top: -.005rem;}
}

</style>
