<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="中国申报订阅">
      <!--<router-link to="/" slot="left">-->
        <!--<mt-button><img src="@/assets/img/Home/home.png" alt="" class="icon-home"></mt-button>-->
      <!--</router-link>-->
    </mt-header>

    <section class="part-one">
      <h3><b>|||||</b><span>CDE新受理</span><span>共<i>{{count}}</i>条</span><span>{{date}}</span></h3>
    </section>
    <div v-for="(alldata,index) in total_data">
      <section class="part-two">
        <ul>
          <li>
            <router-link :to="{ name: 'ZgsbDetail', query: {pzwh:alldata.slh}}">
              <div>
                <b>{{index+1}}</b>
              </div>
              <div>
                <h3>{{alldata.slh}}</h3>
                <p>{{alldata.ypmc}}</p>
                <p>{{alldata.scqy}}</p>
              </div>
            </router-link>
          </li>
        </ul>
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
  import { Indicator } from 'mint-ui';
  export default {
    name: 'DingyueTs',
    data () {
      return {
        date:"",
        count:"",
        total_data:[],
        GetPushList_Zgsb:ApiConfig.Subscription.GetPushList_Zgsb,
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
        this.$http.post(this.GetPushList_Zgsb,{id:this.$route.query.id,token:getCookie("token")},{emulateJSON: true}).then(response => {
          if(response.body.ResultType == 1){
            if(response.body.Data.length > 0){
              this.total_data = response.body.Data
              this.date = response.body.Data[0].cbrq
              this.count = response.body.Data.length
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
.part-one{margin-top: 2.5rem;}
.part-one h3{font-size: .9375rem;color: #0F0F0F;font-weight: normal;background: #fff;-webkit-margin-before: 0;-webkit-margin-after: 0;padding: 1rem;overflow:hidden;border: 1px solid #EEF3F3;}
.part-one h3 b{width:10%;float:left;color: #00BEEE;letter-spacing: -4px;font-size: 1rem;margin-top: -.1rem;}
.part-one h3 span:nth-child(2){float:left;font-size: .9375rem;color: #31363B;float: left;}
.part-one h3 span:nth-child(3){float:left;font-size: .8125rem;color: #81878C;float: left;margin-left: 1rem;margin-top: .1rem;}
.part-one h3 span:nth-child(3) i{font-size: .8125rem;color: #00BEEE;font-style: normal;}
.part-one h3 span:nth-child(4){float: right;font-size: .8125rem;color: #81878C;margin-top: .1rem;}

.part-two ul{-webkit-padding-start: 0px;-webkit-margin-before: 0em;-webkit-margin-after: 0em;}
.part-two ul li{list-style-type: none;overflow: hidden;background: #fff;padding: .5rem;margin-bottom: .5rem;}
.part-two ul li div:nth-child(1){width:15%;float: left;overflow: hidden;}
.part-two ul li div:nth-child(1) b{font-size: 1.125rem;color: #CECED3;font-weight: normal;}
.part-two ul li div:nth-child(2){width:85%;float: right;overflow: hidden;}
.part-two ul li div:nth-child(2) h3{-webkit-margin-before: 0em;-webkit-margin-after: 0em;text-align: left;color:#00BEEE;font-weight: normal;line-height: 1.25rem;}
.part-two ul li div:nth-child(2) p{-webkit-margin-before: 0em;-webkit-margin-after: 0em;text-align: left;line-height: 1.25rem;font-size: .875rem;color: #000;}

</style>
