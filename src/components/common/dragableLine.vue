<template>
    <div id="echartId" style="width:500px;height:400px;border:1px solid #ddd">

    </div>
</template>
<script>
const symbolSize = 20
export default {
    props:{data:{required:true,type:Array}},
    methods: {
        showTooltip(dataIndex) {
            this.myChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: dataIndex
            });
        },
        hideTooltip(dataIndex) {
            this.myChart.dispatchAction({
                type: "hideTip"
            });
        },
        onPointDragging(dataIndex, e) {
            const _this = this;
            let value = this.myChart.convertFromPixel(
                "grid",
                //this.position
                e.target.position
            )
            this.data[dataIndex][1] = value[1]
            
            this.myChart.setOption({
                series: [
                    {
                    id: "a",
                    data: _this.data
                    }
                ]
            });
            this.$emit("dataChange",{index:dataIndex,value:value[1],data:this.data})
        },
        showTooltip(dataIndex) {
            this.myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: dataIndex
            });
        },

        hideTooltip(dataIndex) {
            this.myChart.dispatchAction({
                type: 'hideTip'
            });
        } 
    },
    mounted() {
        console.info(this.data)
        this.myChart = this._echart.init(document.getElementById("echartId"));
        const option = {
            tooltip: {
                triggerOn: "none",
                formatter: params => {
                    return (
                        "X: " +
                        params.data[0] +
                        "<br>Y: " +
                        params.data[1].toFixed(2)
                    );
                }
            },
            xAxis: {
                type: "category",
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                id: "a",
                type: "line",
                smooth: true,
                symbolSize: symbolSize,
                data: this.data
                }
            ]
        };
        this.myChart.setOption(option, true);

        var _this = this;
        this.myChart.setOption({
            // 声明一个 graphic component，里面有若干个 type 为 'circle' 的 graphic elements。
            // 这里使用了 echarts.util.map 这个帮助方法，其行为和 Array.prototype.map 一样，但是兼容 es5 以下的环境。
            // 用 map 方法遍历 data 的每项，为每项生成一个圆点。
            graphic: _this.data.map(function (dataItem, dataIndex) {
                let isDragAble = true;
                let onDrag = ((dataIndex)=>{return (e)=>{ _this.onPointDragging(dataIndex,e)}})(dataIndex)
                let onmousemove = ((dataIndex)=>{return (e)=>{ _this.showTooltip(dataIndex,e)}})(dataIndex)
                let onmouseout = ((dataIndex)=>{return (e)=>{ _this.hideTooltip(dataIndex,e)}})(dataIndex)

                // isDragAble = !(dataIndex % 2) 
                return {
                    // 'circle' 表示这个 graphic element 的类型是圆点。
                    type: 'circle',

                    shape: {
                        // 圆点的半径。
                        r: symbolSize / 2
                    },
                    // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
                    // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
                    position: _this.myChart.convertToPixel('grid', dataItem),

                    // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
                    invisible: true,
                    // 这个属性让圆点可以被拖拽。
                    draggable: isDragAble,//true,
                    // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
                    z: 100,
                    // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
                    // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
                    // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
                //  ondrag: echarts.util.curry(onPointDragging, dataIndex),
                    ondrag:onDrag,
                    onmousemove,
                    //onmousemove: echarts.util.curry(showTooltip, dataIndex),
                    onmouseout,
                    //onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                };
            })
        })
    }
}
</script>
