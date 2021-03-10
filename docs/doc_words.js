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

var myChart_relation = echarts.init(document.getElementById('doc_biases'));

var option = {
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: 'General Bias', max: 1},
            { name: 'Subjectivity', max: 1},
            { name: 'Subjectivity', max: 1},
            { name: 'Positive Sentiment', max: 1},

        ]
    },
    series: [{
        name: 'Biases',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [0.3, 0.1, 0.7, 0.5],
                name: 'Biases'
            }
        ]
    }]
};

myChart_relation.setOption(option);


