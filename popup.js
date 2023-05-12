// Check the current url and hide elements accordingly
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
	var currentUrl = tabs[0].url;
	if (currentUrl.includes("cirrusplatform.com/author/app#/library/collections")) {
		const par = document.getElementById("status");
		par.innerHTML = "Status: <b style='color: green;'>Active</b>";
	} else {
		const buttons = document.querySelectorAll(".my-button");
		buttons.forEach(button => button.classList.add("hidden"));
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

getCurrentChromeTab = async () => {
	let queryOptions = { active: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

document.addEventListener("DOMContentLoaded", () => {
	// Inject script to create assessment matrix on click
	const matrixButton = document.getElementById("matrixButton");
	matrixButton.addEventListener("click", () => {
		getCurrentChromeTab().then((tab) => {
			injectMatrixFromCollectionScript(tab)
		})
	});
	// Inject script to extract data on click
	const dataButton = document.getElementById("dataButton");
	dataButton.addEventListener("click", () => {
		getCurrentChromeTab().then((tab) => {
			injectDataFromCollectionScript(tab)
		})
	});
});
