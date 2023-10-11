function getDataFromForm() {
	const numbers = document.getElementsByClassName("indexColumn-YnfpO");
	const titles = document.getElementsByClassName("questionHeader-WJlA+");
	const ids = document.getElementsByClassName("idColumn-nlfkQ");
	const types = document.getElementsByClassName("questionTypeColumn-1iQs5");
	const scores = document.getElementsByClassName("scoreColumn-7meJJ");
	const LOs = document.getElementsByClassName("learningObjectivesColumn-zoTY6");
	const taxonomies = document.getElementsByClassName("taxonomiesColumn-oHsaS");
	const nrows = titles.length;
	if (nrows > 0) {
		const aggregated = [['Question', 'Title', 'ID', 'Type', "Score", "Taxonomy", "LearningObjective"]];
		for (let i = 0; i < nrows; i++) {
			// Add a conditional statement to check if any of the values in the row is empty
			if (numbers[i].innerText === "" || titles[i].innerText === "" || ids[i].innerText === "" || types[i].innerText === "" || scores[i].innerText === "" || LOs[i].innerText === "" || taxonomies[i].innerText === "") {
				// Display an alert and return to stop the computations
				alert("One or more taxonomy or learning objective field is empty. Please fill all the fields via your collection.");
				return;
			}
			const row = [numbers[i].innerText, titles[i].innerText, ids[i].innerText, types[i].innerText, scores[i].innerText, taxonomies[i].innerText, LOs[i].innerText];
			aggregated.push(row);
		}
		const pagetitle = document.getElementsByClassName("page-title-0dK5X")[0];
		exportToCsv("Form_" + pagetitle.innerText, aggregated);
	}
}

getDataFromForm();
