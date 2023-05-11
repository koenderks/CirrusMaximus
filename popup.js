injectContentScript = (tab) => {
	const { id, url } = tab;
	chrome.scripting.executeScript(
		{
			target: { tabId: id, allFrames: true },
			files: ['main.js']
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
	const myButton = document.getElementById("matrixButton");
	myButton.addEventListener("click", () => {
	  getCurrentTab().then((tab) => {
		injectContentScript(tab)
	  })
	});
  });