// 取得主繪製區域
const chart1 = echarts.init(document.getElementById('main'));
const chart2 = echarts.init(document.getElementById('six'));

$("#update").click(() => {
    console.log("click!");
    drawPM25();
});

// 呼叫後端資料跟繪製
drawPM25();
function drawSixPM25() {
    chart2.showLoading();
    $.ajax(
        {
            url: "/six-pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {


                drawChat(chart2, "六都pm25平均值", "PM2.5", result['site'], result['pm25'])
                chart2.hideLoading();

            },
            error: () => {
                alert("讀取資料失敗，請稍後再試!");
                chart2.hideLoading();

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

function drawPM25() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {

                drawChat(chart1, result["datetime"], "PM2.5", result['site'], result['pm25'])
                chart1.hideLoading();
                drawSixPM25();
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試!");
                chart1.hideLoading();
            }

        }
    )
}
