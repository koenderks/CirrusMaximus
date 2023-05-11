injectAssessmentMatrixScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['assessmentMatrix.js']
		}
	)
	console.log(`Loading: ${url}`);
}

injectDataExtractionScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['dataExtraction.js']
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
	const matrixButton = document.getElementById("matrixButton");
	matrixButton.addEventListener("click", () => {
		getCurrentTab().then((tab) => {
			injectAssessmentMatrixScript(tab)
		})
	});
	const dataButton = document.getElementById("dataButton");
	dataButton.addEventListener("click", () => {
		getCurrentTab().then((tab) => {
			injectDataExtractionScript(tab)
		})
	});
});
