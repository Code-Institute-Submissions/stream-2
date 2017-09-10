queue()
.defer(d3.json, "/company/income")
.await(makeGraphs);

function makeGraphs(error, data) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }


    data.forEach(function(d){
        var tempDate = new Date(d.date);
        d.date = tempDate;
    });

    // Declare crossfilter 
    var facts = crossfilter(data);
    var all = facts.groupAll();

    // Totals
    var sumTotal = all.reduceSum(function(d){return d.total}).value();
    var sumTips = all.reduceSum(function(d){return d.tip}).value();
    var sumCustomers = all.reduceSum(function(d){return d.quantity}).value();

    // Table
    var dateDim = facts.dimension(function(d){return d.date;});

    // Pie chart
    var qtyDim = facts.dimension(function(d){return d.quantity;});
    var qtyGroup = qtyDim.group();

    // Row Chart
    var typeDim = facts.dimension(function(d){return d.type;});
    var typeGroup = typeDim.group();

    // Max/min date
    var minDate = new Date("2017-09-14T16:28:54Z");
    var maxDate = new Date("2017-09-14T17:29:52Z");

    // Line Chart
    var dateGroup = dateDim.group().reduceSum(function(d){ return d.total;});
    var dateGroupTip = dateDim.group().reduceSum(function(d){ return d.tip;});

    var totalIncome = d3.select("#total").text('€' + sumTotal);
    var totalTips = d3.select("#total-tips").text('€' + sumTips);
    var totalCustomers = d3.select("#total-customers").text(sumCustomers);

    // Pie chart
    var pieChart = dc.pieChart('#pie-chart')
        .ordinalColors(["#446CB3", "#FFC107", "#F44336"])
        .dimension(qtyDim)
        .group(qtyGroup)
        .transitionDuration(1200)
        .legend(dc.legend().x(1200).y(5).itemHeight(12).gap(5));

    // Data Table
    var dataTable = dc.dataTable('#data-table')  
        .dimension(dateDim)
        .group(function(d){return d})
        .showGroups(false)
        .size(10)
        .columns([
            {label: 'Time', format: function(d){return d.date.getHours() + ':' + d.date.getMinutes()}}, 
            'quantity', 
            'total', 
            'tip', 
            'type'
        ])
        .sortBy(function(d){return d.date})
        .order(d3.ascending)
        .on('renderlet', function(table){
            table.selectAll('.dc-table-group').classed('info', true);
        });

    // Row chart
    var rowChart = dc.rowChart('#row-chart')
        .dimension(typeDim)
        .group(typeGroup)
        .ordinalColors(["#446CB3", "#FFC107", "#F44336"]);

    // Line chart
    var lineChart = dc.lineChart('#line-chart')  
        .dimension(dateDim)
        .group(dateGroup, 'Total spend')
        .renderHorizontalGridLines(true)
        .x(d3.time.scale().domain([minDate, maxDate]));

    lineChart.yAxis().ticks(5);
    lineChart.yAxis().ticks(4);

    dc.renderAll();

};