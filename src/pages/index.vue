<template>
  <div>
    <pageContainer>
      <div class="box-card" :data-name="'项目1'">

       <draggableLine :data="data1" @dataChange="dataChange">  </draggableLine>
      <button @click="click">asfs</button>
      <div>
        {{data1}} - {{sum}}
      </div>
      </div>
    </pageContainer>
  </div>
</template>
<script>
import pageContainer from "@/components/common/pageContainer/pageContainer";
import draggableLine from "@/components/common/dragableLine.vue"

export default {
  components: { pageContainer ,draggableLine},
  data() {
    return {
      data1:[['星期一', 0], ['星期二', 10], ['星期三', 20], ['星期四', 30], ['星期五', 40]],
    }
  },
  computed:{
    sum(){
      let sum = 0;
      this.data1.forEach(item=>sum+=item[1])
      return sum
    }
  },

  methods: {
    dataChange(payload){

      this.$set(this.data1[payload.index], 1, payload.value)
      //this.data1[payload.index][1] = payload.value;
      console.info(payload,this.data1,this.sum)
    },
    click(){
      this.data1[3][1] = 0;
      console.info(this.data1)
      this.data1.push(["asdfsd",10])
      // let sum = 0;
      // this.data1.forEach(item=>sum+=item[1])
      console.info(this.sum)


    }
  }
};
</script>

