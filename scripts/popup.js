// Check the current url and hide elements accordingly
chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
	const currentUrl = tabs[0].url;
	const par = document.getElementById("status");
	if (currentUrl.includes("cirrusplatform.com/author/app#/library/collections/")) {
		par.innerHTML = `Status: <b style='color: green;'>Active</b>`;
		hideButtonsByClass("form-button");
	} else if (currentUrl.includes("cirrusplatform.com/author/app#/assessments/item/")) {
		par.innerHTML = `Status: <b style='color: green;'>Active</b>`;
		hideButtonsByClass("collection-button");
	} else {
		hideButtonsByClass("collection-button");
		hideButtonsByClass("form-button");
	}
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
