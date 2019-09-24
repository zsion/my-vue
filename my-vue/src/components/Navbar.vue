<template>
  <div>
    <br>
    <div class="nav-wraps">
      <div class="page-navbar">

        <!-- navbar -->
        <mt-navbar class="page-part font-normal-size" v-model="selected">
          <mt-tab-item id="one"><span class="navbar-style yiyi">{{tabTitle1}}</span></mt-tab-item>
          <mt-tab-item id="two"><span class="navbar-style erer">{{tabTitle2}}</span></mt-tab-item>
          <mt-tab-item id="three"><span class="navbar-style sansan">{{tabTitle3}}</span></mt-tab-item>
        </mt-navbar>

        <!-- tabcontainer -->
        <mt-tab-container v-model="selected" swipeable>
          <mt-tab-container-item id="one">
            <p class="read-more"><img src="@/assets/img/Home/tp03.png" alt=""><router-link to="/Zgsb">点这里，查看更多最新数据 >></router-link></p>
            <li class="nav-ul-li oneadd" v-for="CDE in CDE_List"><span>{{CDE.date}}</span><span>{{CDE.name}}</span></li>
          </mt-tab-container-item>
          <mt-tab-container-item id="two">
            <p class="read-more"><img src="@/assets/img/Home/tp03.png" alt=""><router-link to="/Appear">点这里，查看更多最新数据 >></router-link></p>
            <li class="nav-ul-li twoadd" v-for="CFDA in CFDA_List"><span>{{CFDA.date}}</span><span>{{CFDA.name}}</span></li>
          </mt-tab-container-item>
          <mt-tab-container-item id="three">
            <p class="read-more">
              <img src="@/assets/img/Home/tp03.png" alt=""><router-link to="/Sale">点这里，查看更多最新数据 >></router-link>
              <br/><i class="jia-small">样本医院用药2018Q1商品名销售额排行榜</i>
            </p>
            <li class="nav-ul-li threeadd" v-for="(TOP, index) in TOP_List"><span>{{index+1}}</span><span>{{TOP.yptongyongming}}</span></li>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import {ApiConfig} from '../assets/js/ApiConfig.js'
export default {
  name: 'Navbar',
  props:[],
  data() {
    return {
      selected: 'one',
      tabTitle1:"CDE最新受理",
      tabTitle2:"CFDA最新生产批件",
      tabTitle3:"国内销售TOP20",
      CDE_List:[],
      CFDA_List:[],
      TOP_List:[],
      GetRank_CDE:ApiConfig.Zgsb.GetRank,
      GetRank_CFDA:ApiConfig.Zgss.GetRank,
      GetRank_TOP:ApiConfig.Index.GetSalesRank,
    };
  },
  beforeCreate: function () {},
  created: function () {
    this.$http.get(this.GetRank_CDE).then(response => {
      //console.log(response.body.Data)
      this.CDE_List = response.body.Data;
    }, response => {
      this.$toast('加载失败！')
    });
    this.$http.get(this.GetRank_CFDA).then(response => {
      //console.log(response.body.Data)
      this.CFDA_List = response.body.Data;
    }, response => {
      this.$toast('加载失败！')
    });
    this.$http.get(this.GetRank_TOP).then(response => {
      //console.log(response.body.Data)
      this.TOP_List = response.body.Data;
    }, response => {
      this.$toast('加载失败！')
    });
  },
  beforeMount: function () {},
  mounted: function () {},
  beforeUpdate: function () {},
  updated: function () {},
  beforeDestroy: function () {},
  destroyed: function () {}
}
</script>

<style scoped>
.mint-tab-container{width:96%;margin:auto;background: #fff;}
.mint-navbar .mint-tab-item{margin-top: -1.5rem;}
.mint-navbar{background: #fff!important;width:98%;margin:auto;}

.nav-wraps{margin-top: .5rem;}
.mint-navbar{background: #F6F7F5;}
.navbar-style{font-size: .75rem;border:1px solid #00B9E7;padding:0;height:50px;}
.yiyi{padding:7px 10px 7px 10px;background: #fff;}
.erer{padding:7px 7px 7px 7px;background: #fff;}
.sansan{padding:7px 3px 7px 3px;background: #fff;}
.is-selected{font-size: .75rem;border-bottom: 0!important;}
.is-selected span{background: #00B9E7;color:#fff;}
.read-more{font-size: .875rem;font-family: PingFangSC-Regular;color: #A2A8A8;letter-spacing: -1.09px;margin-top: 0;-webkit-margin-after: .5rem;}
.read-more img{width:.875rem;margin:5px 5px -3px;}
.read-more a{font-size: .875rem;color: #A2A8A8;text-decoration: none;}
.jia-small{font-style: normal;font-size: .75rem;}

.nav-ul-li{display:flex;width:100%;list-style-type: none;color: #33363A;font-size: 1rem;}
.nav-ul-li span:nth-child(1){margin:.3125rem 0 .625rem .875rem;}
.nav-ul-li span:nth-child(2){margin:.3125rem 1.25rem .625rem;}

.oneadd span:nth-child(1){width:30%;text-align: left;}
.oneadd span:nth-child(2){width:60%;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.twoadd span:nth-child(1){width:30%;text-align: left;}
.twoadd span:nth-child(2){width:60%;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.threeadd span:nth-child(1){width:7%;}
.threeadd span:nth-child(2){width:60%;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.threeadd span:nth-child(3){width:30%;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin:.3125rem 1.25rem .625rem .125rem;}

@media screen and (min-width:414px){
  .yiyi{padding:7px 15px 7px 15px;}
  .erer{padding:7px 15px 7px 15px;}
  .sansan{padding:7px 7px 7px 10px;}
}

@media screen and (min-width:410px){
  .yiyi{padding:7px 15px 7px 15px;}
  .erer{padding:7px 12px 7px 12px;}
  .sansan{padding:7px 7px 7px 10px;}
}


</style>
