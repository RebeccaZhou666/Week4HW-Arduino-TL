
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels: ['Noise', 'Open', 'Close','Total'],
        datasets: [{
            backgroundColor: ['rgba(177,142,166,0.5)', 'rgba(255,156,186,0.5)', 'rgba(178,228,213,0.5)','rgba(200,200,200,0.5)'],
            borderColor: ['rgba(250,107,121,0.1)','rgba(255,153,153,0.1)','rgba(153,204,183,0.1)','rgba(153,204,183,0.1)'],
            data: [0, 0, 0, 1]
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    Min: 0,
                    Max: 1,
                    stepSize: 0.1,
                }
            }],
            yAxes: [{
                ticks: {
                   fontSize:16
                }
            }],
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 10
            }
        },
        legend: {
            display:false
            // labels: {
            //     // This more specific font property overrides the global property
            //     fontSize: 16
            // }
        }
    }
});
