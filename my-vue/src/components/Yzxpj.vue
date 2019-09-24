<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="仿制药参比制剂目录">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>
    <div class="fixeds">
      <div class="part-one">
        <ul>
          <li><input type="text" ref="searchkey" placeholder="输入药品/企业名称查询" autofocus="autofocus" :value="searchkeycon"></li>
          <li><button @click="changekey()"><img src="@/assets/img/Appear/search.png" alt=""></button></li>
        </ul>
      </div>
    </div>

    <div class="part-three">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul>
          <li v-for="usedata in list_data">
            <h3>{{usedata.ypmc}}</h3>
            <p><span>商品名：</span><span>{{usedata.spm}}</span></p>
            <p><span>厂商国家（中文）：</span><span>{{usedata.scqy}}</span></p>
            <p><span>序号：</span><span>{{usedata.xuhao}}</span><router-link :to="{ name: 'YzxpjDetail', query: { pzwh:usedata.xuhao}}">详情</router-link></p>
            <p><span>持证商：</span><span>{{usedata.czgs}}</span></p>
            <p><span>参比制剂来源：</span><span>{{usedata.laiyuan}}</span></p>
          </li>
        </ul>
      </mt-loadmore>
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
  name: 'Yzxpj',
  data () {
    return {
      allowget:true,
      backbtn:true,
      iscondition:true,
      searchkeycon:"",
      GetList:ApiConfig.Yzxpj.GetList,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      isActiveone: true,
      isActivetwo: false,
      list_data:[],
      search_Type:"",
      search_Con:"",
      styles:"0",
      last:0,
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
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
    Indicator.close();
  },
  beforeDestroy: function () {},
  destroyed: function () {},
  beforeRouteEnter:function(to,from,next){
    if(from.name=='YzxpjDetail'){
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
      this.last = 0
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
      this.list_data = [];
      var sned_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      this.searchkeycon = sned_Con
      this.$http.post(this.GetList,{keywords:sned_Con,page:0,token:getCookie("token")},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          if(response.body.Data.length == 0){
            this.list_data = [];
            this.iscondition = false
          }else{
            this.list_data = response.body.Data;
            this.iscondition = true
          }
          Indicator.close();
        }else{
          Indicator.close();
          this.$toast(response.body.Message)
        }
      }, response => {
        this.$toast('加载失败！')
      });
      this.search_Type = this.$route.query.search_Type
      this.search_Con = this.$route.query.search_Con
    },
    loadBottom:function() {
      this.more();
      this.$refs.loadmore.onBottomLoaded();
    },
    more:function(){
      Indicator.open('加载中...');
      this.last++
      this.$http.post(this.GetList,{keywords:this.$refs.searchkey.value,page:this.last,token:getCookie("token")},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          if(response.body.Data.length > 0){
            for (let i = 0; i < response.body.Data.length; i++) {
              this.list_data.push(response.body.Data[i]);
            }
          }else{
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$toast('没有更多数据了！')
          }
          Indicator.close();
        }else{
          Indicator.close();
          this.$toast(response.body.Message)
        }
      }, response => {
        this.$toast('加载失败！')
      });
    },
    changekey:function(){
      Indicator.open('加载中...');
      this.searchkeycon = this.$refs.searchkey.value
      this.last = 0
      this.list_data = [];
        this.$http.post(this.GetList,{keywords:this.$refs.searchkey.value,page:this.last,token:getCookie("token")},{emulateJSON: true}).then(response => {
          if(response.body.ResultType == 1){
            if(response.body.Data.length == 0){
              this.list_data = [];
              this.iscondition = false
            }else{
              this.list_data = response.body.Data;
              this.iscondition = true
            }
            Indicator.close();
          }else{
            Indicator.close();
            this.$toast(response.body.Message)
          }
        }, response => {
          this.$toast('加载失败！')
        });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-header.is-fixed{max-width: 768px;margin: auto;}
.fixeds{position: fixed;top:2.5rem;left:0;width:100%;z-index: 2;}

.condition{display: none;}
.null_con{position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;width:250px;height:200px;}
.null_con h3{-webkit-margin-before:0;}
.null_con h3 img{width:5.375rem;}
.null_con p{font-size: 1.25rem;color: #B0B8C8;text-align: center;line-height: 1.875rem;-webkit-margin-before:0;-webkit-margin-after:0;}

.part-one{background: #00BEEE;max-width: 768px;margin:auto;}
.part-one ul{width:96%;margin:0 auto;padding:0 0 .5rem;-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;display: flex;flex-direction: row;align-items: center;justify-content: space-around;}
.part-one ul li{list-style-type: none;}
.part-one ul li:nth-child(1){width:80%;}
.part-one ul li:nth-child(2){width:20%;}
.part-one ul li input{width:103%;font-size: .875rem;background: #F2F3F5;border-radius: 42px;border: none;padding: .625rem .625rem .625rem;float: left;outline: none;}
.part-one ul li button{width:100%;margin-left: 1rem;border:none;background:transparent;border-radius:100%;padding-top: .25rem;outline: none;}
.part-one ul li button img{width:2.1875rem;}

.part-two{background: #fff;margin-bottom: .625rem;}
.part-two ul{padding:.75rem 0 .75rem;-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
.part-two ul li{list-style-type: none;}
.part-two ul li:nth-child(1),.part-two ul li:nth-child(3){width:49%;color: #5C5E5F;font-size: 1rem;}
.part-two ul li:nth-child(2){width:1%;color: #ECEEF2;}

.part-three{margin-top: 6.5rem;}
.part-three ul{-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.part-three ul li{list-style-type: none;text-align: left;padding:.625rem;margin-bottom: .625rem;background: #fff;}
.part-three ul li h3{font-size: 1rem;color: #31363B;-webkit-margin-before: 0;-webkit-margin-after: .625rem;}
.part-three ul li p{font-size: .8125rem;color: #31363B;line-height: 1.375rem;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.part-three ul li p a{color:#00B1E0;margin-left: 1rem;}

.part-two ul li a{color:#5C5E5F;text-decoration: none;}
.tabhover a{border-bottom: 2px solid #00BEEE;color:#0F0F0F;padding:0 1.5rem .5rem 1.5rem;}

</style>
