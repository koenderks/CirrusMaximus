// Check the current url and hide elements accordingly
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
	var currentUrl = tabs[0].url;
	const par = document.getElementById("status");
	if (currentUrl.includes("cirrusplatform.com/author/app#/library/collections/")) {
		par.innerHTML = "Status: <b style='color: green;'>Active</b>";
		const buttons = document.querySelectorAll(".form-button");
		buttons.forEach(button => button.classList.add("hidden"));
	} else if (currentUrl.includes("cirrusplatform.com/author/app#/assessments/item/")) {
		par.innerHTML = "Status: <b style='color: green;'>Active</b>";
		const buttons = document.querySelectorAll(".collection-button");
		buttons.forEach(button => button.classList.add("hidden"));
	} else {
		const collectionButtons = document.querySelectorAll(".collection-button");
		collectionButtons.forEach(button => button.classList.add("hidden"));
		const formButtons = document.querySelectorAll(".form-button");
		formButtons.forEach(button => button.classList.add("hidden"));
	}
});

injectMatrixFromCollectionScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['common.js', 'matrixFromCollection.js']
		}
	)
	console.log(`Loading: ${url}`);
}

injectDataFromCollectionScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['common.js', 'dataFromCollection.js']
		}
	)
	console.log(`Loading: ${url}`);
}

injectDataFromFormScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['common.js', 'dataFromForm.js']
		}
	)
	console.log(`Loading: ${url}`);
}

getCurrentChromeTab = async () => {
	let queryOptions = { active: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

document.addEventListener("DOMContentLoaded", () => {
	// Inject script to create assessment matrix from collection on click
	const collectionMatrixButton = document.getElementById("collectionMatrixButton");
	collectionMatrixButton.addEventListener("click", () => {
		getCurrentChromeTab().then((tab) => {
			injectMatrixFromCollectionScript(tab)
		})
	});
	// Inject script to extract collection data on click
	const collectionDataButton = document.getElementById("collectionDataButton");
	collectionDataButton.addEventListener("click", () => {
		getCurrentChromeTab().then((tab) => {
			injectDataFromCollectionScript(tab)
		})
	});
	// Inject script to extract form data on click
	const formDataButton = document.getElementById("formDataButton");
	formDataButton.addEventListener("click", () => {
		getCurrentChromeTab().then((tab) => {
			injectDataFromFormScript(tab)
		})
	});
});
