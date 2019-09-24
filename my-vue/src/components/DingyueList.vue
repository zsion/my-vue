<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="订阅历史">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>

    <h3 class="firsttit">中国申报-CDE新受理</h3>

    <div v-for="alldata in total_data">
      <section class="part-one">
        <p><span>{{alldata.date}}</span>&nbsp;&nbsp;&nbsp;<span>共<b>{{alldata.data.length}}</b>条</span></p>
      </section>
      <section class="part-two">
        <ul>
          <li v-for="(datas,index) in alldata.data">
            <router-link :to="{ name: 'ZgsbDetail', query: {pzwh:datas.slh}}">
              <div>
                <b>{{index+1}}</b>
              </div>
              <div>
                <h3>{{datas.slh}}</h3>
                <p>{{datas.ypmc}}</p>
                <p>{{datas.scqy}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </section>
    </div>

    <section class="load-more">
      <ul>
        <li><hr></li>
        <li><button @click="load_more()" v-bind:class="{ have_more: !show_hide }">点击加载更多</button><span v-bind:class="{ have_more: show_hide }">没有更多了...</span></li>
        <li><hr></li>
      </ul>
    </section>

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
    name: 'DingyueList',
    data () {
      return {
        backbtn:true,
        show_hide:true,
        total_data:[],
        dates:"",
        GetSubscriptionHistory:ApiConfig.Member.GetSubscriptionHistory,
        CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
        doWechatAuth:ApiConfig.Member.doWechatAuth,
        getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
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
        this.$http.post(this.GetSubscriptionHistory,{date:"",token:getCookie("token")},{emulateJSON: true}).then(response => {
          if(response.body.ResultType == 1){
            if(response.body.Data.length != 0){
              this.total_data = response.body.Data
              this.dates = response.body.Data[response.body.Data.length-1].date
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
      load_more:function(){
        Indicator.open('加载中...');
        this.$http.post(this.GetSubscriptionHistory,{date:this.dates,token:getCookie("token")},{emulateJSON: true}).then(response => {
          if(response.body.ResultType == 1){
            if(response.body.Data.length > 0){
              for (let i = 0; i < response.body.Data.length; i++) {
                this.total_data.push(response.body.Data[i]);
              }
              this.dates = response.body.Data[response.body.Data.length-1].date
            }else{
              this.show_hide = false
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.firsttit{font-size: .9375rem;color: #0F0F0F;font-weight: normal;background: #fff;-webkit-margin-before: 0;-webkit-margin-after: 0;padding: 1rem;margin-top: 2.5rem;}

.part-one p{background: #F9F9F9;border-top: 1px solid #EEF3F3;border-bottom: 1px solid #EEF3F3;-webkit-margin-before: 0;-webkit-margin-after: 0;height:1.875rem;line-height: 1.875rem;}
.part-one p span{font-size: .875rem;color: #81878C;}
.part-one p span b{font-weight: normal;font-size: .875rem;color: #00BEEE;}

.part-two ul{-webkit-padding-start: 0px;-webkit-margin-before: 0em;-webkit-margin-after: 0em;}
.part-two ul li{list-style-type: none;overflow: hidden;background: #fff;padding: .5rem;margin-bottom: .5rem;}
.part-two ul li div:nth-child(1){width:15%;float: left;overflow: hidden;}
.part-two ul li div:nth-child(1) b{font-size: 1.125rem;color: #CECED3;font-weight: normal;}
.part-two ul li div:nth-child(2){width:85%;float: right;overflow: hidden;}
.part-two ul li div:nth-child(2) h3{-webkit-margin-before: 0em;-webkit-margin-after: 0em;text-align: left;color:#00BEEE;font-weight: normal;line-height: 1.25rem;}
.part-two ul li div:nth-child(2) p{-webkit-margin-before: 0em;-webkit-margin-after: 0em;text-align: left;line-height: 1.25rem;font-size: .875rem;color: #000;}


.load-more{width:96%;margin:1rem auto;margin-bottom: 1rem;}
.load-more ul{-webkit-padding-start: 0px;-webkit-margin-before: 0em;-webkit-margin-after: 0em;display: flex;}
.load-more ul li{list-style-type: none;width:33%;height: 1.875rem;align-items:center;}
.load-more ul li hr{border-top:none;border-bottom:1px solid #D8D8D8;-webkit-margin-before: 1em;}
.load-more ul li button{border: none;background: #00B9E7;color: #FFFFFF;font-size: .875rem;height:1.875rem;outline: none;}
.load-more ul li span{line-height: 1.875rem;color:#D8D8D8;}

.have_more{display: none;}

</style>
