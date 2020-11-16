// TOPTables
window.onload = function () {

    var totalVisitors = 883000;
    var visitorsData = {
        "New vs Left Side Table": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "Right vs Left Side Table",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: 519960, name: "Right Side Table", color: "#E7823A" },
                { y: 363040, name: "Left Side Table", color: "#546BC1" }
            ]
        }],
        "Right Side Table": [{
            color: "#E7823A",
            name: "Right Side Table",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
                { x: new Date("1 Jan 2020"), y: 33000 },
                { x: new Date("1 Feb 2020"), y: 35960 },
                { x: new Date("1 Mar 2020"), y: 42160 },
                { x: new Date("1 Apr 2020"), y: 42240 },
                { x: new Date("1 May 2020"), y: 43200 },
                { x: new Date("1 Jun 2020"), y: 40600 },
                { x: new Date("1 Jul 2020"), y: 42560 },
                { x: new Date("1 Aug 2020"), y: 44280 },
                { x: new Date("1 Sep 2020"), y: 44800 },
                { x: new Date("1 Oct 2020"), y: 48720 },
                { x: new Date("1 Nov 2020"), y: 50840 },
                { x: new Date("1 Dec 2020"), y: 51600 }
            ]
        }],
        "Left Side Table": [{
            color: "#546BC1",
            name: "Left Side Table",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
                { x: new Date("1 Jan 2020"), y: 22000 },
                { x: new Date("1 Feb 2020"), y: 26040 },
                { x: new Date("1 Mar 2020"), y: 25840 },
                { x: new Date("1 Apr 2020"), y: 23760 },
                { x: new Date("1 May 2020"), y: 28800 },
                { x: new Date("1 Jun 2020"), y: 29400 },
                { x: new Date("1 Jul 2020"), y: 33440 },
                { x: new Date("1 Aug 2020"), y: 37720 },
                { x: new Date("1 Sep 2020"), y: 35200 },
                { x: new Date("1 Oct 2020"), y: 35280 },
                { x: new Date("1 Nov 2020"), y: 31160 },
                { x: new Date("1 Dec 2020"), y: 34400 }
            ]
        }]
    };
    
    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "New VS Left Side Table"
        },
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";  
            }
        },
        data: []
    };
    
    var visitorsDrilldownedChartOptions = {
        animationEnabled: true,
        theme: "light2",
        axisX: {
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2"
        },
        axisY: {
            gridThickness: 0,
            includeZero: false,
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2",
            lineThickness: 1
        },
        data: []
    };
    
    newVSReturningVisitorsOptions.data = visitorsData["New vs Left Side Table"];
    $("#chartContainer1").CanvasJSChart(newVSReturningVisitorsOptions);
    
    function visitorsChartDrilldownHandler(e) {
        e.chart.options = visitorsDrilldownedChartOptions;
        e.chart.options.data = visitorsData[e.dataPoint.name];
        e.chart.options.title = { text: e.dataPoint.name }
        e.chart.render();
        $("#backButton").toggleClass("invisible");
    }
    
    $("#backButton").click(function() { 
        $(this).toggleClass("invisible");
        newVSReturningVisitorsOptions.data = visitorsData["New vs Left Side Table"];
        $("#chartContainer1").CanvasJSChart(newVSReturningVisitorsOptions);
    });
    
    }