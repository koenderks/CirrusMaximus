// Check the current url and hide elements accordingly
chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
	chrome.storage.sync.get({ language: "en" }, (items) => {
		const language = items.language;
		const currentUrl = tabs[0].url;
		const par = document.getElementById("status");
		if (currentUrl.includes("cirrusplatform.com/author/app#/library/collections/")) {
			language == "en" ? par.innerHTML = `Status: <b style='color: green;'>Active</b>` : par.innerHTML = `Status: <b style='color: green;'>Actief</b>`;
			hideButtonsByClass("form-button");
		} else if (currentUrl.includes("cirrusplatform.com/author/app#/assessments/item/")) {
			language == "en" ? par.innerHTML = `Status: <b style='color: green;'>Active</b>` : par.innerHTML = `Status: <b style='color: green;'>Actief</b>`;
			hideButtonsByClass("collection-button");
		} else {
			hideButtonsByClass("collection-button");
			hideButtonsByClass("form-button");
		}
	});
});

const hideButtonsByClass = (className) => {
	const buttons = document.getElementsByClassName(className);
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].classList.add("hidden");
	}
};

const executeScriptInTab = async (tab, files) => {
	await chrome.scripting.executeScript({
		target: { tabId: tab.id, allFrames: true },
		files: ['./scripts/common.js', ...files],
	});
};

const getCurrentChromeTab = async () => {
	const [tab] = await chrome.tabs.query({ active: true });
	return tab;
};

document.querySelector('#options-button').addEventListener('click', function () {
	if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
	} else {
		window.open(chrome.runtime.getURL('./html/options.html'));
	}
});

chrome.storage.sync.get({ language: "en" }, (items) => {
	const language = items.language;
	if (language == "en") {
		document.getElementById("status").innerHTML = "Status: <b>Inactive</b>"
		document.getElementById("collectionDataButton").innerHTML = "Export collection"
		document.getElementById("collectionMatrixButton").innerHTML = "Export assessment matrix"
		document.getElementById("formDataButton").innerHTML = "Export form"
		document.getElementById("formMatrixButton").innerHTML = "Export assessment matrix"
	} else {
		document.getElementById("status").innerHTML = "Status: <b>Niet actief</b>"
		document.getElementById("collectionDataButton").innerHTML = "Exporteer collectie"
		document.getElementById("collectionMatrixButton").innerHTML = "Exporteer toetsmatrijs"
		document.getElementById("formDataButton").innerHTML = "Exporteer toets"
		document.getElementById("formMatrixButton").innerHTML = "Exporteer toetsmatrijs"
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Inject script to create assessment matrix from collection on click
	const collectionMatrixButton = document.getElementById("collectionMatrixButton");
	collectionMatrixButton.addEventListener("click", async () => {
		const tab = await getCurrentChromeTab();
		await executeScriptInTab(tab, ['./scripts/matrixFromCollection.js']);
	});

	// Inject script to create assessment matrix from form on click
	const formMatrixButton = document.getElementById("formMatrixButton");
	formMatrixButton.addEventListener("click", async () => {
		const tab = await getCurrentChromeTab();
		await executeScriptInTab(tab, ['./scripts/matrixFromForm.js']);
	});

	// Inject script to extract collection data on click
	const collectionDataButton = document.getElementById("collectionDataButton");
	collectionDataButton.addEventListener("click", async () => {
		const tab = await getCurrentChromeTab();
		await executeScriptInTab(tab, ['./scripts/dataFromCollection.js']);
	});

	// Inject script to extract form data on click
	const formDataButton = document.getElementById("formDataButton");
	formDataButton.addEventListener("click", async () => {
		const tab = await getCurrentChromeTab();
		await executeScriptInTab(tab, ['./scripts/dataFromForm.js']);
	});
});
