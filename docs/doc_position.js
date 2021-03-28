function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var myChart_relation = echarts.init(document.getElementById('doc_position'));

var option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '0%',
        left: 'center'
    },
    series: [
        {
            name: 'relation',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 78, name: 'Contradict', itemStyle:{color:"#C24641"}},
                { value: 5, name: 'Neutral', itemStyle:{color:"#E8A317"}},
                { value: 18, name: 'Support', itemStyle:{color:"#4E9258"}},
            ],
        }
    ]
};

myChart_relation.setOption(option);


