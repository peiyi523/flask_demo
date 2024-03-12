

const myChart = echarts.init(document.getElementById('main'));

drawPM25();
function drawPM25() {
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                // console.log(result);
                // 繪製對應區塊並給了必要參數
                drawChat(myChart, result["datetime"], "PM2.5", result['site'], result['pm25'])
            }

        }
    )
}
function drawChat(chart, title, legend, xData, yData) {
    // 基于准备好的dom，初始化echarts实例

    // 指定图表的配置项和数据
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option);
}