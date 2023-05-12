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
