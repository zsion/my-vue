<template>
  <div>
      <div class="null_con">
        <h3><img src="@/assets/img/Null/null.png" alt=""></h3>
        <p>您的页面走丢了</p>
        <p>正在为您疯狂跳转回主页…</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Null',
  data () {
    return {

    }
  },
  beforeCreate: function () {},
  created: function () {},
  beforeMount: function () {},
  mounted: function () {
    this.Path()
  },
  beforeUpdate: function () {},
  updated: function () {},
  beforeDestroy: function () {},
  destroyed: function () {},
  methods: {
    Path:function(){
      var _this = this
      setTimeout(function(){
        _this.$router.push({name: 'Home'});
      },3000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.null_con{position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;width:250px;height:200px;}
.null_con h3{-webkit-margin-before:0;}
.null_con h3 img{width:5.375rem;}
.null_con p{font-size: 1.25rem;color: #B0B8C8;text-align: center;line-height: 1.875rem;-webkit-margin-before:0;-webkit-margin-after:0;}
</style>
