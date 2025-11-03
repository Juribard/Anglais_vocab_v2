// Rendu dynamique de la liste de vocabulaire
// Ce script suppose que `scripts/voc.js` a défini globalement `dictionnaire` (Array)
document.addEventListener('DOMContentLoaded', function () {
	const container = document.getElementById('vocab-list');
	if (!container) return;

	// `scripts/voc.js` déclare `dictionnaire` avec `const`, qui n'est pas
	// forcément exposé comme propriété `window.dictionnaire`.
	// On supporte donc plusieurs façons d'y accéder (globalThis, variable globale).
	const dict = (typeof globalThis !== 'undefined' && globalThis.dictionnaire)
		? globalThis.dictionnaire
		: (typeof dictionnaire !== 'undefined' ? dictionnaire : null);

	if (!dict || !Array.isArray(dict)) {
		container.textContent = 'Dictionnaire introuvable. Assurez-vous que scripts/voc.js est chargé et que la variable `dictionnaire` existe.';
		return;
	}

	const ul = document.createElement('ul');
	ul.className = 'vocab-ul';

	dict.forEach((entry, idx) => {
		const li = document.createElement('li');
		li.className = 'vocab-item';
		li.dataset.index = idx;
		if (entry.type) li.dataset.type = entry.type;

		// Format FR
		const frText = Array.isArray(entry.m_fr) ? entry.m_fr.join(', ') : (entry.m_fr || '');
		const frSpan = document.createElement('span');
		frSpan.className = 'mot-fr';
		frSpan.textContent = frText;

		// Separator
		const sep = document.createElement('span');
		sep.className = 'vocab-sep';
		sep.textContent = ' — ';

		// Format EN
		const enText = Array.isArray(entry.m_en) ? entry.m_en.join(', ') : (entry.m_en || '');
		const enSpan = document.createElement('span');
		enSpan.className = 'mot-en';
		enSpan.textContent = enText;

		li.appendChild(frSpan);
		li.appendChild(sep);
		li.appendChild(enSpan);
		ul.appendChild(li);
	});

	container.appendChild(ul);
});
