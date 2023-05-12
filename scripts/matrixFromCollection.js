function matrixFromCollection() {
	// Create a summary of the collection
	var rows = document.getElementsByClassName('MuiDataGrid-row');
	var numericCells = document.getElementsByClassName('MuiDataGrid-cellContent');
	var stringCells = document.getElementsByClassName('css-j7qwjs');
	if (numericCells.length > 0 && rows.length > 0 && stringCells.length > 0) {
		const aggregated = [];
		var numericIndex = 0;
		var stringIndex = 0;
		for (let i = 0; i < rows.length; i++) {
			const row = [i + 1]
			for (let j = 1; j < 5; j++) {
				j > 1 ? row.push(numericCells[numericIndex].innerHTML) : row.push(numericCells[numericIndex].textContent);
				numericIndex = numericIndex + 1;
			}
			var selected = stringCells.length / rows.length
			for (let j = 0; j < selected; j++) {
				row.push(stringCells[stringIndex].innerText);
				stringIndex = stringIndex + 1;
			}
			aggregated.push(row);
		}
		// Create assessment matrix
		const asmat = [["", '1. Remember', "", "2. Understand", "", "3. Apply", , "4. Analyze", "", "5. Evaluate", "", ""],
		['LearningObjective', 'Questions', 'Points', "Questions", "Points", "Questions", "Points", "Questions", "Points", "Questions", "Points", "Total"]];
		const learningObjectives = getUniqueElements(aggregated, 5).filter(Boolean);
		console.log(learningObjectives)
		for (objective of learningObjectives) {
			asrow = [objective];
			for (let j = 0; j < 5; j++) {
				const questions = aggregated.reduce((acc, curr) => {
					if (curr[5] === objective && curr[6] == asmat[0][(j * 2) + 1]) {
						acc.push(curr[2])
					}
					return acc;
				}, []);
				const points = aggregated.reduce((acc, curr) => {
					if (curr[5] === objective && curr[6] == asmat[0][(j * 2) + 1]) {
						acc += parseInt(curr[4]);
					}
					return acc;
				}, 0);
				asrow.push(questions.join(", "));
				asrow.push(points);
			}
			asrow.push(0);
			asmat.push(asrow);
		}
		// Compute the row totals
		for (let i = 2; i < asmat.length; i++) {
			asmat[i][11] = asmat[i][2] + asmat[i][4] + asmat[i][6] + asmat[i][8] + asmat[i][10];
		}
		ctotal = ["Total"];
		for (let j = 0; j < 5; j++) {
			var total = 0;
			for (let i = 2; i < asmat.length; i++) {
				total += parseInt(asmat[i][(j * 2) + 2]);
			}
			ctotal.push("");
			ctotal.push(total);
		}
		ctotal.push(ctotal[2] + ctotal[4] + ctotal[6] + ctotal[8] + ctotal[10])
		asmat.push(ctotal);
		exportToCsv('CollectionAssessmentMatrix.csv', asmat);
	}
	document.body.style.zoom = 1;
}

function getMatrixFromCollection() {
	document.body.style.zoom = 0.1;
	setTimeout(matrixFromCollection, 100);
}

getMatrixFromCollection();
