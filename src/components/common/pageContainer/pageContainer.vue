<template>
  <div>
      <item-sort
        :pitems="planeList"
        @itemSortChange="handlerItemSortChange" />
        <fixed-nav
          :pitems="planeList"
          @gotoItem="scrollto" />

      <div class="planeList" ref="planes">
        <!-- <el-card class="box-card" v-for="o in 4" :key="o" :ref="'card'+o" :data-name="'card'+o">
            {{'内容 ' + o }}
        </el-card> -->
        <!-- 这里放置块级元素：
        （1）class是box-card
        （2）:data-name是卡片的名字 -->
        <slot></slot>
      </div>
  </div>
</template>

<style scoped>
  .card-box{
    padding:10px 20px;
    border:1px solid #ddd;
    border-radius: 5px;
    margin:5px;
  }
</style>
<script>
import ItemSort from './ItemSort'
import fixedNav from './fixedNav'
export default {
  name: 'App',
  components: {
    ItemSort,
    fixedNav
  },
  data () {
    return {
      planeList: []
    }
  },
  methods: {
    scrollto (d) {
      let children = [...this.$refs.planes.children]

      let rst = children.find(item => {
        return item.dataset.name === d
      })
      window.scrollTo(0, rst.offsetTop)

      console.dir(rst)
    },
    handlerItemSortChange (d) {
      console.info(d)
      let children = [...this.$refs.planes.children]
      console.info(children)

      d.forEach((item, index) => {
        let rst = children.find(d => {
          return d.dataset.name === item.name
        })

        rst.style.order = index

        rst.style.display = item.visiable ? 'block' : 'none'
        // console.info(this.$refs[item.name][0].$el)
        // this.$refs[item.name][0].$el.style.order = index
        // this.$refs[item.name][0].$el.style.display = item.visiable ? "block" : "none"
      })
    }
  },
  mounted () {
    console.log('this.$refs', this.$refs)
    let children = [...this.$refs.planes.children]
    console.info(this.$refs.card1)

    children.forEach(item => {
      if (item.className === 'card') {
        this.planeList.push({name: item.dataset.name, visiable: true})
      }
    })
  }
}
</script>

<style>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center;
    line-height: 160px; */
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .planeList{
    display: flex;
    flex-direction: column;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
