function matrixFromForm() {
	// Create a summary of the collection
	const numbers = document.getElementsByClassName("indexColumn-13-gt");
	const titles = document.getElementsByClassName("questionHeader-2NdOd");
	const ids = document.getElementsByClassName("idColumn-1yKKe");
	const types = document.getElementsByClassName("questionTypeColumn-36N7h");
	const scores = document.getElementsByClassName("scoreColumn-3msl5");
	const LOs = document.getElementsByClassName("learningObjectivesColumn-1McrU");
	const taxonomies = document.getElementsByClassName("taxonomiesColumn-1Qy6B");
	if (numbers.length > 0 && titles.length > 0 && ids.length > 0 && types.length > 0 && scores.length > 0 && LOs.length > 0 && taxonomies.length > 0) {
		const aggregated = [
			['Number', 'Question', 'ID', 'Type', "Score", "Taxonomy", "Objective"]
		];
		for (var i = 0; i < titles.length; i++) {
			const row = [numbers[i].innerText, titles[i].innerText, ids[i].innerText, types[i].innerText, scores[i].innerText, LOs[i].innerText, taxonomies[i].innerText];
			aggregated.push(row);
		}
		// Create assessment matrix
		const assmat = [
			["", '1. Remember', "", "2. Understand", "", "3. Apply", , "4. Analyze", "", "5. Evaluate", "", ""],
			['Objective', 'Questions', 'Points', "Questions", "Points", "Questions", "Points", "Questions", "Points", "Questions", "Points", "Total"]
		];
		const learningObjectives = getUniqueElements(aggregated, 5);
		learningObjectives.splice(0, 1);
		for (var i = 0; i < learningObjectives.length; i++) {
			assmatrow = [learningObjectives[i]];
			for (var j = 0; j < 5; j++) {
				const questions = aggregated.reduce((acc, curr) => {
					if (curr[5] === learningObjectives[i] && curr[6] == assmat[0][(j * 2) + 1]) {
						if (acc.length == 0) {
							acc += curr[0];
						} else {
							acc += ", " + curr[0];
						}
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
		exportToCsv('FormAssessmentMatrix.csv', assmat);
	}
	document.body.style.zoom = 1;
}

function runMatrixFromForm() {
	document.body.style.zoom = 0.1;
	setTimeout(matrixFromForm, 100);
}

runMatrixFromForm()
