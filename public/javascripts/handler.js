$(document).ready(function(){
    

    $.ajax({
        url: '/getSteps',
        type: 'GET',
        success: function (response) {
            arr =[];
            response = response.data;
            for (i=0;i<response.length;i++){
                arr.push({x:new Date(parseInt(response[i].date)), y:parseInt(response[i].count)})
                if (i==arr.length-1){
                    make_chart(arr);
                }
            }            
        },
        error: function () {
            console.log("Error in ajax");
        }
    });

    $.ajax({
        url: '/partitionData',
        type: 'GET',
        success: function (response) {
            response = response.data;
            console.log(response);
            sum = response.pic + response.video + response.audio;
            var data = [
                {
                    value: response.pic,
                    label: "Pictures"
                },
                {
                    value: response.audio,
                    label: "Audio"
                },
                {
                    value: response.video,
                    label: "Video"
                }
            ];
            makePie(data);
            
        },
        error: function () {
            console.log("Error in ajax");
        }
    });

    $.ajax({
        url: '/getPics',
        type: 'GET',
        success: function (response) {
            response = response.data;
            console.log(response);
            
            
            lg = $("#pics_id");
            for (i=0;i<response.length;i++){
                path = response[i].path.substring(6);
                text = '<div class="image"><img data-lazy="'+path+'" alt = ""></div >'
                lg.append(text);
            }
            $('.pics').slick({
                lazyLoad: 'ondemand',
                centerMode: true,
                autoplay: true,
                autoplaySpeed: 2000,
                centerPadding: '30px',
                slidesToShow: 3,
                dots: true,
                infinite: true,
                arrows: true,
                speed: 300,
                // rows:2,
                slidesToScroll: 2,
                // fade: true,
                // cssEase: 'linear',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '30px',
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                        }
                    }
                ]
            });
            
        },
        error: function () {
            console.log("Error in ajax");
        }
    });
    

    
})


function make_chart(arr){
    console.log(arr);
    var chart = new CanvasJS.Chart("chartContainer",
        {
            backgroundColor: "transparent", 
            theme:"light3",
            animationEnabled: true,
            title: {
                text: "STEPS - DATE CHART",
                fontColor: "#edf5e1",
            },
            axisX: {
                title: "TIME",
                gridThickness: 0,
                valueFormatString: "hh:mm:ss",
                lineThickness:2,
                labelFontColor: "#edf5e1",
                titleFontColor:"#edf5e1",
                labelFontColor: "#edf5e1"
            },
            axisY: {
                title: "STEPS",
                gridThickness:0,
                labelFontColor: "#edf5e1",
                titleFontColor: "#edf5e1",
                labelFontColor: "#edf5e1"
            },
            data: [
                {
                    type: "line",
                    lineThickness: 5,
                    markerType: "square",
                    color: "#F08080",
                    dataPoints: arr
                }
            ]
        });

    chart.render();
}



function makePie(data) {

    FusionCharts.ready(function () {
        var revenueChart = new FusionCharts({
            type: "pie2d",
            renderAt: "chart-container",
            width: "600",
            height: "500",
            dataFormat: "json",
            dataSource: {
                "chart": {
                    "caption": "Data Distribution",
                    "subCaption": "(MB) ",
                    "paletteColors": "#f45b00,#1aaf5d,#0075c2,#f2c500,#8e0000",
                    // "bgImage": "/images/bg_main.jpg",
                    //Background image transparency 
                    // "bgImageAlpha": "50",
                    // "bgImageDisplayMode": "stretch",
                    //Theme
                    "bgColor":"#000",
                    "theme": "fint",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "baseFontColor": "#edf5e1",
                    "showShadow": "1",
                    "enableSmartLabels": "1",
                    "startingAngle": "0",
                    "showPercentValues": "1",
                    "showPercentInTooltip": "0",
                    "decimals": "1",
                    "captionFontSize": "40",
                    "subcaptionFontSize": "20",
                    "subcaptionFontBold": "0",
                    "toolTipColor": "#fff",
                    "toolTipBorderThickness": "20",
                    "toolTipBgColor": "#111111",
                    "toolTipBgAlpha": "100",
                    "toolTipFontSize": "40",
                    "toolTipBorderRadius": "100",
                    "toolTipPadding": "15",
                    "showHoverEffect": "1",
                    "showLegend": "1",
                    "legendBgColor": "#111111",
                    "legendBorderAlpha": '0',
                    "legendShadow": '0',
                    "legendItemFontSize": '18',
                    "legendItemFontColor": '#ffffff'
                },
                "data": data
            }
        });

        revenueChart.render("chart-container");
    });
}