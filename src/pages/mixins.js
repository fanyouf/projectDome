import {mapGetters,mapMutations} from 'vuex'
export default {
  computed:{
    ...mapGetters('cond',['getPageType','getSelectedNode','getCurrentNode','getConditionBar','getMonthToSplit','getDataDimensionName']),
    ...mapGetters('stack',["getStack"]),
    ...mapGetters(["getUser",'getCurrentVersionType']),
    cShowTmb(){let ar = this.tableList.filter(item=>item.value=='tmb'); return ar.length && ar[0].checked},
    cShowTtb(){let ar = this.tableList.filter(item=>item.value=='ttb'); return ar.length && ar[0].checked;},
    cShowThb(){let ar = this.tableList.filter(item=>item.value=='thb'); return ar.length && ar[0].checked},
    cShowTmx(){let ar = this.tableList.filter(item=>item.value=='tmx'); return ar.length && ar[0].checked},
    cShowThz(){let ar = this.tableList.filter(item=>item.value=='thz'); return ar.length && ar[0].checked},
    cShowTstl(){let ar = this.tableList.filter(item=>item.value=='tstl'); return ar.length && ar[0].checked},
    aId(){return "a"+Math.random().toString().substring(2);},
  },
  data(){
    return {
      tableListMap:{"Q":[
        {label:'目标数据',value:'tmb',checked:true},
        {label:'汇总数据',value:'thz',checked:true},
        {label:'明细数据',value:'tmx',checked:true},
        {label:'渗透率',value:'tstl',checked:true},
        {label:'同比数据',value:'ttb',checked:true},
        {label:'环比数据',value:'thb',checked:true},
      ],"M":[
        {label:'目标数据',value:'tmb',checked:true},
        {label:'汇总数据',value:'thz',checked:true},
        {label:'明细数据',value:'tmx',checked:true},
        {label:'渗透率',value:'tstl',checked:true},
        {label:'同比数据',value:'ttb',checked:true},
        {label:'环比数据',value:'thb',checked:true},
      ],"D":[
        {label:'目标数据',value:'tmb',checked:true},
        {label:'汇总数据',value:'thz',checked:true},
        {label:'明细数据',value:'tmx',checked:true},
        {label:'渗透率',value:'tstl',checked:true},
        {label:'同比数据',value:'ttb',checked:true},
      ],"W":[
        {label:'目标数据',value:'tmb',checked:true},
        {label:'汇总数据',value:'thz',checked:true},
        {label:'明细数据',value:'tmx',checked:true},
        {label:'渗透率',value:'tstl',checked:true},
      ]},
      tableList:[
        {label:'目标数据',value:'tmb',checked:true},
        {label:'汇总数据',value:'thz',checked:true},
        {label:'明细数据',value:'tmx',checked:true},
        {label:'渗透率',value:'tstl',checked:true},
        {label:'同比数据',value:'ttb',checked:true},
        {label:'环比数据',value:'thb',checked:true},
      ],
    }
  },
  methods:{
    ...mapMutations('stack',['goBack','goPrev','addStack','initDataStack']),
    hToolBackMixin(){
      this.goBack()
      console.info("后退按钮被点击：获取的值为",this.getStack)
      this.detail = this._utils.cloneObj(this.getStack.detail);
    },
    hToolPrevMixin(){
      this.goPrev()
      console.info("前进按钮被点击：获取的值为",this.getStack)
      this.detail = this._utils.cloneObj(this.getStack.detail);
    },
    hTableDataChangeStackMixin(obj){
      console.info("数据修改了，入stack")
      this.addStack(this._utils.cloneObj(obj));
    },
    hShowTableListChangeMixin(d){
      console.info(d)
      this.tableList = d
    },
    hDownloadTableDataMixin(){
      // 前端下载 this.getDataDimensionName
      let fileName =  this.getDataDimensionName + this._moment.getNow();
      console.info(this.tableList,fileName)
      let sheetData = this.tableList.filter(item=>item.checked).map(item => {
        console.info(item.value, this.$refs[item.value])
        let sheetName = item.label;
        let sheetData = this.$refs[item.value].exportToJson()
        return {sheetName,sheetData}
      })

      console.info(sheetData)
      try{
        this._excel.downloadAll(document.getElementById(this.aId), sheetData,fileName );
        this._info("启动浏览器下载,下载完成")
      }
      catch(e){
        console.info(e);
        this._error("下载出现错误")
      }
    },
    updateJIARIDataMixin(d){
      // 节假日同比校准

      d.forEach(item => {
        //debugger
        let t =  this.detail.findIndex(it => it.id == item.id)
        if(t != -1){
          let  obj = this.detail[t].data.findIndex(it => it.qmwd == item.data.qmwd);
          if(obj != -1){
            this.detail[t].data[obj].yoy = item.data.yoy
          }
        }
      })
    },
  },
  watch:{
    detail:{
      handler(){
        let sum = 0;
        this.detail.forEach(item => {
          item.data.forEach(it => {
            if(it.qmwd.substr(0,1) === this.dateType){
              sum +=it.val*1;
            }
          })
        })
        this._bus.$emit(this._CONST.E_TOOLBAR_TOTOAL_INIT,sum) // 通知工具条上的修改总值按钮，
      },
      deep:true
    }
  }
}
