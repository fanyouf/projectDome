<template lang="html">
  <RadioGroup v-model="value1" type="button" size="small">
    <!-- <Radio  label="yoy"><span>同比</span></Radio> -->
    <Radio v-for="item in list" :label="item.value" :key="item.value"><span>{{item.label}}</span></Radio>
  </RadioGroup>
</template>

<script>
export default {
  data(){
    return {
      value1: this.defaultValue
    }
  },
  props:{
    value:{type:[Number,String]},
    list:{type: Array,required: true},
    defaultValue:{
      type:[Number,String],
      required: true,
      // validator: function (value) {
      //   return this.list.findIndex(item => item.value === value) != -1
      // }
    }
  },
  watch:{
    value1(){
      this.$emit("input",this.value1)
    }
  }
}
</script>
