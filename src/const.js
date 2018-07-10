/**
系统中所有的常量设置 */
const con = {
  PAGETYPE_PLANPRICE: 'planPrice',
  PAGETYPE_PLANGMV: 'planGMV',
  PAGETYPE_PLANSALE: 'planSale',
  PAGETYPE_TARGET: 'target',
  PAGETYPE_TARGET_VIEW: 'viewTarget',
  QMWD: [{label: '季', value: 'Q'}, {label: '月', value: 'M'}, {label: '周', value: 'W'}, {label: '天', value: 'D'}],
  TARTETVERSIONS: [{label: '考核目标', value: 'ASSESSMENT'}, {label: '挑战目标', value: 'CHALLENGE'}, {label: '草稿', value: 'DRAFT'}],
  VERSIOIN_TYPE_VALUE_MAP: {CHALLENGE: '挑战目标', ASSESSMENT: '考核目标'},
  TIMEDEMATION_TYPE_VALUE_MAP: {Q: '季', M: '月', W: '周', D: '天'},
  MONEYUNIT_MAP: {yuan: '元', thousand: '千', million: '百万'},
  DEFAULTVERSION: 'DRAFT',
  VERSION_TYPE_DRAFT: 'DRAFT',
  SPLITPERCENTS: [60, 30, 10], // 默认拆分比例
  E_SPLIT_CHANGE: 'SPLIT_CHANGE', // 切分比例变换事件名
  E_SPLIT_DATA_CHANGE: 'SPLIT_DATA_CHANGE', // 切分提供给漏斗图的数据变化事件名
  E_SCATTER_DATA: 'E_SCATTER_DATA', // 散点图的数据
  E_ANALYSISTREND_DATA: 'E_ANALYSISTREND_DATA', // 趋势分析的数据
  E_ANALYSISCOMBINATION_DATA: 'E_ANALYSISCOMBINATION_DATA', // 组合分析的数据
  // ----------------
  E_YEAR_CHANGE: 'E_YEAR_CHANGE', // 年份变化
  E_DATELEVEL_CHANGE: 'E_DATELEVEL_CHANGE', // 日期数据维度的变化 季月 - 周天
  E_DATETYPE_CHANGE: 'E_DATETYPE_CHANGE', // 日期数据维度的变化 季 - 月 - 周 - 天
  // E_TARGETSETTING_QUERY:"E_DATETYPE_CHANGE",  //日期数据维度的变化 季 - 月 - 周 - 天
  E_TARGETSPLIT_CHANGE: 'E_TARGETSPLIT_CHANGE', // 目标拆分到月
  E_MONEYUNIT_CHANGE: 'E_MONEYUNIT_CHANGE', // 金额的单位：圆，千，发生了变化
  E_TOOLBAR_EXPENDRATE_CHANGE: 'E_TOOLBAR_EXPENDRATE_CHANGE', // 是否显示横向时间占比
  E_TOOLBAR_SHOWTABLE_CHANGE: 'E_TOOLBAR_SHOWTABLE_CHANGE', // 工具条： 显示表格的变化
  E_TOOLBAR_BAND_CHANGE: 'E_TOOLBAR_BAND_CHANGE', // 工具条： 展示品牌的变化
  E_TOOLBAR_TOTOAL_CHANGE: 'E_TOOLBAR_TOTOAL_CHANGE', //  工具条：修改总值变化
  E_TOOLBAR_TOTOAL_INIT: 'E_TOOLBAR_TOTOAL_INIT', //  工具条：修改总值初始化
  E_TOOLBAR_PREV_CHANGE: 'E_TOOLBAR_PREV_CHANGE',
  E_TOOLBAR_BACK_CHANGE: 'E_TOOLBAR_BACK_CHANGE',

  E_SIDEBAR_SKU_CHANGE: 'E_SIDEBAR_SKU_CHANGE', // 是否显示sku发生了变化
  E_SIDEBAR_DIMENSION_CHANGE: 'E_SIDEBAR_DIMENSION_CHANGE', // 左侧siderbar上数据维度变化
  E_SIDEBAR_LEVEL_CHANGE: 'E_SIDEBAR_LEVEL_CHANGE',
  E_SIDEBAR_SELECTEDNODE_CHANGE: 'E_SIDEBAR_SELECTEDNODE_CHANGE', // 树中被选中的节点发生了变化，
  E_SIDEBAR_SELECTEDNODENUMBER_CHANGE: 'E_SIDEBAR_SELECTEDNODENUMBER_CHANGE', // 树中被选中的节点数量发生变化
  E_SIDEBAR_SELECTEDNODENAME_CHANGE: 'E_SIDEBAR_SELECTEDNODENAME_CHANGE', // 树中被选中的节点名称发生变化
  E_ANALYZEBOARD_QUERY: 'E_ANALYZEBOARD_QUERY', // 分析面板上的查询按钮
  E_ANALYZEBOARD_DATEFILTER_CHANGE: 'E_ANALYZEBOARD_DATEFILTER_CHANGE', // 分析面板上数据过滤器

  E_USERINFO_CHANGE: 'E_USERINFO_CHANGE', // 用户的信息改变了：部门，角色
  E_TABLEDATA_CHANGE: 'E_TABLEDATA_CHANGE', // 表格数据被修改,需要去修改趋势图，在预测页中需要要使用
  E_TABLEDATA_CHANGE_STACK: 'E_TABLEDATA_CHANGE_STACK', // 表格数据被修改,需要保存到stack中，以便前进，后退使用

  E_FORECASTMODIFY: 'E_FORECASTMODIFY' // 预测页上的值修改，要让计划页，或者是目标页去重新加载表格数据
}
const proxyConst = new Proxy(con, {
  get: function (target, key, receiver) {
    if (key in target) {
      return target[key]
    }
    throw new Error(`${key}不存在`)
  }
})


export default {
  install: function (Vue, options) {
    Vue.prototype._CONST = proxyConst
  }
}
