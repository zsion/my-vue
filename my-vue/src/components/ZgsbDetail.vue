<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed title="中国申报">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>
    <div class="detail_con">
      <ul>
        <li>
          <h3>{{detaildata.ypmc}}</h3>
          <p><span>药品通用名：</span><span>{{detaildata.yptym}}</span></p>
          <p><span>英文通用名：</span><span>{{detaildata.ywtym}}</span></p>
          <p><span>剂型：</span><span>{{detaildata.jixing}}</span></p>
        </li>
        <li>
          <p><span>申报企业：</span><span>{{detaildata.scqy}}</span></p>
          <p><span>药品类别：</span><span>{{detaildata.cplb}}</span></p>
          <p><span>注册类型：</span><span>{{detaildata.zclx}}</span></p>
          <p><span>申请类型：</span><span>{{detaildata.sqlx}}</span></p>
        </li>
        <li>
          <p><span>受理号：</span><span>{{detaildata.slh}}</span></p>
          <p><span>承办时间：</span><span>{{detaildata.cbrq}}</span></p>
          <p><span>办理状态：</span><span>{{detaildata.blzt}}</span></p>
          <p><span>状态开始时间：</span><span>{{detaildata.ztkssj}}</span></p>
          <p><span>审评结论：</span><span>{{detaildata.spjl}}</span></p>
          <p><span>药品批准文号：</span><span>{{detaildata.pzwh}}</span></p>
        </li>
        <li>
          <p><span>治疗大类：</span><span>{{detaildata.zldl}}</span></p>
          <p><span>治疗小类：</span><span>{{detaildata.zlxl}}</span></p>
          <p><span>ATC一级分类名称：</span><span>{{detaildata.ATC1}}</span></p>
          <p><span>ATC二级分类名称：</span><span>{{detaildata.ATC2}}</span></p>
          <p><span>ATC三级分类名称：</span><span>{{detaildata.ATC3}}</span></p>
          <p><span>ATC四级分类名称：</span><span>{{detaildata.ATC4}}</span></p>
        </li>
      </ul>
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
  name: 'ZgsbDetail',
  data () {
    return {
      backbtn:true,
      GetInfo:ApiConfig.Zgsb.GetInfo,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      detaildata:[],
      iscondition:true,
    }
  },
  beforeCreate: function () {},
  created: function () {
    this.checkAuth();
    this.getshare();
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
    next()
  },
  activated:function(){
    if(!this.$route.meta.isBack){
      this.checkAuth();
      this.getshare();
    }
    this.$route.meta.isBack=false
  },
  methods:{
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
      var pzwh = this.$route.query.pzwh
      this.$http.post(this.GetInfo,{slh:pzwh,token:getCookie("token")},{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          if(response.body.Data != null){
            this.iscondition = true
            this.detaildata = response.body.Data
          }else{
            this.iscondition = false
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
.condition{display: none;}
.null_con{position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;width:250px;height:200px;}
.null_con h3{-webkit-margin-before:0;}
.null_con h3 img{width:5.375rem;}
.null_con p{font-size: 1.25rem;color: #B0B8C8;text-align: center;line-height: 1.875rem;-webkit-margin-before:0;-webkit-margin-after:0;}

.detail_con{margin-top: 2.5rem;}
.detail_con ul{-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.detail_con ul{-webkit-padding-start: 0;-webkit-padding-end: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.detail_con ul li{list-style-type: none;text-align: left;padding:.625rem;margin-bottom: .625rem;background: #fff;}
.detail_con ul li h3{font-size: 1rem;color: #31363B;-webkit-margin-before: 0;-webkit-margin-after: .625rem;}
.detail_con ul li p{font-size: .8125rem;color: #31363B;line-height: 1.375rem;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.detail_con ul li p a{color:#00B1E0;margin-left: 1rem;}

</style>
