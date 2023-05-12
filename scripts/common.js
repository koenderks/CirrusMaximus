function exportToCsv(filename, rows) {
	const csvContent = rows.map(row => row.join(';')).join('\n');
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('download', filename);
	link.style.display = 'none';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function getUniqueElements(arr, colIndex) {
	const uniqueElements = new Set(arr.map(item => item[colIndex]));
	return Array.from(uniqueElements);
}
