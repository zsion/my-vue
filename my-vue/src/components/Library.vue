<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <mt-header fixed :title="search_Con">
      <a v-if="backbtn" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </a>
    </mt-header>

    <div class="library-con">
      <ul>
        <li v-for="(datas,index) in total_data">
          <section v-if="datas.dbname == 'sales'">
            <div>
              <h5 v-if="(index % 2) == 0"><img src="@/assets/img/public/sales1.png" alt=""></h5>
              <h5 v-else><img src="@/assets/img/public/sales2.png" alt=""></h5>
              <label>中国销售</label>
            </div>
            <div>
              <p v-if="datas.comparetype == 0"><span>共<b>{{datas.cnt}}</b>条结果</span><router-link :to="{ name: 'List', query: { search_Type:search_Type,search_Con:search_Con }}"><img src="@/assets/img/Library/eye.png" alt="">查看更多</router-link></p>
              <p v-else-if="datas.comparetype == 1"><span>共<b>{{datas.cnt}}</b>条结果</span><a href="javascript:void(0)" @click="jumpChart()"><img src="@/assets/img/Library/eye.png" alt="">查看更多</a></p>
              <p>近五年市场销售趋势</p>
              <p>近三年市场增长变化</p>
            </div>
            <a v-if="datas.comparetype == 0" href="javascript:void(0)" class="all-href" @click="jumpList()"></a>
            <a v-if="datas.comparetype == 1" href="javascript:void(0)" class="all-href" @click="jumpChart()"></a>
          </section>

          <section v-else-if="datas.dbname == 'zgsb'">
            <div>
              <h5 v-if="(index % 2) == 0"><img src="@/assets/img/public/zgsb1.png" alt=""></h5>
              <h5 v-else><img src="@/assets/img/public/zgsb2.png" alt=""></h5>
              <label>中国申报</label>
            </div>
            <div>
              <p><span>共<b>{{datas.cnt}}</b>条结果</span><router-link :to="{ name: 'searchZgsb', query: { search_Con:search_Con }}"><img src="@/assets/img/Library/eye.png" alt="">查看更多</router-link></p>
              <p v-for="names in datas.list"><span>{{names.col1}}</span><span>{{names.col2}}</span></p>
            </div>
            <a href="javascript:void(0)" class="all-href" @click="jumpsearchZgsb()"></a>
          </section>

          <section v-else-if="datas.dbname == 'zgss'">
            <div>
              <h5 v-if="(index % 2) == 0"><img src="@/assets/img/public/zgss1.png" alt=""></h5>
              <h5 v-else><img src="@/assets/img/public/zgss2.png" alt=""></h5>
              <label>中国上市</label>
            </div>
            <div>
              <p><span>共<b>{{datas.cnt}}</b>条结果</span><router-link :to="{ name: 'searchAppear', query: { search_Con:search_Con }}"><img src="@/assets/img/Library/eye.png" alt="">查看更多</router-link></p>
              <p v-for="names in datas.list"><span>{{names.col1}}</span><span>{{names.col2}}</span></p>
            </div>
            <a href="javascript:void(0)" class="all-href" @click="jumpsearchAppear()"></a>
          </section>

          <section v-else-if="datas.dbname == 'yzxpj'">
            <div>
              <h5 v-if="(index % 2) == 0"><img src="@/assets/img/public/yzxpj1.png" alt=""></h5>
              <h5 v-else><img src="@/assets/img/public/yzxpj2.png" alt=""></h5>
              <label>一致性评价</label>
            </div>
            <div>
              <p><span>共<b>{{datas.cnt}}</b>条结果</span><router-link :to="{ name: 'searchYzxpj', query: { search_Con:search_Con }}"><img src="@/assets/img/Library/eye.png" alt="">查看更多</router-link></p>
              <p v-for="names in datas.list"><span>{{names.col1}}</span><span>{{names.col2}}</span></p>
            </div>
            <a href="javascript:void(0)" class="all-href" @click="jumpsearchYzxpj()"></a>
          </section>
        </li>
      </ul>
    </div>

    <div v-bind:class="{ condition: iscondition }">
      <div class="null_con">
        <h3><img src="@/assets/img/Null/none.png" alt=""></h3>
        <p>暂未找到相关内容，换个搜索条件试试</p>
      </div>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="pub_pop_con">
        <a class="close_pops" href="javascript:void(0)" @click="close_pop()">X</a>
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
export default {
  name: 'Library',
  data () {
    return {
      allowget:true,
      backbtn:true,
      popupVisible:false,
      iscondition:true,
      GetSearchInfo_Drug:ApiConfig.Search.GetSearchInfo_Drug,
      GetSearchInfo_Company:ApiConfig.Search.GetSearchInfo_Company,
      GetSearchInfo_ATC:ApiConfig.Search.GetSearchInfo_ATC,
      GetSearchInfo_CPHIIC:ApiConfig.Search.GetSearchInfo_CPHIIC,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      total_data:[],
      search_Type:"",
      search_Con:"",
      puburl:"",
    }
  },
  beforeCreate: function () {},
  created: function () {
    //this.checkAuth();
    this.pubgetdata();
    this.getshare();
    this.allowget = false;
  },
  beforeMount:function(){},
  mounted:function(){},
  beforeUpdate:function(){},
  updated:function(){
    Indicator.close();
  },
  beforeDestroy:function(){},
  destroyed:function(){},
  beforeRouteEnter:function(to,from,next){
    if(from.name=='List' || from.name=='searchZgsb' || from.name=='searchAppear' || from.name=='searchYzxpj' || from.name=='Chart'){
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
      this.total_data = [];
      this.search_Type = this.$route.query.search_Type
      this.search_Con = this.$route.query.search_Con
      if(this.search_Type == 0 || this.search_Type == 1){
        this.search_Con = this.$route.query.search_Con
      }else if(this.search_Type == 2){
        if(this.$route.query.ATC4 != ""){
          this.search_Con = this.$route.query.ATC4
        }else if(this.$route.query.ATC3 != ""){
          this.search_Con = this.$route.query.ATC3
        }else if(this.$route.query.ATC2 != ""){
          this.search_Con = this.$route.query.ATC2
        }else if(this.$route.query.ATC1 != ""){
          this.search_Con = this.$route.query.ATC1
        }
      }else{
        if(this.$route.query.zlxl != ""){
          this.search_Con = this.$route.query.zlxl
        }else if(this.$route.query.zldl != ""){
          this.search_Con = this.$route.query.zldl
        }
      }

      var sned_Con = {}
      sned_Con.token = getCookie("token")
      var types = this.$route.query.search_Type ? this.$route.query.search_Type : 0
      //如果types = 0 就是药品搜索
      if(types == 0){
        this.puburl = this.GetSearchInfo_Drug
        sned_Con.keywords = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      }else if(types == 1){
        this.puburl = this.GetSearchInfo_Company
        sned_Con.keywords = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      }else if(types == 2){
        this.puburl = this.GetSearchInfo_ATC
        sned_Con.ATC1 = this.$route.query.ATC1
        sned_Con.ATC2 = this.$route.query.ATC2
        sned_Con.ATC3 = this.$route.query.ATC3
        sned_Con.ATC4 = this.$route.query.ATC4
      }else{
        this.puburl = this.GetSearchInfo_CPHIIC
        sned_Con.zldl = this.$route.query.zldl
        sned_Con.zlxl = this.$route.query.zlxl
      }
      this.$http.post(this.puburl,sned_Con,{emulateJSON: true}).then(response => {
        if(response.body.ResultType == 1){
          if(response.body.Data.length == 0){
            this.total_data = [];
            this.iscondition = false
          }else{
            this.total_data = response.body.Data;
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
    },
    close_pop:function(){
      this.popupVisible = false
    },
    jumpChart:function(){
      var _this = this
      var cond ={}
      var types = this.$route.query.search_Type ? this.$route.query.search_Type : 0
      cond.search_Type =types
      if (types==0){
        cond.search_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      }
      else if(types==1){
        cond.search_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      }
      else if(types==2){
        cond.ATC1 = this.$route.query.ATC1 ? this.$route.query.ATC1 : ""
        cond.ATC2 = this.$route.query.ATC2 ? this.$route.query.ATC2 : ""
        cond.ATC3 = this.$route.query.ATC3 ? this.$route.query.ATC3 : ""
        cond.ATC4 = this.$route.query.ATC4 ? this.$route.query.ATC4 : ""
      }
      else if(types==3){
        cond.zldl = this.$route.query.zldl ? this.$route.query.zldl : ""
        cond.zlxl = this.$route.query.zlxl ? this.$route.query.zlxl : ""
      }
      _this.$router.push({name: 'Chart', query: cond});
    },
    jumpList:function(){
      var types = this.$route.query.search_Type ? this.$route.query.search_Type : 0
      var search_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      this.$router.push({name: 'List', query: { search_Type:types,search_Con:search_Con }});
    },
    jumpsearchZgsb:function(){
      var search_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      this.$router.push({name: 'searchZgsb', query: { search_Con:search_Con }});
    },
    jumpsearchAppear:function(){
      var search_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      this.$router.push({name: 'searchAppear', query: { search_Con:search_Con }});
    },
    jumpsearchYzxpj:function(){
      var search_Con = this.$route.query.search_Con ? this.$route.query.search_Con : ""
      this.$router.push({name: 'searchYzxpj', query: { search_Con:search_Con }});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-header.is-fixed{max-width: 768px;margin: auto;}
.condition{display: none;}
.null_con{position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;width:250px;height:200px;}
.null_con h3{-webkit-margin-before:0;}
.null_con h3 img{width:5.375rem;}
.null_con p{font-size: 1.25rem;color: #B0B8C8;text-align: center;line-height: 1.875rem;-webkit-margin-before:0;-webkit-margin-after:0;}

.library-con{padding:0;margin-top: 2.5rem;}
.library-con ul{-webkit-padding-start: 0!important;-webkit-margin-before: 0!important;}
.library-con ul li{display:flex;background: #fff;margin-bottom: 1rem;}
.library-con ul li section{width:100%;height:100%;overflow: hidden;position: relative;}
.library-con ul li section div:nth-child(1){width:25%;float: left;}
.library-con ul li section div:nth-child(2){width:75%;float: left;}
.library-con ul li section div:nth-child(1) h5{-webkit-margin-before: 0;-webkit-margin-after: 0;}
.library-con ul li section div:nth-child(1) h5 img{margin:1.75rem .75rem .2rem;width: 2.125rem;}
.library-con ul li section div:nth-child(1) label{font-size: .8125rem;}
.library-con ul li section div p{-webkit-padding-start: 0!important;-webkit-margin-before: 0!important;}
.library-con ul li section div:nth-child(2) p:nth-child(1){display: flex;flex-direction: row;align-items: center;padding:.75rem 0 0 0;}
.library-con ul li section div:nth-child(2) p:nth-child(1) span{width:70%;text-align:left;font-size: .75rem;color: #7D7D7D;}
.library-con ul li section div:nth-child(2) p:nth-child(1) span b{color: #00ABD6;font-weight: normal;}
.library-con ul li section div:nth-child(2) p:nth-child(1) a {color: #494949;font-size: .75rem;margin-right: .875rem;text-decoration: none;}
.library-con ul li section div:nth-child(2) p:nth-child(1) a img{display: inline-flex;width:.625rem;margin-right: .175rem;}
.library-con ul li section div:nth-child(2) p:nth-child(2),.library-con ul li section div:nth-child(2) p:nth-child(3){width:100%;text-align: left;color: #33363A;font-size: .875rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.library-con ul li section div:nth-child(2) p:nth-child(2) span:nth-child(1){display:inline-block;float:left;width:45%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.library-con ul li section div:nth-child(2) p:nth-child(2) span:nth-child(2){width:50%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.library-con ul li section div:nth-child(2) p:nth-child(3) span:nth-child(1){display:inline-block;float:left;width:45%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.library-con ul li section div:nth-child(2) p:nth-child(3) span:nth-child(2){width:50%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}

.all-href{position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;overflow: hidden;}

.mint-popup{width:85%;}
.pub_pop_con{padding:0 1rem 1rem 1rem;}
.pub_pop_con h3{font-size: .875rem;color: #1D1D1D;}
.pub_pop_con p{font-size: .875rem;color: #1D1D1D;text-align: left;}
.pub_pop_con p a{font-size: .8125rem;text-decoration:none;color: #00BEEE;}
.pub_pop_con p a:nth-child(2){margin-left: 2rem;}
.pub_pop_con p:nth-last-child(1){text-align: right;}
.pub_pop_con p:nth-last-child(1) a{font-size: .9375rem;color: #1D1D1D;}
.close_pops{float: right;margin:-.5rem -.25rem;color: #A8A8A8;text-decoration: none;}

</style>
