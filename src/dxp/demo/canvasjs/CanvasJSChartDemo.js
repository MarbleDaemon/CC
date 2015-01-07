window.onload = function ()
{
	var SCALE_X = 1;
	var SCALE_Y = 2 - SCALE_X;

	function round10(value)
	{
		return Math.round(value * 100) / 100;
	}

	/*function pi(x, y)
	 {
	 x *= SCALE_X;
	 y *= SCALE_Y;
	 return x * x + y * y;
	 }*/

	function pi(x, y)
	{
		x *= SCALE_X;
		y *= SCALE_Y;
		return x + y;
	}

	var MAX = pi(5 * SCALE_X, 5 * SCALE_Y);
	var MEDIUM = MAX / 2;

	function ratio(x, y)
	{
		return pi(x, y) / MAX * 5;
	}

	/*function piX(y)
	 {
	 return Math.sqrt(MEDIUM - y * y) / SCALE_X;
	 }

	 function piY(x)
	 {
	 return Math.sqrt(MEDIUM - x * x) / SCALE_Y;
	 }*/

	function piX(y)
	{
		return (MEDIUM - y * SCALE_Y) / SCALE_X;
	}

	function piY(x)
	{
		return (MEDIUM - x * SCALE_X) / SCALE_Y;
	}

	var MIN_X = /*1 * SCALE_X*/2;
	var MIN_Y = /*1 * SCALE_Y*/1;

	var medium = {
		x:                    0,
		y:                    0,
		xValue:               0,
		yValue:               0,
		markerSize:           15,
		bevelEnabled:         false,
		//indexLabelFontColor:  "#e33",
		indexLabelFontSize:   15,
		indexLabelFontWeight: "bold",
		indexLabelPlacement:  "outside",
		pi:                   0,
		color:                "#33e",
		markerColor:          "#33e",
		risingColor:          "#333"
	};

	function createPoint(x, y, point)
	{
		point = point || {};
		point.x = x;
		point.y = y;
		point.xValue = round10(x);
		point.yValue = round10(y);
		point.pi = round10(ratio(x, y));

		return point;
	}

	function setMedium(x, y)
	{
		medium.x = x;
		medium.y = y;
		medium.xValue = round10(x);
		medium.yValue = round10(y);
		medium.pi = round10(ratio(x, y));
	}

	var teamData = (function ()
	{
		var NUM_MEMBERS = 15;
		var lastNames = ["Huynh", "Nguyen", "Pham", "Van", "Dang", "Truong", "Doan"];
		var middleNames = ["Van", "Duc", "Tung", "Hoai", "Thi Bich", "Thi Quynh"];
		var firstNames = ["Hai", "Lam", "Vinh", "Son", "Thuy", "Giao", "Dai"];
		var totalX = 0;
		var totalY = 0;

		var result = [];
		for (var count = 0; count < NUM_MEMBERS; count++)
		{
			var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
			var middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
			var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
			var x = Math.random() * 4.5 + 0.5;
			var y = Math.random() * 4.5 + 0.5;
			totalX += x;
			totalY += y;
			var value = ratio(x, y);
			var ok = (value >= 2.5) && (x > MIN_Y) && (y >= MIN_Y);
			result.push(
				{
					x:                         x,
					y:                         y,
					xValue:                    round10(x),
					yValue:                    round10(y),
					indexLabel:                [lastName, middleName, firstName].join(" "),
					indexLabelBackgroundColor: "#666",
					indexLabelFontColor:       value >= 2.4 ? "#333" : "#333",
					indexLabelFontSize:        12,
					indexLabelLineColor:       "#333",
					markerColor:               ok ? "#393" : "#933",
					pi:                        round10(value)
				});
		}

		setMedium(totalX / NUM_MEMBERS, totalY / NUM_MEMBERS);

		return result;
	})();

	var dangerData = (function ()
	{
		var NUM_POINTS = 10;
		var result = [/*{x: 0, y: 10}, {x: MIN_X, y: 10}*/];
		var fromX = MIN_X;
		var toX = piX(MIN_Y);
		var increment = (toX - fromX) / NUM_POINTS;

		for (var count = 0; count <= NUM_POINTS; count++)
		{
			var x = fromX + count * increment;
			var y = piY(x);
			y = Math.max(isNaN(y) ? MIN_Y : y, MIN_Y);
			var point =
			{
				x:      x,
				y:      [MIN_Y, y],
				xValue: round10(x),
				yValue: round10(y),
				pi:     round10(ratio(x, y))
			};
			result.push(point);
		}

		//result.push(createPoint(10, MIN_Y));

		return result;
	})();

	var teamMedium = (function ()
	{
		MEDIUM = pi(medium.x, medium.y);
		return [
			createPoint(0, piY(0)),
			createPoint(piX(0), 0)
		];
	})();

	var chartData = [];

	var chart_Danger = {
		type:           "rangeArea",
		lineThickness:  0,
		color:          "rgba(200,200,33,1)",
		showInLegend:   false,
		name:           "Minimum Qualification",
		markerSize:     0,
		toolTipContent: "<span style='\"'color: {color};'\"'>" +
		                "<strong>Minimum Qualification</strong>" +
		                "</span>" +
		                "<br/>" +
		                "<strong>Minimum Performance</strong> {yValue}" +
		                "<br/>" +
		                "<strong>Minimum Potential</strong> {xValue}" +
		                "<br/>" +
		                "<strong>PI</strong> {pi}" +
		"",
		dataPoints:     dangerData
	};

	var chart_TeamMediumZone = {
		type:           "area",
		color:          "rgba(0,0,0,0.25)",
		showInLegend:   false,
		name:           "Team Zone",
		markerSize:     0,
		toolTipContent: "<span style='\"'color: {color};'\"'>" +
		                "<strong>MEDIUM</strong>" +
		                "</span>" +
		                "<br/>" +
		                "<strong>Performance</strong> {yValue}" +
		                "<br/>" +
		                "<strong>Potential</strong> {xValue}" +
		                "<br/>" +
		                "<strong>PI</strong> {pi}" +
		"",
		dataPoints:     [
			{x: 0, y: 6},
			{x: medium.x, y: 6},
			createPoint(medium.x, 5),
			createPoint(medium.x, 0),
			medium,
			createPoint(0, medium.y),
			createPoint(5, medium.y),
			{x: 6, y: medium.y}
		]
	};

	var chart_TeamMediumLine = {
		type:           "line",
		color:          "#999",
		lineDash:       [8],
		showInLegend:   false,
		name:           "Team PI",
		markerSize:     0,
		toolTipContent: "<span style='\"'color: {color};'\"'>" +
		                "<strong>MEDIUM</strong>" +
		                "</span>" +
		                "<br/>" +
		                "<strong>Performance</strong> {yValue}" +
		                "<br/>" +
		                "<strong>Potential</strong> {xValue}" +
		                "<br/>" +
		                "<strong>PI</strong> {pi}" +
		"",
		dataPoints:     teamMedium
	};

	var chart_TeamMediumPoint = {
		type:           "scatter",
		toolTipContent: "<span style='\"'color: {color};'\"'>" +
		                "<strong>MEDIUM</strong>" +
		                "</span>" +
		                "<br/>" +
		                "<strong>Performance</strong> {yValue}" +
		                "<br/>" +
		                "<strong>Potential</strong> {xValue}" +
		                "<br/>" +
		                "<strong>PI</strong> {pi}" +
		"",
		dataPoints:     [medium]
	};

	var chart_TeamData = {
		type:           "scatter",
		//color:          "#369",
		toolTipContent: "<span style='\"'color: {color};'\"'>" +
		                "<strong>{indexLabel}</strong>" +
		                "</span>" +
		                "<br/>" +
		                "<strong>Performance</strong> {yValue}" +
		                "<br/>" +
		                "<strong>Potential</strong> {xValue}" +
		                "<br/>" +
		                "<strong>PI</strong> {pi}" +
		"",
		dataPoints:     teamData
	};

	if (medium.pi < 2.5)
	{
		chartData.push(chart_Danger);
		chartData.push(chart_TeamMediumZone);
		chartData.push(chart_TeamMediumLine);
	}
	else
	{
		chartData.push(chart_TeamMediumZone);
		chartData.push(chart_TeamMediumLine);
		chartData.push(chart_Danger);
	}

	chartData.push(chart_TeamMediumPoint);
	chartData.push(chart_TeamData);
	chartData.push({
		type:           "area",
		color:          "rgba(200,64,33,1)",
		lineThickness:  0,
		showInLegend:   false,
		name:           "Disqualification",
		markerSize:     0,
		toolTipContent: "<span style='\"'color: {color};'\"'>" +
		                "<strong>Disqualification</strong>" +
		                "</span>" +
		                "<br/>" +
		                "<strong>Minimum Performance</strong> {yValue}" +
		                "<br/>" +
		                "<strong>Minimum Potential</strong> {xValue}" +
		"",
		dataPoints:     [
			{x: 0, y: 6, fillOpacity: 1, xValue: MIN_X, yValue: MIN_Y},
			{x: MIN_X, y: 6, xValue: MIN_X, yValue: MIN_Y, fillOpacity: 1},
			{x: MIN_X, y: MIN_Y, xValue: MIN_X, yValue: MIN_Y, fillOpacity: 1},
			{x: 6, y: MIN_Y, xValue: MIN_X, yValue: MIN_Y, fillOpacity: 1}
		]
	});

	var chart = new CanvasJS.Chart("chartContainer",
		{
			/*title: {
			 text:       "Performance Indicator",
			 fontFamily: "arial black",
			 fontColor:  "DarkSlateGrey"
			 },*/
			legend: {
				fontSize: 12
			},
			axisX:  {
				gridThickness:   0.5,
				gridColor:       "#999",
				includeZero:     false,
				interval:        1,
				minimum:         0,
				maximum:         5.5,
				title:           "Potential",
				titleFontFamily: "arial",
				titleFontSize:   12

			},
			axisY:  {
				gridThickness:   0.5,
				gridColor:       "#999",
				includeZero:     false,
				interval:        1,
				minimum:         0,
				maximum:         5.5,
				title:           "Performance",
				titleFontFamily: "arial",
				titleFontSize:   12
			},

			data: chartData
		}
	);

	chart.render();
}
;
