chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
	var currentUrl = tabs[0].url;
	if (currentUrl.includes("cirrusplatform.com")) {
		const par = document.getElementById("status");
		par.innerHTML = "Status: <b style='color: green;'>Active</b>";
	} else {
		const buttons = document.querySelectorAll(".my-button");
		buttons.forEach(button => button.classList.add("hidden"));
	}
});

injectAssessmentMatrixScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['common.js', 'assessmentMatrix.js']
		}
	)
	console.log(`Loading: ${url}`);
}

injectDataExtractionScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['common.js', 'dataExtraction.js']
		}
	)
	console.log(`Loading: ${url}`);
}

getCurrentTab = async () => {
	let queryOptions = { active: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

document.addEventListener("DOMContentLoaded", () => {
	// Inject script to create assessment matrix on click
	const matrixButton = document.getElementById("matrixButton");
	matrixButton.addEventListener("click", () => {
		getCurrentTab().then((tab) => {
			injectAssessmentMatrixScript(tab)
		})
	});
	// Inject script to extract data on click
	const dataButton = document.getElementById("dataButton");
	dataButton.addEventListener("click", () => {
		getCurrentTab().then((tab) => {
			injectDataExtractionScript(tab)
		})
	});
});
