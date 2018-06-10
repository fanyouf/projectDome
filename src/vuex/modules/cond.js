let moment = require('moment')
export default {
  namespaced: true,
  state: {
    dataDimensionName: '品类-品牌', // 当前左侧树中的展示的数据维度
    treeData: [],
    pageType: '',
    selectedNode: {
      'target': { // 左边树中选中的部分
        parentLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        parentId: -11, // 选中节点对应的父节点，有且只有1个
        // 选中节点的级别
        childrenLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        childrenIdList: [], // 查询级别对应的id列表
        childrenNameList: []
      },
      'planGMV': { // 左边树中选中的部分
        parentLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        parentId: -11, // 选中节点对应的父节点，有且只有1个
        // 选中节点的级别
        childrenLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        childrenIdList: [], // 查询级别对应的id列表
        childrenNameList: []
      },
      'planSale': { // 左边树中选中的部分
        parentLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        parentId: -11, // 选中节点对应的父节点，有且只有1个
        // 选中节点的级别
        childrenLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        childrenIdList: [], // 查询级别对应的id列表
        childrenNameList: []
      },
      'planPrice': { // 左边树中选中的部分
        parentLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        parentId: -11, // 选中节点对应的父节点，有且只有1个
        // 选中节点的级别
        childrenLevel: '', // saler | cate1 | cate2 | cate3 | brand | sku,
        childrenIdList: [], // 查询级别对应的id列表
        childrenNameList: []
      }
    },
    analyzeBoard: { // 分析面板中保存的条件
      'target': {
        barsAndScatter: {
          qmwd: 'M',
          start: moment().format('YYYY-MM'),
          end: moment().format('YYYY-MM')
        },
        lines: {
          qmwd: 'M',
          start: (new Date()).getFullYear() + '-01',
          end: (new Date()).getFullYear() + '-12'
        },
        histogram: {
          qmwd: 'M',
          start: (new Date()).getFullYear() + '-01',
          end: (new Date()).getFullYear() + '-12'
        },
        componentName: 'barsAndScatter', // 默认展示的是散点图,
        childrenIdList: [] // 在左侧的树节点中选中数据，然后在此基础上再做一次选择
      },
      'planGMV': {
        barsAndScatter: {
          qmwd: 'M',
          start: moment().format('YYYY-MM'),
          end: moment().format('YYYY-MM')
        },
        lines: {
          qmwd: 'M',
          start: (new Date()).getFullYear() + '-01',
          end: (new Date()).getFullYear() + '-12'
        },
        histogram: {
          qmwd: 'M',
          start: (new Date()).getFullYear() + '-01',
          end: (new Date()).getFullYear() + '-12'
        },
        componentName: 'barsAndScatter', // 默认展示的是散点图,
        childrenIdList: [] // 在左侧的树节点中选中数据，然后在此基础上再做一次选择

      },
      'planSale': {
        barsAndScatter: {
          qmwd: 'M',
          start: moment().format('YYYY-MM'),
          end: moment().format('YYYY-MM')
        },
        lines: {
          qmwd: 'M',
          start: (new Date()).getFullYear() + '-01',
          end: (new Date()).getFullYear() + '-12'
        },
        histogram: {
          qmwd: 'M',
          start: (new Date()).getFullYear() + '-01',
          end: (new Date()).getFullYear() + '-12'
        },
        componentName: 'barsAndScatter', // 默认展示的是散点图,
        childrenIdList: [] // 在左侧的树节点中选中数据，然后在此基础上再做一次选择
      }
    },
    currentNode: { // 用户在柱状散点图中选中的部分，选中的这个部分会用来得到下面的表格数据中的行
      'target': {childrenIdList: []}, // 查询级别对应的id列表
      'planGMV': {childrenIdList: []}, // 查询级别对应的id列表
      'planSale': {childrenIdList: []}, // 查询级别对应的id列表
      'planPrice': {childrenIdList: []} // 查询级别对应的id列表
    },
    conditionBar: { // conditionBar会从这里取初值
      'target': {
        year: (new Date()).getFullYear(),
        qmwd: 'M',
        level: 'QM',
        versionType: 'ASSESSMENT'
      },
      'viewTarget': {
        year: (new Date()).getFullYear(),
        qmwd: 'M',
        level: 'QM',
        versionType: 'ASSESSMENT'
      },
      'planGMV': {
        year: (new Date()).getFullYear(),
        qmwd: 'M',
        level: 'QM'
      },
      'planSale': {
        year: (new Date()).getFullYear(),
        qmwd: 'M',
        level: 'QM'
      }
    },
    isSelectedAll: false,
    monthToSplit: {target: '', planGMV: '', planSale: ''},
    isSplitTarget: {target: false, planGMV: false, planSale: false, viewTarget: false}
  },
  mutations: {
    setDataDimensionName: (state, payload) => { state.dataDimensionName = payload },
    setTreeData: (state, payload) => { state.treeData = payload },
    setAnalyzeBoard: (state, payload) => {
      let {qmwd, start, end, childrenIdList, componentName} = payload
      if (componentName !== undefined) {
        state.analyzeBoard[state.pageType].componentName = componentName
      }
      if (childrenIdList !== undefined) {
        state.analyzeBoard[state.pageType].childrenIdList = childrenIdList
      }
      if (qmwd !== undefined) {
        state.analyzeBoard[state.pageType][state.analyzeBoard[state.pageType].componentName].qmwd = qmwd
      }
      if (start !== undefined) {
        state.analyzeBoard[state.pageType][state.analyzeBoard[state.pageType].componentName].start = start
      }
      if (end !== undefined) {
        state.analyzeBoard[state.pageType][state.analyzeBoard[state.pageType].componentName].end = end
      }
    },
    setSelectedNode: (state, payload) => {
      state.selectedNode[state.pageType] = Object.assign({}, state.selectedNode[state.pageType], payload)
    },
    setSelectedNodeForPlan: (state, payload) => { // 计划页面中有两种情况。
      state.selectedNode['planGMV'] = Object.assign({}, state.selectedNode[state.pageType], payload)
      state.selectedNode['planSale'] = Object.assign({}, state.selectedNode[state.pageType], payload)
      state.selectedNode['planPrice'] = Object.assign({}, state.selectedNode[state.pageType], payload)
    },
    setAnalyzeBoardChildrenListForPlan: (state, payload) => { // 计划页面中有两种情况。
      state.analyzeBoard['planGMV'] = Object.assign({}, state.analyzeBoard[state.pageType], payload)
      state.analyzeBoard['planSale'] = Object.assign({}, state.analyzeBoard[state.pageType], payload)
      state.analyzeBoard['planPrice'] = Object.assign({}, state.analyzeBoard[state.pageType], payload)
    },
    setCurrentNode: (state, payload) => {
      let {childrenIdList} = payload
      state.currentNode[state.pageType].childrenIdList = childrenIdList
    },
    setCurrentNodeForPlan: (state, payload) => {
      let {childrenIdList} = payload
      state.currentNode['planGMV'].childrenIdList = childrenIdList
      state.currentNode['planSale'].childrenIdList = childrenIdList
      state.currentNode['planPrice'].childrenIdList = childrenIdList
    },
    setPageType: function (state, payload) {
      state.pageType = payload
    },
    setConditionBar: (state, payload) => {
      state.conditionBar[state.pageType] = Object.assign({}, state.conditionBar[state.pageType], payload)
    },
    setMonthToSplit: (state, payload) => { state.monthToSplit[state.pageType] = payload.substr(1) }, // m12 ---> 12
    setSplitTargetStatus: (state, payload) => { state.isSplitTarget[state.pageType] = payload },
    setIsSelectedAll: (state, payload) => { state.isSelectedAll = payload }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  },
  getters: {
    getIsSelectedAll: (state) => state.isSelectedAll,
    getDataDimensionName: (state) => state.dataDimensionName,
    getTreeData: (state) => state.treeData,
    getPageType: state => state.pageType,
    getAnalyzeBoard: state => {
      let obj = state.analyzeBoard[state.pageType][state.analyzeBoard[state.pageType].componentName]
      return {
        componentName: state.analyzeBoard[state.pageType].componentName,
        qmwd: obj.qmwd,
        start: obj.start,
        end: obj.end,
        childrenIdList: state.analyzeBoard[state.pageType].childrenIdList}
    },
    getSelectedNode: state => state.selectedNode[state.pageType],
    getCurrentNode: state => state.currentNode[state.pageType],
    getConditionBar: state => state.conditionBar[state.pageType],
    getMonthToSplit: state => state.monthToSplit[state.pageType],
    getIsSplitTarget: state => state.isSplitTarget[state.pageType],
    getDept3Id (state, getters, rootState, rootGetters) {
      // getters.someOtherGetter // -> 'foo/someOtherGetter'
      // rootGetters.someOtherGetter // -> 'someOtherGetter'
      return rootState.user.dept3Id
    }
  }
}
