<template>
  <Icon type="ios-help-outline" :title="titleInfo" style="cursor: help;"></Icon>
</template>
<script>
  export default{
      props:{titleInfo:{type:String,default:""}}
  }
</script>
