function dataFromCollection() {
	// Create a summary of the collection
	var rows = document.getElementsByClassName('MuiDataGrid-row');
	var numericCells = document.getElementsByClassName('MuiDataGrid-cellContent');
	var stringCells = document.getElementsByClassName('css-j7qwjs');
	if (numericCells.length > 0 && rows.length > 0) {
		const aggregated = [['Number', 'Title', 'ID', 'Type', "Score"]];
		if (stringCells.length > 0) {
			aggregated[0].push("LearningObjective");
			aggregated[0].push("Taxonomy");
		}
		var numericIndex = 0;
		var stringIndex = 0;
		for (let i = 0; i < rows.length; i++) {
			const row = [i + 1]
			for (let j = 1; j < 5; j++) {
				j > 1 ? row.push(numericCells[numericIndex].innerHTML) : row.push(numericCells[numericIndex].textContent);
				numericIndex = numericIndex + 1;
			}
			if (stringCells.length > 0) {
				var selected = stringCells.length / rows.length
				for (let j = 0; j < selected; j++) {
					row.push(stringCells[stringIndex].innerText);
					stringIndex = stringIndex + 1;
				}
			}
			aggregated.push(row);
		}
		const pagetitle = document.getElementsByClassName("page-title-Q91Bk")[0];
		exportToCsv("Collection_" + pagetitle.innerText, aggregated);
	}
	document.body.style.zoom = 1;
}

function getDataFromCollection() {
	document.body.style.zoom = 0.1;
	setTimeout(dataFromCollection, 100);
}

getDataFromCollection();
