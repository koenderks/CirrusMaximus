// Saves options to chrome.storage
const saveOptions = () => {
	const sep = document.getElementById('separator').value;

	chrome.storage.sync.set(
		{ separator: sep },
		() => {
			// Update status to let user know options were saved.
			const status = document.getElementById('status');
			status.textContent = 'Options saved.';
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
		{ separator: ';' },
		(items) => {
			document.getElementById('separator').value = items.separator;
		}
	);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);