<template>
  <div id="app">
    <el-menu :default-active="activeMenu" class="menu" mode="horizontal"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
      <!--v-if="user.type == 'DEPT_MANAGER'"-->
      <el-submenu index="1" v-if="user.type == 'DEPT_MANAGER'">
        <template slot="title">经营者报表</template>
        <el-menu-item index="1-1"><router-link to="/ManagerReached">销售达成</router-link></el-menu-item>
      </el-submenu>
      <!--v-if="user.type == 'SALER'"-->
      <el-submenu index="2" v-if="user.type == 'SALER'">
        <template slot="title">销售分析</template>
        <el-menu-item index="2-1"><router-link to="/SaleReached">销售达成</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="/SaleDetail">销售明细分析</router-link></el-menu-item>
      </el-submenu>

      <el-submenu index="3" v-if="user.type == 'DEPT_MANAGER'">
        <template slot="title">销售目标</template>
        <el-menu-item index="3-1"><router-link to="/saleTarget">目标制定</router-link></el-menu-item>
        <!-- <el-menu-item index="3-2"><router-link to="/saleTarget">目标制定-采销经理</router-link></el-menu-item> -->
        <el-menu-item index="3-3">目标对比</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">销售计划</template>
        <el-menu-item index="4-1"><router-link to="/salePlan">品类品牌-月周天计划</router-link> </el-menu-item>
        <!-- <el-menu-item index="4-2"><router-link to="/salePlan">品类品牌sku-天计划</router-link> </el-menu-item> -->
        <el-menu-item index="4-3">促销计划</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">综合毛利管理</template>
          <el-menu-item index="4-4-1">广告</el-menu-item>
          <el-menu-item index="4-4-2">销售毛利</el-menu-item>
          <el-menu-item index="4-4-3">返利管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-5">综合报表</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">数据报表</template>
        <el-menu-item index="5-1">销售整体分析</el-menu-item>
        <el-menu-item index="5-2"><router-link to="/StockCover">stockcover报表</router-link></el-menu-item>
        <el-menu-item index="5-3">客单分析报表</el-menu-item>
        <el-menu-item index="5-4"><router-link to="/versionManager">版本管理</router-link> </el-menu-item>
      </el-submenu>

      <!--<el-menu-item index="6">-->
        <!--<router-link to="/planSetting">计划设置</router-link>-->
      <!--</el-menu-item>-->

    </el-menu>

      <router-view>

      </router-view>
    <!--<keep-alive></keep-alive>-->
    <!--  -->
  </div>
</template>

<script>
  import '@/assets/less/basic.less' // 全局样式
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name: 'App',
    methods: {
      ...mapMutations(['setAuthority', 'setVersionList', 'setUserTreeData']),
      ...mapMutations('cond', ['setTreeData'])
    },
    computed: {
      ...mapGetters({
        erp: 'getErp',
        user: 'getUser'
      }),
      activeMenu () {
        let path = this.$router.currentRoute.path
        if (path === '/SaleDetail') {
          return '2-2'
        } else if (path === '/SaleReached') {
          return '2-1'
        } else if (path === '/ManagerReached') {
          return '1-1'
        } else if (path === '/saleTarget') {
          return '3-1'
        } else if (path === '/salePlan') {
          return '3-1'
        } else if (path === '/versionManager') {
          return '5-4'
        } else if (path === '/StockCover') {
          return '5-2'
        }
        return '3-1'
      }
    },
    created () {
      // Api.getRole({}).then(rs => {
      //   if (rs.success === true) {
      //     console.log('权限', rs.data)
      //     this.setAuthority(rs.data)
      //   }
      // }).then(() => this.$refs.authority.initRole()).then(() => {
      //   this._api.saleTarget.queryAdjustVersion({dept3Id: this.user.dept3Id, year: (new Date()).getFullYear()}).then(this._do('获取版本_ok', d => {}, d => {
      //     this.setVersionList(d)
      //   })).then(() => {
      //     let cond = {dept3Id: this.user.dept3Id, roleType: this.user.type}
      //     this._api.common.getTree(cond).then(this._do('请求品类品牌_ok', d => {
      //       this.isTreeloading = false
      //     }, (d) => {
      //       console.info('加载左侧树完成......,保存到store')
      //       this.setUserTreeData(d)
      //     }))
      //     this._bus.$emit(this._CONST.E_USERINFO_CHANGE)
      //   })
      // })
    }
  }
</script>
