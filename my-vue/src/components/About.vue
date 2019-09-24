<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="关于我们">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>

    <div class="con-wrap">
      <section class="con-part-one">
        <h3><img src="@/assets/img/About/1.png" alt=""> 平台简介</h3>
        <p>药分享是一个整合了研发、生产、市场等多环节的医药综合性数据平台。</p>
        <p>在这里，您可以便捷的找到各种规范化信息，随时随地为您的工作助力。</p>
      </section>
      <hr>
      <section class="con-part-two">
        <h3><img src="@/assets/img/About/2.png" alt=""> 联系我们</h3>
        <p>查看更多数据，请联系</p>
        <p><a href="tel:021-62477965">021-62477965</a></p>
        <p><a href="tel:021-62474272">021-62474272</a></p>
      </section>
    </div>

    <div class="backHome">
      <router-link to="/"><img src="@/assets/img/Home/home.png" alt=""></router-link>
    </div>

  </div>
</template>

<script>
import {ApiConfig} from '../assets/js/ApiConfig.js'
import {setCookie,getCookie,delCookie,setToken} from '../assets/js/util.js'
export default {
  name: 'About',
  data () {
    return {
      backbtn:true,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
    }
  },
  beforeCreate: function () {},
  created: function () {
    //this.checkAuth();
    this.getshare();
  },
  beforeMount: function () {},
  mounted: function () {},
  beforeUpdate: function () {},
  updated: function () {},
  beforeDestroy: function () {},
  destroyed: function () {},
  beforeRouteEnter:function(to,from,next){
    to.meta.isBack = true
    next()
  },
  activated:function(){
    if(!this.$route.meta.isBack){
      //this.checkAuth();
      this.getshare();
    }
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

          }else{
            var appid = response.body.Data.appID
            var redirect_uri = encodeURIComponent(window.location.origin + window.location.pathname + decodeURI(window.location.search))
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=abcde#wechat_redirect`
          }
        }, response => {
          this.$toast('加载失败！')
        });
      }else{
        this.$http.post(this.doWechatAuth,{token:getCookie("token"),code:this.$route.query.code},{emulateJSON: true}).then(response => {
          if(response.body.ResultType == 1){

          }else{
            this.$toast(response.body.Message)
          }
        }, response => {
          this.$toast('加载失败！')
        });
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.con-wrap{width:90%;margin:auto;margin-top: 2.5rem;}
.con-part-one{width:85%;margin:auto;padding-top: 2rem;}
.con-part-one h3{font-style: normal;font-size: .9375rem;color: #0F0F0F;}
.con-part-one h3 img{width:1.1875rem;margin-bottom: -.2rem;}
.con-part-one p{text-align: left;font-size: .8125rem;color: #1D1D1D;margin: 1.5rem;}

.con-part-two h3{font-style: normal;font-size: .9375rem;color: #0F0F0F;}
.con-part-two h3 img{width:1.1875rem;margin-bottom: -.2rem;}
.con-part-two p{font-size: .8125rem;color: #1D1D1D;line-height: 1.625rem;}
.con-part-two p a{font-size: .9375rem;color: #00BEEE;text-decoration: none;}

hr{border:.5px solid #DDE0E5;margin: 2rem;}

</style>
