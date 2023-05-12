function matrixFromCollection() {
	// Create a summary of the collection
	var rows = document.getElementsByClassName('MuiDataGrid-row');
	var numericCells = document.getElementsByClassName('MuiDataGrid-cellContent');
	var stringCells = document.getElementsByClassName('css-j7qwjs');
	if (numericCells.length > 0 && rows.length > 0) {
		const aggregated = [
			['Row', 'Question', 'ID', 'Type', "Points", "Taxonomy", "Objective"]
		];
		var numericIndex = 0;
		var stringIndex = 0;
		for (var i = 0; i < rows.length; i++) {
			const row = [i + 1]
			for (var j = 1; j < 5; j++) {
				j > 1 ? row.push(numericCells[numericIndex].innerHTML) : row.push(numericCells[numericIndex].textContent);
				numericIndex = numericIndex + 1;
			}
			if (stringCells.length > 0) {
				var selected = stringCells.length / rows.length
				for (var j = 0; j < selected; j++) {
					row.push(stringCells[stringIndex].innerText);
					stringIndex = stringIndex + 1;
				}
			}
			aggregated.push(row);
		}
		// Create assessment matrix
		const assmat = [
			["", '1. Remember', "", "2. Understand", "", "3. Apply", , "4. Analyze", "", "5. Evaluate", "", ""],
			['Objective', 'Questions', 'Points', "Questions", "Points", "Questions", "Points", "Questions", "Points", "Questions", "Points", "Total"]
		];
		const learningObjectives = getUniqueElements(aggregated, 5);
		learningObjectives.splice(0, 2);
		for (var i = 0; i < learningObjectives.length; i++) {
			assmatrow = [learningObjectives[i]];
			for (var j = 0; j < 5; j++) {
				const questions = aggregated.reduce((acc, curr) => {
					if (curr[5] === learningObjectives[i] && curr[6] == assmat[0][(j * 2) + 1]) {
						acc += curr[2] + ", ";
					}
					return acc;
				}, "");
				const points = aggregated.reduce((acc, curr) => {
					if (curr[5] === learningObjectives[i] && curr[6] == assmat[0][(j * 2) + 1]) {
						acc += parseInt(curr[4]);
					}
					return acc;
				}, 0);
				assmatrow.push(questions);
				assmatrow.push(points);
			}
			assmatrow.push(0);
			assmat.push(assmatrow);
		}
		// Compute the row totals
		for (var i = 2; i < assmat.length; i++) {
			assmat[i][11] = assmat[i][2] + assmat[i][4] + assmat[i][6] + assmat[i][8] + assmat[i][10];
		}
		columnTotals = ["Total"];
		for (var j = 0; j < 5; j++) {
			var total = 0;
			for (var i = 2; i < assmat.length; i++) {
				total += parseInt(assmat[i][(j * 2) + 2]);
			}
			columnTotals.push("");
			columnTotals.push(total);
		}
		columnTotals.push(columnTotals[2] + columnTotals[4] + columnTotals[6] + columnTotals[8] + columnTotals[10])
		assmat.push(columnTotals);
		exportToCsv('AssessmentMatrix.csv', assmat);
	}
	document.body.style.zoom = 1;
}

function runMatrixFromCollection() {
	document.body.style.zoom = 0.1;
	setTimeout(matrixFromCollection, 100);
}

runMatrixFromCollection()
