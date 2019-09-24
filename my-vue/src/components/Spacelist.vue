<template>
  <div>
    <div class="spacelist">
      <ul>
        <li>
          <router-link to="/Sale">
            <p><img src="@/assets/img/public/sales1.png" alt=""></p>
            中国销售
          </router-link>
        </li>
        <li>
          <router-link to="/Zgsb">
            <p><img src="@/assets/img/public/zgsb2.png" alt=""></p>
            中国申报
          </router-link>
        </li>
        <li>
          <router-link to="/Yzxpj">
            <p><img src="@/assets/img/public/yzxpj1.png" alt=""></p>
            一致性评价
          </router-link>
        </li>
        <li>
          <router-link to="/Appear">
            <p><img src="@/assets/img/public/zgss2.png" alt=""></p>
            中国上市
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <span @click="openPub(`全球在研`,`该模块涵盖了全球50000多个非仿制药的基本信息以及靶点适应证关系等`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
          <router-link to="/">
            <p><img src="@/assets/img/public/icon05.png" alt=""></p>
            全球在研
          </router-link>
        </li>
        <li>
          <span @click="goKsfb()"></span>
          <router-link to="/">
            <p><img src="@/assets/img/public/icon06.png" alt=""></p>
            科室分布
          </router-link>
        </li>
        <li>
          <span @click="openPub(`全球上市`,`该模块涵盖了全球主要国家（美国/欧盟/日本/加拿大/印度等）批准上市的2000多个通用名药物的基本信息`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
          <router-link to="/">
            <p><img src="@/assets/img/public/icon07.png" alt=""></p>
            全球上市
          </router-link>
        </li>
        <li>
          <span @click="openPub(`中国临床`,`该模块涵盖了自2013年起中国批准临床的近6000个试验的基本信息`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
          <router-link to="/">
            <p><img src="@/assets/img/public/icon08.png" alt=""></p>
            中国临床
          </router-link>
        </li>
      </ul>
      <div id="show_hide" style="display: none">
        <ul>
          <li>
            <span @click="openPub(`全球临床`,`该模块涵盖了全球多个国家几十万条临床试验的基本信息`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
            <router-link to="/">
              <p><img src="@/assets/img/public/icon09.png" alt=""></p>
              全球临床
            </router-link>
          </li>
          <li>
            <span @click="openPub(`全球销售`,`该模块涵盖了自2008年起全球2000多个通用名药物的销售量和销售额`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
            <router-link to="/">
              <p><img src="@/assets/img/public/icon10.png" alt=""></p>
              全球销售
            </router-link>
          </li>
          <li>
            <span @click="openPub(`GMP认证`,`该模块涵盖了多个国际GMP认证的多个企业的基本信息`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
            <router-link to="/">
              <p><img src="@/assets/img/public/icon11.png" alt=""></p>
              GMP认证
            </router-link>
          </li>
          <li>
            <span @click="openClxx()"></span>
            <router-link to="/">
              <p><img src="@/assets/img/public/icon12.png" alt=""></p>
              产量信息
            </router-link>
          </li>
        </ul>
        <ul>
          <li>
            <span @click="openPub(`药品中标`,`该模块涵盖了自2008年起全国31个地区及军区部队的10000多个通用名药物的招标采购信息`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
            <router-link to="/">
              <p><img src="@/assets/img/public/icon13.png" alt=""></p>
              药品中标
            </router-link>
          </li>
          <li>
            <span @click="openPub(`医保目录`,`该模块涵盖了国家及各地方最新版目录的6000多个通用名药物的基本信息`,`您可直接点击下方按钮申请试用，我们会尽快联系您`)"></span>
            <router-link to="/">
              <p><img src="@/assets/img/public/icon14.png" alt=""></p>
              医保目录
            </router-link>
          </li>
          <li><router-link to="/">&nbsp;</router-link></li>
          <li><router-link to="/">&nbsp;</router-link></li>
        </ul>
      </div>
      <p class="show_hide_btn_wrap">
        <button class="show_hide_btn" @click="toggle_Show()">
          <span id="toggle_con">展开更多</span>
          <span class="diyige"><img src="@/assets/img/Home/tp01.png" alt=""></span>
          <span class="dierge" style="display: none"><img src="@/assets/img/Home/tp02.png" alt=""></span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import bus from '../assets/js/event.js'
import $ from 'jquery'
export default {
  name: 'Spacelist',
  data () {
    return {

    }
  },
  beforeCreate:function(){},
  created: function () {},
  beforeMount:function(){},
  mounted: function () {},
  beforeUpdate: function () {},
  updated: function () {},
  activated:function(){},
  beforeDestroy: function () {},
  destroyed: function () {},
  methods: {
    toggle_Show:function(){
      $("#show_hide").slideToggle(300);
      if($("#toggle_con").text() == "展开更多"){
        $("#toggle_con").text("收起");
        $(".diyige").css("display","none");
        $(".dierge").css("display","block");
      }else{
        $("#toggle_con").text("展开更多");
        $(".diyige").css("display","block");
        $(".dierge").css("display","none");
      }
    },
    goKsfb:function(){
      var _this = this
      _this.$router.push({ name: 'Ksfb'});
    },
    openPub:function(datatitle,datacon1,datacon2){
      bus.$emit('openPub',{datatitle,datacon1,datacon2})
    },
    openClxx:function(){
      var _this = this
      _this.$router.push({ name: 'Clxx'});
    },

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {font-weight: normal;}
ul {list-style-type: none;padding: 0;}
li {display: inline-block;}
a {color: #42b983;}

.spacelist{width:96%;margin-left:2%;margin-top: 5rem;background: #fff;padding-top: 1.25rem;}
.spacelist ul{display: flex;justify-content: space-around;-webkit-margin-before: 0;-webkit-margin-after: 0;}
.spacelist ul li{width:25%;margin-bottom: .625rem;position: relative;}
.spacelist ul li p{width:2.8125rem;height:2.75rem;text-align: center;margin:0 auto;display: flex;justify-content: center;align-items: Center;}
.spacelist ul li p img{width:2.1875rem;}
.spacelist ul li a{text-decoration: none;color: #33363A;font-size: .8125rem;margin-bottom: .875rem;}

.show_hide_btn{display:flex;font-family: PingFangSC-Medium;color: #00ABD6;border:none;background: transparent;font-size:1rem;padding:0 5px 0 0;outline: none;}
.show_hide_btn_wrap{display: inline-flex;}
.show_hide_btn_wrap span img{width:1.875rem;margin:.1875rem 0 0 .1875rem;}

.spacelist ul li span{position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(255, 255, 255, 0.5);z-index:2;}

</style>
