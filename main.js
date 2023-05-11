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
		// exportToCsv('Taxonomies.csv', cars);
		const mat = [
			["", '1. Remember', "", "2. Understand", "", "3. Apply", , "4. Analyze", "", "5. Evaluate", "", ""],
			['Objective', 'Questions', 'Points', "Questions", "Points", "Questions", "Points", "Questions", "Points", "Questions", "Points", "Total"]
		];
		const LOs = getUniqueElements(cars, 4);
		LOs.splice(0, 2);
		for (var i = 0; i < LOs.length; i++) {
			matarr = [LOs[i]];
			for (var j = 0; j < 5; j++) {
				const pointsSum = cars.reduce((acc, curr) => {
					if (curr[4] === LOs[i] && curr[5] == mat[0][(j * 2) + 1]) {
						acc += parseInt(curr[3]);
					}
					return acc;
				}, 0);
				matarr.push("");
				matarr.push(pointsSum);
			}
			matarr.push(0);
			mat.push(matarr);
		}
		// Compute the row totals
		for (var i = 2; i < mat.length; i++) {
			const rowTotal = mat[i][2] + mat[i][4] + mat[i][6] + mat[i][8] + mat[i][10];
			mat[i][11] = rowTotal;
		}
		columnTotals = ["Total"];
		for (let j = 0; j < 5; j++) {
			var sum = 0;
			for (var i = 2; i < mat.length; i++) {
				sum += parseInt(mat[i][(j * 2) + 2]);
			}
			columnTotals.push("");
			columnTotals.push(sum);
		}
		columnTotals.push(columnTotals[2] + columnTotals[4] + columnTotals[6] + columnTotals[8] + columnTotals[10])
		mat.push(columnTotals);
		exportToCsv('AssessmentMatrix.csv', mat);
	}
	document.body.style.zoom = 1;
}

function main() {
	document.body.style.zoom = 0.1;
	setTimeout(myCallback, 100);
}

main()
