<template>
  <div>

    <div class="swipe-wrapper">
      <mt-swipe :auto="3000" ref="swipeWrapper">
        <mt-swipe-item class="swip-item-1 item">{{Title1}}<img src="@/assets/img/banner01.png"></mt-swipe-item>
        <mt-swipe-item class="swip-item-2 item">{{Title2}}<img src="@/assets/img/banner01.png"></mt-swipe-item>
        <mt-swipe-item class="swip-item-3 item">{{Title3}}<img src="@/assets/img/banner01.png"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="button-wrapper">
      <button class="prev-button flex-item" @click="prev">prev</button>
      <button class="next-button flex-item" @click="next">next</button>
    </div>

  </div>
</template>

<script>
//import bus from '../assets/js/event.js'
export default {
  name: 'Swipe',
  props:[
    'Title1',
    'Title2',
    'Title3'
  ],
  data () {
    return {
      sonWord:'子组件传过来的内容',
      name: { value: null }
    }
  },
  mounted: function () {

  },
  methods: {
    prev: function () {
      this.$refs.swipeWrapper.prev();
      //console.log(this.$children);
    },
    next: function () {
      this.$refs.swipeWrapper.next();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.swipe-wrapper{
  width: 100%;
  height: 134px;
}
.swip-item-1{
  background: red;
}
.swip-item-2{
  background: blue;
}
.swip-item-3{
  background: green;
}
.swip-item-1 img,.swip-item-2 img,.swip-item-3 img{width:100%;}
.item{
  text-align: center;
  font-size: 40px;
  color: white;
}

.button-wrapper{
  display: flex;
  height: 100px;
}
.flex-item{
  flex: 1;
  display: inline-block;
  text-align: center;
  height: 100%;
  line-height: 100%;
  font-size: 40px;
}
.prev-button{
  background: darkorange;
}
.next-button{
  background: green;
}
</style>
