function getMatrixFromForm() {
	const numbers = document.getElementsByClassName("indexColumn-13-gt");
	const scores = document.getElementsByClassName("scoreColumn-3msl5");
	const LOs = document.getElementsByClassName("learningObjectivesColumn-1McrU");
	const taxonomies = document.getElementsByClassName("taxonomiesColumn-1Qy6B");
	const nrows = numbers.length;
	if (nrows > 0) {
		const aggregated = [];
		for (let i = 0; i < nrows; i++) {
			// Add a conditional statement to check if any of the values in the row is empty
			if (numbers[i].innerText === "" || scores[i].innerText === "" || LOs[i].innerText === "" || taxonomies[i].innerText === "") {
				// Display an alert and return to stop the computations
				alert("One or more taxonomy or learning objective field is empty. Please fill all the fields via your collection.");
				return;
			}
			const row = [numbers[i].innerText, scores[i].innerText, taxonomies[i].innerText, LOs[i].innerText];
			aggregated.push(row);
		}
		const asmat = [["", '1. Remember', "", "2. Understand", "", "3. Apply", , "4. Analyze", "", "5. Evaluate", "", ""],
						['LearningObjective', 'Questions', 'Points', "Questions", "Points", "Questions", "Points", "Questions", "Points", "Questions", "Points", "Total"]];
		const learningObjectives = getUniqueElements(aggregated, 3);
		for (objective of learningObjectives) {
			asrow = [objective];
			for (let j = 0; j < 5; j++) {
				const questions = aggregated.reduce((acc, curr) => {
					if (curr[3] === objective && curr[2] == asmat[0][(j * 2) + 1]) {
						acc.push(curr[0]);
					}
					return acc;
				}, []);
				const points = aggregated.reduce((acc, curr) => {
					if (curr[3] === objective && curr[2] == asmat[0][(j * 2) + 1]) {
						acc += parseInt(curr[1]);
					}
					return acc;
				}, 0);
				asrow.push(questions.join(", "));
				asrow.push(points);
			}
			asrow.push(0);
			asmat.push(asrow);
		}
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
		const pagetitle = document.getElementsByClassName("page-title-Q91Bk")[0];
		exportToCsv("AssessmentMatrix_" + pagetitle.innerText, asmat);
	}
}

getMatrixFromForm();
