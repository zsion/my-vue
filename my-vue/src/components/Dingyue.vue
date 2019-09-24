<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="订阅">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>
    <section class="part-one">
      <h5><router-link :to="{ name: 'DingyueList' }">订阅历史</router-link></h5>
      <div>
        <h3><img :src="headimgurl" alt=""></h3>
        <p>{{nickname}}</p>
      </div>
    </section>
    <section class="part-two">
      <ul>
        <li v-for="info in listData">
          <div class="first">
            <div class="tp">
              <p v-if="info.type == 0"><img src="@/assets/img/public/zgsb2.png" alt=""></p>
              <p v-if="info.type == 1"><img src="@/assets/img/public/zgss1.png" alt=""></p>
              <p v-if="info.type == 2"><img src="@/assets/img/public/yzxpj2.png" alt=""></p>
            </div>
            <div class="tit">
              <h3>{{info.title}}</h3>
              <p>{{info.description}}</p>
            </div>
          </div>
          <div class="second"></div>
          <div v-if="info.type == 0" class="third">
            <button v-if="info.is_subscribe != true" v-bind:class="{ cancelhover: info.is_subscribe }" @click="open_concern(info.type)">订阅</button>
            <button v-else v-bind:class="{ cancelhover: info.is_subscribe }" @click="close_concern(info.type)">取消</button>
          </div>
          <div v-else class="third">
            <a v-if="info.is_subscribe != true" v-bind:class="{ cancelhover: info.is_subscribe }" style="font-size: .875rem;line-height:4.5rem;color:#7A7A7A;">敬请期待</a>
            <a v-else v-bind:class="{ cancelhover: info.is_subscribe }">取消</a>
          </div>
        </li>
      </ul>
    </section>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="pub_pop_con">
        <a class="close_pops" href="javascript:void(0)" @click="close_pop()">×</a>
        <h3>提示</h3>
        <p style="text-align: left;">请先关注医药地理服务号，以便您能顺利收到订阅通知，谢谢。</p>
        <p><img src="@/assets/img/Dingyue/qrcode.jpg" alt=""></p>
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
export default {
  name: 'Dingyue',
  data () {
    return {
      backbtn:true,
      popupVisible:false,
      isCancel: true,
      GetInfo:ApiConfig.Member.GetInfo,
      GetSubscriptionInfo:ApiConfig.Member.GetSubscriptionInfo,
      OpenSubscription:ApiConfig.Member.OpenSubscription,
      CloseSubscription:ApiConfig.Member.CloseSubscription,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      nickname:"",
      headimgurl:"",
      listData:[],
    }
  },
  beforeCreate: function () {},
  created: function () {
    //this.checkAuth();
    this.pubgetdata();
    this.getshare();
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
    to.meta.isBack = true
    next()
  },
  activated:function(){
    if(!this.$route.meta.isBack){
      //this.checkAuth();
      this.pubgetdata();
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
    },
    pubgetdata:function(){
      Indicator.open('加载中...');
      this.$http.post(this.GetInfo,{token:getCookie("token")},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          this.nickname = response.body.Data.nickname
          this.headimgurl = response.body.Data.headimgurl
          Indicator.close();
        }else{
          Indicator.close();
          this.$toast(response.body.Message)
        }
      }, response => {
        this.$toast('加载失败！')
      });
      this.$http.post(this.GetSubscriptionInfo,{token:getCookie("token")},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          this.listData = response.body.Data
          Indicator.close();
        }else{
          Indicator.close();
          this.$toast(response.body.Message)
        }
      }, response => {
        this.$toast('加载失败！')
      });
    },
    open_concern:function(type){
      this.$http.post(this.OpenSubscription,{token:getCookie("token"),type:type},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          this.$toast("订阅成功")
          this.pubgetdata()
        }else if(response.body.ResultType == 9997){
          this.popupVisible = true
          //this.$toast(response.body.Message)
        }else{
          this.$toast(response.body.Message)
        }
      }, response => {
        this.$toast('操作失败！')
      });
    },
    close_concern:function(type){
      this.$http.post(this.CloseSubscription,{token:getCookie("token"),type:type},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          this.$toast("取消成功")
          this.pubgetdata()
        }else{
          this.$toast(response.body.Message)
        }
      }, response => {
        this.$toast('操作失败！')
      });
    },
    close_pop:function(){
      this.popupVisible = false
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.part-one{margin-top: 2.5rem;position: relative;width:100%;height:14.6875rem;background: url("../assets/img/Dingyue/bg.png");background-size: 100% 100%;}
.part-one h5{-webkit-margin-before: 0em;-webkit-margin-after: 0em;height:2rem;line-height: 2rem;text-align: right;padding:0 1rem 0 0;}
.part-one h5 a{font-size: 1rem;color: #81878C;font-weight: normal;text-decoration: none;height:2rem;line-height: 2rem;}
.part-one div{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width:100%;height:5.3125rem;}
.part-one h3{width:5.3125rem;height:5.3125rem;margin:auto;-webkit-margin-before: 0em;-webkit-margin-after: 0em;border-radius: 50%;overflow: hidden;}
.part-one h3 img{width:5.3125rem;height:5.3125rem;border-radius: 50%;}
.part-one p{width:100%;-webkit-margin-before: 0em;-webkit-margin-after: 0em;font-size: 1.1875rem;color: #393939;}

.part-two{background: #fff;overflow: hidden;}
.part-two ul{-webkit-margin-before: 0em;-webkit-margin-after: 0em;overflow: hidden;-webkit-padding-start:0;}
.part-two ul li{list-style-type: none;overflow: hidden;}
.part-two ul li div:nth-child(1){width:75%;height:5rem;float: left;}
.part-two ul li div:nth-child(2){width:3px;height:2.5rem;float: left;}
.part-two ul li div:nth-child(3){width:23%;height:5rem;float: left;}

.part-two ul li div.first .tp{width:25%;height:5rem;float: left;}
.part-two ul li div.first .tp p{display: flex;justify-content: center;align-items: center;}
.part-two ul li div.first .tp p img{width:2.1875rem;padding-top: .3rem;}
.part-two ul li div.first .tit{width:75%;height:5rem;float: right;}
.part-two ul li div.first .tit h3{text-align: left;-webkit-margin-before: 0em;-webkit-margin-after: 0em;font-size: .9375rem;color: #31363B;padding-top: 1rem;}
.part-two ul li div.first .tit p{padding-right:1rem;text-align: left;-webkit-margin-before: 0em;-webkit-margin-after: 0em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: .75rem;color: #81878C;}

.part-two ul li div.second{background: #F1F3F5;margin-top: 1rem;}
.part-two ul li div.third button{margin-top: 1.5rem;font-size: 1.0625rem;color: #00BEEE;background: transparent;border: none;outline: none;}
.part-two ul li div.third button.cancelhover{color: #7A7A7A;}


.mint-popup{width:85%;}
.pub_pop_con{padding:0 1rem 1rem 1rem;}
.pub_pop_con h3{font-size: .875rem;color: #1D1D1D;-webkit-margin-after: 1rem;-webkit-margin-before: 1rem;}
.pub_pop_con p{font-size: .875rem;color: #1D1D1D;-webkit-margin-after: .5rem;-webkit-margin-before: .5rem;}
.pub_pop_con p img{width:12rem;}
.close_pops{float: right;margin:-1rem -.5rem;color: #A8A8A8;text-decoration: none;font-size: 1.5rem;}


</style>
