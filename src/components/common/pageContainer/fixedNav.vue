<template lang="html">
  <div class="fixedNav">
    <ul>
      <li @click="click" v-for="(item,index) in list" :key="index" :data-name="item.name">{{item.name}}</li>
    </ul>
  </div>
</template>
<style scoped>
  .fixedNav{
    position: fixed;
    right:0px;
    bottom:40%;
    background: rgba(255,255,255,0.80);
    border: 1px solid #DEDEDE;
    border-radius: 2px;
  }
  ul,li{list-style: none}
  li{
    width: 50px;line-height: 20px;
    background-color: #fff;
    padding:2px 5px 2px 5px;
    cursor: pointer;
    text-align: center;
    font-family: MicrosoftYaHei;
    /*font-size: 14px;*/
    color: #666666;
    margin-left:5px;
    margin-right:5px;
    border-bottom: 1px solid #DEDEDE;
  }
</style>
<script>
export default {
  props: {
    pitems: {
      type: Array
    }
  },
  data () {
    return {
      list: this.pitems
    }
  },
  methods: {
    click (e) {
      this.$emit('gotoItem', e.target.dataset.name)
    }
  }
}
</script>
