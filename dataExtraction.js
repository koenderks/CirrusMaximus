function exportToCsv(filename, rows) {
	const csvContent = rows.map(row => row.join(';')).join('\n');
	const blob = new Blob([csvContent], { type: 'text/csv' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('download', filename);
	link.click();
}

function getUniqueElements(arr, colIndex) {
	const uniqueElements = new Set();
	for (let i = 0; i < arr.length; i++) {
		uniqueElements.add(arr[i][colIndex]);
	}
	return Array.from(uniqueElements);
}

function myCallback() {
	var rows = document.getElementsByClassName('MuiDataGrid-row');
	var elements = document.getElementsByClassName('MuiDataGrid-cellContent');
	var spans = document.getElementsByClassName('css-j7qwjs');
	if (elements.length > 0 && rows.length > 0) {
		const cars = [
			['Question', 'ID', 'Type', "Points", "Taxonomy", "Objective"]
		];
		var index = 0;
		var spanindex = 0;
		for (var i = 0; i < rows.length; i++) {
			const arr = []
			for (var j = 1; j < 5; j++) {
				j > 1 ? arr.push(elements[index].innerHTML) : arr.push(elements[index].textContent);
				index = index + 1;
			}
			if (spans.length > 0) {
				var selected = spans.length / rows.length
				for (var j = 0; j < selected; j++) {
					arr.push(spans[spanindex].innerText);
					spanindex = spanindex + 1;
				}
			}
			cars.push(arr);
		}
		exportToCsv('Collection.csv', cars);
	}
	document.body.style.zoom = 1;
}

function main() {
	document.body.style.zoom = 0.1;
	setTimeout(myCallback, 100);
}

main()
