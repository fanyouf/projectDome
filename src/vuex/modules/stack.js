// 实现恢复与撤销功能
export default {
  namespaced: true,
  state: {
    pageType: '',
    dataList: {'target': [], 'planGMV': [], 'planSale': []},
    maxLength: 5, // 最大保存5步,
    operatorIndex: {'target': 0, 'planGMV': 0, 'planSale': 0} // 当前获取的可操作位置
  },
  mutations: {
    initDataStack (state, playload) {
      state.pageType = playload.pageType
      let dataList = state.dataList[state.pageType]
      dataList.length = 0
      dataList.push(playload.data)
      state.operatorIndex[state.pageType] = 0
    },
    addStack (state, playload) {
      let dataList = state.dataList[state.pageType]
      let index = state.operatorIndex[state.pageType] + 1
      dataList[index] = playload
      while (dataList.length > state.maxLength) {
        dataList.splice(0, 1)
      }
      index = Math.min(state.maxLength - 1, index)
      state.operatorIndex[state.pageType] = index
    },
    reset (state) {
      let pageType = state.pageType
      state.dataList[pageType].length = 0
      state.operatorIndex[pageType] = 0
    },
    goBack (state) { state.operatorIndex[state.pageType]-- },
    goPrev (state) { state.operatorIndex[state.pageType]++ }
  },
  getters: {
    // 可否向前恢复
    isPrev: state => state.pageType && state.dataList[state.pageType].length > 0 && state.operatorIndex[state.pageType] < state.dataList[state.pageType].length - 1,
    isBack: state => state.pageType && state.dataList[state.pageType].length > 0 && state.operatorIndex[state.pageType] > 0,
    getStack: state => state.pageType && state.dataList[state.pageType][state.operatorIndex[state.pageType]]
  }
}
