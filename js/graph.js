function createLineChart(elID, labels, datasets, options) {
	let ctx = document.getElementById(elID).getContext('2d');
	let myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: datasets
		},
		options: options
	});

	console.log(Chart.defaults);
}

labels = ['a', 'b', 'c', 'd', 'e'];
datasets = [
	{
		label: 'Temperatur1',
		data: [12, 45, 67, 35, 46],
		pointBackgroundColor: 'rgba(191,191,61,1)',
		fill: false,
		borderColor: 'rgba(191,191,61,1)',
		lineTension: 0
	},
	{
		label: 'Temperatur2',
		data: [50, 27, 58, 28, 15],
		pointBackgroundColor: '#3FBF3F',
		borderColor: '#3FBF3F',
		fill: false
	}
];

createLineChart('myChart', labels, datasets);
