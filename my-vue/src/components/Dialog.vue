<template>
  <div>
    <mt-popup v-model="popupVisibles" position="top" popup-transition="popup-fade">
        <div class="overlayer" @touchmove.prevent>
          <div class="popup">
            <h3>治疗领域检索</h3>
            <p>
              <button @click="show_ATC()" v-bind:class="{ change_hover: hide_Content }">ATC</button>
              <b>|</b>
              <button @click="show_PHIIC()" v-bind:class="{ change_hover: show_Content }">CPHIIC</button>
            </p>
            <ul v-bind:class="{ show_hide_Dialog: show_Content }">
              <li>
                <label for="">ATC一级</label>
                <select name="" ref="ATC_ONE" id="ATC_ONE" @change="get_ATC_one()">
                  <option value="">请选择</option>
                  <option v-bind:value="index" v-for="(datademo,index) in ATC_List1">{{datademo.name}}</option>
                </select>
              </li>
              <li>
                <label for="">ATC二级</label>
                <select name="" ref="ATC_TWO" id="ATC_TWO" @change="get_ATC_two()">
                  <option value="">请选择</option>
                  <option v-bind:value="index" v-for="(datademo,index) in ATC_List2">{{datademo.name}}</option>
                </select>
              </li>
              <li>
                <label for="">ATC三级</label>
                <select name="" ref="ATC_THREE" id="ATC_THREE" @change="get_ATC_three()">
                  <option value="">请选择</option>
                  <option v-bind:value="index" v-for="(datademo,index) in ATC_List3">{{datademo.name}}</option>
                </select>
              </li>
              <li>
                <label for="">ATC四级</label>
                <select name="" ref="ATC_FOUR" id="ATC_FOUR">
                  <option value="">请选择</option>
                  <option v-bind:value="index" v-for="(datademo,index) in ATC_List4">{{datademo.name}}</option>
                </select>
              </li>
              <p class="end_btn">
                <button @click="resetone()">重置</button>
                <button @click="areasearchone()">搜索</button>
              </p>
            </ul>
            <ul v-bind:class="{ show_hide_Dialog: hide_Content }">
              <li>
                <label for="">治疗大类</label>
                <select name="" ref="ZLDL" id="ZLDL" @change="get_PHIIC_one()">
                  <option value="">请选择</option>
                  <option v-bind:value="index" v-for="(shuju,index) in PHIIC_List1">{{shuju.name}}</option>
                </select>
              </li>
              <li>
                <label for="">治疗小类</label>
                <select name="" ref="ZLXL" id="ZLXL">
                  <option value="">请选择</option>
                  <option v-bind:value="index" v-for="(shuju,index) in PHIIC_List2">{{shuju.name}}</option>
                </select>
              </li>
              <p class="end_btn">
                <button @click="resettwo()">重置</button>
                <button @click="areasearchtwo()">搜索</button>
              </p>
            </ul>

          </div>
        </div>

    </mt-popup>
  </div>
</template>

