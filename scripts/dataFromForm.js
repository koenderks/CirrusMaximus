function getDataFromForm() {
	const numbers = document.getElementsByClassName("indexColumn-13-gt");
	const titles = document.getElementsByClassName("questionHeader-2NdOd");
	const ids = document.getElementsByClassName("idColumn-1yKKe");
	const types = document.getElementsByClassName("questionTypeColumn-36N7h");
	const scores = document.getElementsByClassName("scoreColumn-3msl5");
	const LOs = document.getElementsByClassName("learningObjectivesColumn-1McrU");
	const taxonomies = document.getElementsByClassName("taxonomiesColumn-1Qy6B");
	const nrows = titles.length;
	if (nrows > 0) {
		const aggregated = [['Number', 'Question', 'ID', 'Type', "Score", "Taxonomy", "Objective"]];
		for (var i = 0; i < nrows; i++) {
			const row = [numbers[i].innerText, titles[i].innerText, ids[i].innerText, types[i].innerText, scores[i].innerText, LOs[i].innerText, taxonomies[i].innerText];
			aggregated.push(row);
		}
		exportToCsv('FormData.csv', aggregated);
	}
}

getDataFromForm();
