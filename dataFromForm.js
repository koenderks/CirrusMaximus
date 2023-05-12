function dataFromForm() {
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
		exportToCsv('FormData.csv', aggregated);
	}
	document.body.style.zoom = 1;
}

function runDataFromForm() {
	document.body.style.zoom = 0.1;
	setTimeout(dataFromForm, 100);
}

runDataFromForm()
