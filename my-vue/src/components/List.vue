<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="中国销售">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>
    <div class="section_one">
      <div class="top-tip">关键词“{{biaoti}}”，共 <span>{{total}}</span> 条结果</div>
      <div class="top-tab">
        <ul >
          <li v-for="item in Totaldatas" v-bind:class="{ tabhover: item.isActive }" @click="changeList(item.type)">
            <a href="javascript:void(0)" >{{item.tabname}}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="section_two">
      <mt-index-list>
        <mt-index-section :key="str.id" ref="" v-for="str in List" :index="str.first">
          <mt-cell :key="name.id" ref="" v-for="name in str.list" :title="name" :to="{ name: 'Chart', query: { search_Type:itemtype,search_Con:name }}"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>

    <div v-bind:class="{ condition: iscondition }">
      <div class="null_con">
        <h3><img src="@/assets/img/Null/none.png" alt=""></h3>
        <p>暂未找到相关内容，换个搜索条件试试</p>
      </div>
    </div>

    <div class="backHome">
      <router-link to="/"><img src="@/assets/img/Home/home.png" alt=""></router-link>
    </div>

  </div>
</template>

<script>
import {ApiConfig} from '../assets/js/ApiConfig.js'
import {setCookie,getCookie,delCookie,setToken} from '../assets/js/util.js'
import { Indicator } from 'mint-ui';
export default {
  name: 'List',
  data () {
    return {
      allowget:true,
      backbtn:true,
      iscondition:true,
      total:"",
      GetTotalInfo:ApiConfig.Sales.GetTotalInfo,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      List:[],
      Totaldata:[],
      Totaldatas:[],
      search_Type:"",
      itemtype:0,
      biaoti:"",
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
  mounted:function(){},
  beforeUpdate: function () {},
  updated: function () {
    document.getElementsByClassName('mint-indexlist-content')[0].style.height = (window.screen.height - document.getElementsByClassName('mint-header')[0].offsetHeight - document.getElementsByClassName('section_one')[0].offsetHeight - 110)+"px"
    Indicator.close();
  },
  beforeDestroy: function () {},
  destroyed: function () {},
  beforeRouteEnter:function(to,from,next){
    if(from.name == 'Chart'){
      to.meta.isBack = true
    }
    next()
  },
  activated:function(){
    if(!this.$route.meta.isBack){
      document.getElementsByClassName('mint-indexlist-content')[0].style.height = (window.screen.height - document.getElementsByClassName('mint-header')[0].offsetHeight - document.getElementsByClassName('section_one')[0].offsetHeight - 110)+"px"
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
      this.total = "";
      this.List = [];
      this.biaoti = this.$route.query.search_Con
      var types = this.$route.query.search_Type
      var sned_Con = this.$route.query.search_Con
      this.$http.post(this.GetTotalInfo,{type:types,keywords:sned_Con,token:getCookie("token")},{emulateJSON: true}).then(response => {
        var data = response.body.Data;
        if (data.length==0){
          Indicator.close();
          this.iscondition = false
        }else{
          this.iscondition = true

          for (var i=0;i<data.length;i++){
            if (data[i].type==0){
              data[i].tabname="药品";
              data[i].isActive = false;
            }
            if (data[i].type==1){
              data[i].tabname="企业";
              data[i].isActive = false;
            }
            if (i==0){
              data[i].isActive = true;
            }
          }
          data[0].isActive=true;
          this.Totaldatas = data;
          this.changeList(data[0].type);
          Indicator.close();
          console.log(data)
        }
      }, response => {
        this.$toast('加载失败！')
      });
      this.search_Type = this.$route.query.search_Type
    },
    changeList:function(type){
      this.itemtype = type
      for (var i=0;i<this.Totaldatas.length;i++){
        this.Totaldatas[i].isActive = false;
        if (this.Totaldatas[i].type==type){
          this.Totaldatas[i].isActive = true;
          this.List = this.Totaldatas[i].list;
          this.total = this.Totaldatas[i].total;
        }
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-tab ul li a{color:#5C5E5F;text-decoration: none;}
.tabhover a{border-bottom: 2px solid #00BEEE;color:#0F0F0F;padding:0 1.5rem .5rem 1.5rem;}

.section_one{position: fixed;top:2.5rem;width:100%;z-index: 3;}
.section_two{margin-top: 7rem;height:100%;}

.top-tip{width:100%;padding:.5rem 0 .5rem;background: #F5F7F9;font-size: .75rem;color: #B6BABE;}
.top-tip span{color: #00B1E0;}
.top-tab{width:100%;background: #fff;border-bottom: .0625rem solid #F1F3F5;height:2.5rem;}
.top-tab ul{-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
.top-tab ul li{width:100%;list-style-type: none;line-height: 2.5rem;color: #5C5E5F;font-size: 1rem;}

.condition{display: none;}
.null_con{position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;width:250px;height:200px;}
.null_con h3{-webkit-margin-before:0;}
.null_con h3 img{width:5.375rem;}
.null_con p{font-size: 1.25rem;color: #B0B8C8;text-align: center;line-height: 1.875rem;-webkit-margin-before:0;-webkit-margin-after:0;}

</style>
