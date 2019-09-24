<template>
  <div>
    <img class="share-img" src="@/assets/img/About/share.jpg" style="display:none;width:0;height:0;"/>
    <div>
      <mt-header fixed title="中国销售" style="z-index: 3;">
        <a v-if="backbtn" slot="left">
          <mt-button icon="back" @click="$router.back(-1)"></mt-button>
        </a>
      </mt-header>
      <div class="read_title">
        <p><b>|</b>{{search_Con}}</p>
      </div>
      <div class="waibu">
        <div class="xiangxi">
          <p><a href="javascript:void(0)" @click="open_pop()"><img src="@/assets/img/Library/eye.png" alt=""> 详细数据<span>>></span></a></p>
        </div>
        <div class="swipe-wrapper">
          <mt-swipe :auto="0" ref="swipeWrapper" :continuous=false >
            <mt-swipe-item class="swip-item-1 item">
              <div id="chart1" style="width:375px;height:300px;padding:5px;margin:auto;">

              </div>
            </mt-swipe-item>
            <mt-swipe-item class="swip-item-2 item">
              <div id="chart2" style="width:375px;height:325px;padding:5px;margin:auto;">

              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="huamore"><p>< &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;左右滑动  查看更多&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ></p></div>
      </div>

    </div>

    <div class="part_two">
      <div class="xiaolaba">
        <div class="laba">
          <a href="javascript:void(0)" @click="xianshi()"><img src="@/assets/img/Chart/laba.png" alt=""></a>
        </div>
        <div class="labanr" v-bind:class="{ yincang: labacon }">
          <p >点击饼图某个部分（不包括其他）</p>
          <p >展示详细细分领域</p>
        </div>
      </div>
      <div class="page-navbar">
        <!-- navbar -->
        <mt-navbar class="page-part font-normal-size" v-model="selected">
          <mt-tab-item id="one"><span class="navbar-style">{{tabTitle1}}</span></mt-tab-item>
          <b>|</b><mt-tab-item id="two"><span class="navbar-style">{{tabTitle2}}</span></mt-tab-item><b>|</b>
          <mt-tab-item id="three"><span class="navbar-style">{{tabTitle3}}</span></mt-tab-item>
        </mt-navbar>
        <!-- tabcontainer -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="one">
            <div id="detail_chart1" style="width:375px;height:300px;"></div>
            <div v-show="contab1" id="chart2_1" style="width:99%;height:300px;margin:0 auto;margin-bottom: 1rem;"></div>
            <div v-show="contab1" id="chart2_2" style="width:99%;height:300px;margin:0 auto;margin-bottom: 1rem;"></div>
          </mt-tab-container-item>
          <mt-tab-container-item id="two">
            <div id="detail_chart2" style="width:375px;height:300px;"></div>
            <div v-show="contab2" id="chart2_3" style="width:99%;height:300px;margin:0 auto;margin-bottom: 1rem;"></div>
            <div v-show="contab2" id="chart2_4" style="width:99%;height:300px;margin:0 auto;margin-bottom: 1rem;"></div>
          </mt-tab-container-item>
          <mt-tab-container-item id="three">
            <div id="detail_chart3" style="width:375px;height:300px;"></div>
            <div v-show="contab3" id="chart2_5" style="width:99%;height:300px;margin:0 auto;margin-bottom: 1rem;"></div>
            <div v-show="contab3" id="chart2_6" style="width:99%;height:300px;margin:0 auto;margin-bottom: 1rem;"></div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
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
export default {
  name: 'Chart',
  data () {
    return {
      backbtn:true,
      popupVisible:false,
      contab1:false,
      contab2:false,
      contab3:false,
      labacon:false,
      GetChart1_Drug:ApiConfig.Sales.GetChart1_Drug,
      GetChart1_Company:ApiConfig.Sales.GetChart1_Company,
      GetChart1_ATC:ApiConfig.Sales.GetChart1_ATC,
      GetChart1_CPHIIC:ApiConfig.Sales.GetChart1_CPHIIC,
      GetChart2_Drug:ApiConfig.Sales.GetChart2_Drug,
      GetChart2_Company:ApiConfig.Sales.GetChart2_Company,
      GetChart2_ATC:ApiConfig.Sales.GetChart2_ATC,
      GetChart2_CPHIIC:ApiConfig.Sales.GetChart2_CPHIIC,
      CheckWechatAuth:ApiConfig.Member.CheckWechatAuth,
      doWechatAuth:ApiConfig.Member.doWechatAuth,
      getWechatJsInfo:ApiConfig.Index.getWechatJsInfo,
      selected: 'one',
      tabTitle1:"",
      tabTitle2:"",
      tabTitle3:"",
      chartObj : [
        {search_type:0,comment:'药品查询',tabs:['企业细分','剂型细分','地区细分']}
        ,{search_type:1,comment:'企业查询',tabs:['药品细分','ATC一级细分','地区细分']}
        ,{search_type:2,comment:'ATC查询',tabs:['药品细分','企业细分','剂型细分']}
        ,{search_type:3,comment:'CPHIIC查询',tabs:['药品细分','企业细分','剂型细分']}
      ],
      curChartObj : null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      myChart6: null,
      myChart7: null,
      myChart8: null,
      myChart9: null,
      myChart10: null,
      myChart11: null,
      search_Type:"",
      search_Con:"",
      color1:['#00B8FF'],
      color2:['#8cbaf9','#f9dc71','#f2a385','#babdc0'],
    }
  },
  beforeCreate: function () {},
  created: function () {
    //this.checkAuth();
    this.f_chart();
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
    next()
  },
  activated:function(){
    if(!this.$route.meta.isBack){
      //this.checkAuth();
      this.f_chart();
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
            this.f_chart();
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
            this.f_chart();
          }else{
            this.$toast(response.body.Message)
          }
        }, response => {
          this.$toast('加载失败！')
        });
      }
    },
    f_chart_detail:function(item,obj){
      console.log(item)
      console.log(obj)
      Indicator.open('加载中...');
      var sUrl = "";
      var con = {};
      switch(this.curChartObj.search_type){
        case 0:
          sUrl = this.GetChart2_Drug;
          con.keywords = this.$route.query.search_Con;
          break;
        case 1:
          sUrl = this.GetChart2_Company;
          con.keywords = this.$route.query.search_Con;
          break;
        case 2:
          sUrl = this.GetChart2_ATC;
          con.ATC1 = this.$route.query.ATC1;
          con.ATC2 = this.$route.query.ATC2;
          con.ATC3 = this.$route.query.ATC3;
          con.ATC4 = this.$route.query.ATC4;
          break;
        case 3:
          sUrl = this.GetChart2_CPHIIC;
          con.zldl = this.$route.query.zldl;
          con.zlxl = this.$route.query.zlxl;
          break;
      }
      con.item_keywords = item.name
      con.type = obj.detailtype;
      con.token = getCookie("token")
      this.$http.post(sUrl,con,{emulateJSON: true}).then(response => {
        this.charts = response.body.Data;
        for (var i=0 ; i<this.charts.length ;i++ )
        {
          switch(this.charts[i].type){
            case 0:
              switch(this.curChartObj.search_type){
                case 0:
                  if (obj.detailtype==2)
                  {
                    if (this.myChart8!=null) this.myChart8.dispose();
                    this.myChart8 = this.$echarts.init(document.getElementById('chart2_3'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.yAxis.show = false;
                    this.myChart8.setOption(option);

                  }
                  if (obj.detailtype==3)
                  {
                    if (this.myChart6!=null) this.myChart6.dispose();
                    this.myChart6 = this.$echarts.init(document.getElementById('chart2_1'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.yAxis.show = false;
                    this.myChart6.setOption(option);
                  }
                  break;
                case 1:
                case 2:
                case 3:
                  if (obj.detailtype==2)
                  {
                    if (this.myChart6!=null) this.myChart6.dispose();
                    this.myChart6 = this.$echarts.init(document.getElementById('chart2_1'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.yAxis.show = false;
                    this.myChart6.setOption(option);
                  }
                  if (obj.detailtype==3)
                  {
                    if (this.myChart8!=null) this.myChart8.dispose();
                    this.myChart8 = this.$echarts.init(document.getElementById('chart2_3'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.yAxis.show = false;
                    this.myChart8.setOption(option);
                  }
                  break;
              }

              if (obj.detailtype==4)
              {
                if (this.myChart10!=null) this.myChart10.dispose();
                this.myChart10 = this.$echarts.init(document.getElementById('chart2_5'));
                var option = this.initChart(this.charts[i]);
                option.color = [item.color];
                option.yAxis.show = false;
                this.myChart10.setOption(option);
              }
              break;
            case 1:
              switch(this.curChartObj.search_type){
                case 0:
                  if (obj.detailtype==3)
                  {
                    if (this.myChart7!=null) this.myChart7.dispose();
                    this.myChart7 = this.$echarts.init(document.getElementById('chart2_2'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.xAxis.show = false;
                    this.myChart7.setOption(option);
                  }
                  if (obj.detailtype==2)
                  {
                    if (this.myChart9!=null) this.myChart9.dispose();
                    this.myChart9 = this.$echarts.init(document.getElementById('chart2_4'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.xAxis.show = false;
                    this.myChart9.setOption(option);
                  }
                  break;
                case 1:
                case 2:
                case 3:
                  if (obj.detailtype==2)
                  {
                    if (this.myChart7!=null) this.myChart7.dispose();
                    this.myChart7 = this.$echarts.init(document.getElementById('chart2_2'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.xAxis.show = false;
                    this.myChart7.setOption(option);
                  }
                  if (obj.detailtype==3)
                  {
                    if (this.myChart9!=null) this.myChart9.dispose();
                    this.myChart9 = this.$echarts.init(document.getElementById('chart2_4'));
                    var option = this.initChart(this.charts[i]);
                    option.color = [item.color];
                    option.xAxis.show = false;
                    this.myChart9.setOption(option);
                  }
                  break;
              }
              if (obj.detailtype==4)
              {
                if (this.myChart11!=null) this.myChart11.dispose();
                this.myChart11 = this.$echarts.init(document.getElementById('chart2_6'));
                var option = this.initChart(this.charts[i]);
                option.color = [item.color];
                option.xAxis.show = false;
                this.myChart11.setOption(option);
              }
              break;
          }
        }
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });
    },
    f_chart:function(){
      Indicator.open('加载中...');

      var types = this.$route.query.search_Type
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
      for(var i=0;i<this.chartObj.length;i++){
        if (types==this.chartObj[i].search_type)
        {
          this.curChartObj = this.chartObj[i];
          break;
        }
      }

      var sUrl = "";
      var con = {};
      con.token = getCookie("token");
      switch(this.curChartObj.search_type){
        case 0:
          sUrl = this.GetChart1_Drug;
          con.keywords = this.$route.query.search_Con;
          break;
        case 1:
          sUrl = this.GetChart1_Company;
          con.keywords = this.$route.query.search_Con;
          break;
        case 2:
          sUrl = this.GetChart1_ATC;
          con.ATC1 = this.$route.query.ATC1;
          con.ATC2 = this.$route.query.ATC2;
          con.ATC3 = this.$route.query.ATC3;
          con.ATC4 = this.$route.query.ATC4;
          break;
        case 3:
          sUrl = this.GetChart1_CPHIIC;
          con.zldl = this.$route.query.zldl;
          con.zlxl = this.$route.query.zlxl;
          break;
      }
      if (this.myChart1!=null)	this.myChart1.dispose();
      if (this.myChart2!=null)	this.myChart2.dispose();
      if (this.myChart3!=null)	this.myChart3.dispose();
      if (this.myChart4!=null)	this.myChart4.dispose();
      if (this.myChart5!=null) this.myChart5.dispose();
      if (this.myChart6!=null) this.myChart6.dispose();
      if (this.myChart7!=null) this.myChart7.dispose();
      if (this.myChart8!=null)	this.myChart8.dispose();
      if (this.myChart9!=null)	this.myChart9.dispose();
      if (this.myChart10!=null) this.myChart10.dispose();
      if (this.myChart11!=null) this.myChart11.dispose();

      this.$http.post(sUrl,con,{emulateJSON: true}).then(response => {
        const charts = null;
        this.charts = response.body.Data;

        this.tabTitle1 = this.curChartObj.tabs[0];
        this.tabTitle2 = this.curChartObj.tabs[1];
        this.tabTitle3 = this.curChartObj.tabs[2];
        var that = this;
        for (var i=0 ; i<this.charts.length ;i++ )
        {
          switch(this.charts[i].type){
            case 0:
              if (this.myChart1!=null)	this.myChart1.dispose();
              this.myChart1 = this.$echarts.init(document.getElementById('chart1'));
              var option = this.initChart(this.charts[i]);
              option.color = this.color1;
              option.yAxis.show = false;
              this.myChart1.setOption(option);
              break;
            case 1:
              if (this.myChart2!=null)	this.myChart2.dispose();
              this.myChart2 = this.$echarts.init(document.getElementById('chart2'));
              var option = this.initChart(this.charts[i]);
              option.color = this.color1;
              option.xAxis.show = false;
              this.myChart2.setOption(option);
              break;
            case 2:
              switch(this.curChartObj.search_type){
                case 0:
                  if (this.myChart4!=null)	this.myChart4.dispose();
                  this.myChart4 = this.$echarts.init(document.getElementById('detail_chart2'));
                  var option = this.initChart(this.charts[i]);
                  option.xAxis = null;
                  option.yAxis = null;
                  option.color = this.color2;
                  option.series.radius='50%';
                  this.myChart4.on('click', function (params) {
                    if (params.name=="其他"){
                      that.$toast('该操作无效，请点击彩色的部分！')
                      return
                    }
                    that.f_chart_detail(params,this);
                    that.contab2 = true
                  });
                  this.myChart4.setOption(option);
                  this.myChart4.detailtype = this.charts[i].type;
                  this.myChart4.curChartObj = this.curChartObj;
                  break;
                case 1:
                case 2:
                case 3:
                  if (this.myChart3!=null)	this.myChart3.dispose();
                  this.myChart3 = this.$echarts.init(document.getElementById('detail_chart1'));
                  option = this.initChart(this.charts[i]);
                  option.xAxis = null;
                  option.yAxis = null;
                  option.color = this.color2;
                  option.series.radius='50%';
                  this.myChart3.on('click', function (params)  {
                    if (params.name=="其他") {
                      that.$toast('该操作无效，请点击彩色的部分！')
                      return
                    }
                    that.f_chart_detail(params,this);
                    that.contab1 = true
                  });
                  this.myChart3.setOption(option);
                  this.myChart3.detailtype = this.charts[i].type;
                  this.myChart3.curChartObj = this.curChartObj;
                  break;
              }
              break;
            case 3:
              switch(this.curChartObj.search_type){
                case 0:
                  if (this.myChart3!=null)	this.myChart3.dispose();
                  this.myChart3 = this.$echarts.init(document.getElementById('detail_chart1'));
                  option = this.initChart(this.charts[i]);
                  option.xAxis = null;
                  option.yAxis = null;
                  option.color = this.color2;
                  option.series.radius='50%';
                  this.myChart3.on('click', function (params)  {
                    if (params.name=="其他") {
                      that.$toast('该操作无效，请点击彩色的部分！')
                      return
                    }
                    that.f_chart_detail(params,this);
                    that.contab1 = true
                  });
                  this.myChart3.setOption(option);
                  this.myChart3.detailtype = this.charts[i].type;
                  this.myChart3.curChartObj = this.curChartObj;
                  break;
                case 1:
                case 2:
                case 3:
                  if (this.myChart4!=null)	this.myChart4.dispose();
                  this.myChart4 = this.$echarts.init(document.getElementById('detail_chart2'));
                  var option = this.initChart(this.charts[i]);
                  option.xAxis = null;
                  option.yAxis = null;
                  option.color = this.color2;
                  option.series.radius='50%';
                  this.myChart4.on('click', function (params) {
                    if (params.name=="其他"){
                      that.$toast('该操作无效，请点击彩色的部分！')
                      return
                    }
                    that.f_chart_detail(params,this);
                    that.contab2 = true
                  });
                  this.myChart4.setOption(option);
                  this.myChart4.detailtype = this.charts[i].type;
                  this.myChart4.curChartObj = this.curChartObj;
                  break;
              }
              break;
            case 4:
              if (this.myChart5!=null)	this.myChart5.dispose();
              this.myChart5 = this.$echarts.init(document.getElementById('detail_chart3'));
              var option = this.initChart(this.charts[i]);
              option.xAxis = null;
              option.yAxis = null;
              option.color = this.color2;
              option.series.radius='50%';
              this.myChart5.on('click', function (params) {
                if (params.name=="其他"){
                  that.$toast('该操作无效，请点击彩色的部分！')
                  return
                }
                that.f_chart_detail(params,this);
                that.contab3 = true
              });
              this.myChart5.setOption(option);
              this.myChart5.detailtype = this.charts[i].type;
              this.myChart5.curChartObj = this.curChartObj;

              break;
          }
        }
        Indicator.close();
      }, response => {
        Indicator.close();
        this.$toast('加载失败！')
      });

    },
    initChart: function(obj){
      var chart = {};
      if (obj.title!=null)
      {
        chart.title = obj.title;
        chart.title.textStyle={color:'#31363B',fontSize:'16',fontWeight:'normal'}
      }

      if (obj.series!=null)
      {
        chart.series = obj.series;
        if(chart.series.type == 'pie'){
          chart.series.label = {
            formatter: function (params){
              if(params.dataIndex === 0){
                return `${params.percent}%`
              }else{
                return ``
              }
            }
          };
          for(var j=0 ; j<chart.series.data.length ;j++){
            if(j === 0){
              chart.series.data[j].labelLine = {normal: {show:true},emphasis: {show: true}}
            }else{
              chart.series.data[j].labelLine = {normal: {show:false},emphasis: {show: false}}
            }
          }
        }

      }
      else{
        return {};
      }
      if (obj.xAxis != null)
      {
        chart.xAxis =obj.xAxis;
      }
      else{
        chart.xAxis = {};
      }
      if (obj.yAxis!=null && obj.yAxis.data!=null)
      {
        chart.yAxis =obj.yAxis;
      }
      else{
        chart.yAxis = {};
      }
      if (obj.legend!=null)
      {
        chart.legend =obj.legend;
      }
      else{
        chart.legend = {};
      }
      chart.legend.top = '30px';
      console.log(chart)
      return chart;
    },
    xianshi:function(){
      if(this.labacon == false){
        this.labacon = true
      }else{
        this.labacon = false
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
.mint-navbar .mint-tab-item.is-selected{border-bottom: 0;}
.is-selected div span{border-bottom: 2px solid #00B8FF;}
.swipe-wrapper{width: 100%;height: 300px;}
.swip-item-1{}
.swip-item-2{}
.swip-item-1 img,.swip-item-2 img,.swip-item-3 img{width:100%;}
.item{text-align: center;font-size: 40px;color: white;}

.read_title{position:fixed;top:2.5rem;left:0;width:100%;color:#000;border-bottom:1px solid #E1EDEE;background: #fff;z-index: 3;}
.read_title p{height:2.5rem;font-weight:bold;line-height:2.5rem;color: #31363B;font-size: 1rem; -webkit-margin-before: 0;-webkit-margin-after: 0;text-align: left;padding-left: 1rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.read_title p b{background:#00B1E0;color:#00B1E0;line-height:2.5rem;font-size: 1rem;padding-right: .1rem;margin-right: .3rem;}
.waibu{background: #fff;overflow: hidden;margin:5.5rem 0 .5rem;position: relative;}
.huamore p{-webkit-margin-before: 0;font-size: .75rem;color:#333333;}

.xiangxi{position: absolute;top:-.5rem;right:.3rem;z-index:2;}
.xiangxi p a{font-size: .75rem;color: #31363B;text-decoration: none;}
.xiangxi p a img{display: inline-flex;width:.625rem;}
.xiangxi p a span{font-size: .625rem;color: #9A9A9A;}

.part_two{width:96%;margin:0 auto;position: relative;}
.xiaolaba{position: absolute;top:3rem;right:0;}
.labanr{width:6rem;position:absolute;top:3.5rem;right:0;z-index:2;overflow: hidden;background: #FFFFFF;box-shadow: 0 4px 14px 0 rgba(0,0,0,0.10);border-radius: 5px;padding:.5rem;}
.labanr p{font-size: .75rem;color: #666666;-webkit-margin-before: 0;-webkit-margin-after: 0;text-align: center;}
.laba{position: absolute;top:2.2rem;right:0;z-index: 2;}
.laba a img{width:.9375rem;}
.yincang{display: none;}

.page-part b{line-height:2.875rem;color: #E8E8E8;}
#chart2_1,#chart2_2,#chart2_3,#chart2_4,#chart2_5,#chart2_6{background: #FFFFFF;border: 1px solid #E1EDEE;box-shadow: 0 4px 14px 0 rgba(0,0,0,0.07);border-radius: 5px;margin-bottom: 1rem;padding:5px;}

.mint-navbar{border: 1px solid #E1EDEE;border-radius: 5px;}
.navbar-style{font-size: 1rem;color: #31363B;padding-bottom:.5rem;}
.mint-navbar .mint-tab-item.is-selected{margin-bottom: 0;}

.mint-popup{width:85%;}
.pub_pop_con{padding:0 1rem 1rem 1rem;}
.pub_pop_con h3{font-size: .875rem;color: #1D1D1D;-webkit-margin-after: 1rem;-webkit-margin-before: 1rem;}
.pub_pop_con p{font-size: .875rem;color: #1D1D1D;text-align: left;-webkit-margin-after: .5rem;-webkit-margin-before: .5rem;}
.pub_pop_con p a{font-size: .8125rem;text-decoration:none;color: #00BEEE;}
.pub_pop_con p a:nth-child(2){margin-left: 2rem;}
.pub_pop_con p:nth-last-child(1){text-align: right;}
.pub_pop_con p:nth-last-child(1) a{font-size: .9375rem;color: #00BEEE;}
.close_pops{float: right;margin:-.5rem -.25rem;color: #A8A8A8;text-decoration: none;}



</style>