<script>
import bus from '../assets/js/event.js'
import {ApiConfig} from '../assets/js/ApiConfig.js'
import { MessageBox } from 'mint-ui';
export default {
  name: 'Dialog',
  data () {
    return {
      popupVisibles:false,
      ATC_List1:[],
      ATC_List2:[],
      ATC_List3:[],
      ATC_List4:[],
      PHIIC_List1:[],
      PHIIC_List2:[],
      GetATCInfo:ApiConfig.Index.GetATCInfo,
      GetCPHIICInfo:ApiConfig.Index.GetCPHIICInfo,
      show_Content: false,
      hide_Content: true,
      ATC1:"",
      ATC2:"",
      ATC3:"",
      ATC4:"",
    }
  },
  beforeCreate:function(){},
  created: function () {
    // ATC分类取得
    this.$http.get(this.GetATCInfo).then(response => {
      this.ATC_List1 = response.body.Data;
    }, response => {
      this.$toast('加载失败！')
    });
    // PHIIC分类取得
    this.$http.get(this.GetCPHIICInfo).then(response => {
      this.PHIIC_List1 = response.body.Data;
    }, response => {
      this.$toast('加载失败！')
    });
    console.log(this.ATC_List1);
  },
  beforeMount:function(){},
  mounted: function () {
    this.receive()
  },
  beforeUpdate: function () {},
  updated: function () {},
  activated:function(){

  },
  beforeDestroy: function () {},
  destroyed: function () {},
  methods: {
    receive:function(){
      bus.$on('openDialog',()=>{
        this.popupVisibles = true
      })
    },
    resetone:function(){
      this.$refs.ATC_ONE.value = ""
      this.$refs.ATC_TWO.value = ""
      this.$refs.ATC_THREE.value = ""
      this.$refs.ATC_FOUR.value = ""
      this.ATC_List2 = [];
      this.ATC_List3 = [];
      this.ATC_List4 = [];
    },
    resettwo:function(){
      this.$refs.ZLDL.value = ""
      this.$refs.ZLXL.value = ""
      this.PHIIC_List2 = [];
    },
    areasearchone:function(){
      if(this.$refs.ATC_ONE.value != ""){
        var ATCS1 = this.$refs.ATC_ONE.value==""?"":this.ATC_List1[this.$refs.ATC_ONE.value].name
        var ATCS2 = this.$refs.ATC_TWO.value==""?"":this.ATC_List2[this.$refs.ATC_TWO.value].name
        var ATCS3 = this.$refs.ATC_THREE.value==""?"":this.ATC_List3[this.$refs.ATC_THREE.value].name
        var ATCS4 = this.$refs.ATC_FOUR.value==""?"":this.ATC_List4[this.$refs.ATC_FOUR.value].name
        var _this = this
        _this.$router.push({name: 'Library', query: { search_Type:2,ATC1:ATCS1,ATC2:ATCS2,ATC3:ATCS3,ATC4:ATCS4}});
      }else{
        //this.$toast('ATC一级是必选项！')
        MessageBox('提示', 'ATC一级是必选项！');
      }
    },
    areasearchtwo:function(){
      if(this.$refs.ZLDL.value != ""){
        var PHIIC1 = this.$refs.ZLDL.value==""?"":this.PHIIC_List1[this.$refs.ZLDL.value].name
        var PHIIC2 = this.$refs.ZLXL.value==""?"":this.PHIIC_List2[this.$refs.ZLXL.value].name
        var _this = this
        _this.$router.push({name: 'Library', query: { search_Type:3,zldl:PHIIC1,zlxl:PHIIC2}});
      }else{
        //this.$toast('治疗大类是必选项！')
        MessageBox('提示', '治疗大类是必选项！');
      }
    },
    show_ATC:function(){
      this.show_Content = false
      this.hide_Content = true
    },
    show_PHIIC:function(){
      this.show_Content = true
      this.hide_Content = false
    },
    get_ATC_one:function(){
      this.ATC_List4 = [];
      this.$refs.ATC_FOUR.value = "";
      this.ATC_List3 = [];
      this.$refs.ATC_THREE.value = "";
      this.ATC_List2 = [];
      this.$refs.ATC_TWO.value = "";
      const index1 = this.$refs.ATC_ONE.value;
      if(index1 != ''){
        this.ATC_List2 = this.ATC_List1[index1].data;
      }
    },
    get_ATC_two:function(){
      this.ATC_List4 = [];
      this.$refs.ATC_FOUR.value = "";
      this.ATC_List3 = [];
      this.$refs.ATC_THREE.value = "";
      const index2 = this.$refs.ATC_TWO.value;
      if(index2 != ''){
        this.ATC_List3 = this.ATC_List2[index2].data;
      }
    },
    get_ATC_three:function(){
      this.ATC_List4 = [];
      this.$refs.ATC_FOUR.value = "";
      const index3 = this.$refs.ATC_THREE.value;
      if(index3 != '' && index3<=this.ATC_List3.length){
        this.ATC_List4 = this.ATC_List3[index3].data;
      }
    },
    get_PHIIC_one:function(){
      this.PHIIC_List2 = [];
      this.$refs.ZLXL.value = "";
      const index1 = this.$refs.ZLDL.value;
      if(index1 != ''){
        this.PHIIC_List2 = this.PHIIC_List1[index1].data;
      }
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-popup{width:86%;height:100%;margin-left:7%;background: #fff;}
.overlayer{position:absolute;left:0;top:0;width:100%;height:100%;}

.popup ul li{display: flex;margin-bottom: 1rem;}
.popup ul li label{width:26%;font-size: .875rem;color: #494949;margin:0 .625rem 0 0;line-height: 1.875rem;}
.popup ul li select{width:67%;height:1.875rem;background:#F2F3F5;border:none;background-color:F2F3F5; border-color:transparent;-webkit-appearance: none;}

.show_hide_Dialog{display: none;}
.popup h3{font-size: 1rem;color: #33363A;font-weight: normal;text-align: left;padding: 0 0 0 1rem;}
.popup p button{border:none;background: transparent;outline: none;font-size: 1rem;}
.change_hover{color:#00ABD6;}
.popup p b{color: #F2F3F5;}
.end_btn {width:100%;padding-top: 1rem;}
.end_btn button{width:40%;height:2.1875rem;margin:0 .5rem 0 .5rem;}
.end_btn button:nth-child(1){background: #fff;border:1px solid #F2F2F4;border-radius: 0;color: #33363A;font-size: 1rem;}
.end_btn button:nth-child(2){background: #00ABD6;border:1px solid #00ABD6;border-radius: 0;color:#fff;font-size: 1rem;}
</style>
