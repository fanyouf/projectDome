<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <div class="color-list">
      <div
        class="color-item"
        v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
        :key="color.text"
      >
        <el-tag>{{color.text}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Tag } from 'element-ui'
  Vue.use(Tag)
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        colors: [{
          text: 'Aquamarine'
        }, {text: 'red'}]
      }
    },
    created () {
      this.msg = 'ok'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .color-list {text-align: left;}
  /* .color-list .color-item::before{
      content: 'a';
      float:left;
      width: 20px;
      height: 20px;
    } */
</style>
