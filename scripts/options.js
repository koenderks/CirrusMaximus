// Saves options to chrome.storage
const saveOptions = () => {
	const sep = document.getElementById('separator').value;
	const lan = document.getElementById('language').value;

	chrome.storage.sync.set(
		{ separator: sep, language: lan },
		() => {
			// Update status to let user know options were saved.
			const status = document.getElementById('status');
			lan == "en" ? status.textContent = 'Options saved.' : status.textContent = 'Opties opgeslagen.';
			if (lan == "en") {
				document.getElementById("label-title").innerHTML = "<b>Preferences</b>"
				document.getElementById("label-language").innerHTML = "<b>Language:</b>"
				document.getElementById("label-english").innerHTML = "English"
				document.getElementById("label-dutch").innerHTML = "Dutch"
				document.getElementById("label-separator").innerHTML = "<b>CSV delimiter:</b>"
				document.getElementById("save").innerHTML = "Save"
			} else {
				document.getElementById("label-title").innerHTML = "<b>Voorkeuren</b>"
				document.getElementById("label-language").innerHTML = "<b>Taal:</b>"
				document.getElementById("label-english").innerHTML = "Engels"
				document.getElementById("label-dutch").innerHTML = "Nederlands"
				document.getElementById("label-separator").innerHTML = "<b>CSV scheidingsteken:</b>"
				document.getElementById("save").innerHTML = "Opslaan"
			}
			setTimeout(() => {
				status.textContent = '';
			}, 750);
		}
	);
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
	chrome.storage.sync.get(
		{ separator: ';', language: 'en' },
		(items) => {
			document.getElementById('separator').value = items.separator;
			document.getElementById('language').value = items.language;
		}
	);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
