// Language switcher for loading ENG / ID partials
// Saves preference to localStorage and reloads partials in-place.
console.log('[i18n] switch_Language.js loaded');

(function () {
	const LANG_KEY = 'preferredLang';
	const DEFAULT = 'ENG'; // as per user's choice

	function getPreferred() {
		return localStorage.getItem(LANG_KEY) || DEFAULT;
	}

	function setPreferred(lang) {
		localStorage.setItem(LANG_KEY, lang);
	}

	// Replace data-include paths in the main content and reload partials
	async function applyLanguage(lang) {
		const root = document.getElementById('app-root');
		if (!root) return;

		// Do not replace nav; user requested navbar remain as-is.
		// Only update main-content placeholders to point to views/{lang}/*.html

		// For all other placeholders inside main-content, switch ENG/ID prefix
		const main = document.getElementById('main-content');
		if (!main) return;
		const includeNodes = main.querySelectorAll('[data-include]');
		includeNodes.forEach(node => {
			const file = node.getAttribute('data-include');
			if (!file) return;
			// Expecting files like views/ENG/hero.html etc.
			const parts = file.split('/');
			if (parts.length >= 3 && (parts[1] === 'ENG' || parts[1] === 'ID')) {
				const newPath = `views/${lang}/${parts.slice(2).join('/')}`;
				node.setAttribute('data-include', newPath);
			}
		});

		// Reload partials by re-running the loader used in index.html
		if (typeof loadPartials === 'function') {
			await loadPartials();
		} else {
			// Fallback: trigger DOMContentLoaded handler used earlier
			document.dispatchEvent(new Event('DOMContentLoaded'));
		}

		// After partials loaded, re-bind nav button text and initAppScripts
		updateLangButtonUI(lang);
	}

	function updateLangButtonUI(lang) {
		const btn = document.getElementById('lang-switch');
		if (!btn) return;
	// Show current language on the button and tooltip indicates the language on click
	btn.textContent = lang;
	btn.dataset.lang = lang;
	const next = lang === 'ENG' ? 'ID' : 'ENG';
	btn.title = `Click to switch to ${next}`;
	}

	// Toggle handler
	function toggleLanguage() {
		const current = getPreferred();
		const next = current === 'ENG' ? 'ID' : 'ENG';
		setPreferred(next);
		applyLanguage(next);
	}

	// Init on DOM ready (after partials loaded)
	function init() {
		// Bind to nav button (may be injected later), listen to partials:loaded
		document.addEventListener('partials:loaded', () => {
			bindButtonIfExists();
		});

		// Also bind asap if button already present or appears without dispatch
		bindButtonIfExists();

		// Watch DOM for insertion of the nav partial (covers cases where loader
		// calls initAppScripts and doesn't dispatch 'partials:loaded')
		const mo = new MutationObserver((mutations, observer) => {
			if (document.getElementById('lang-switch')) {
				bindButtonIfExists();
				observer.disconnect();
			}
		});
		mo.observe(document.body, { childList: true, subtree: true });

		// If partials already loaded, run immediately to bind
		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			const pref = getPreferred();
			// ensure button UI is set even before any clicks
			setTimeout(() => updateLangButtonUI(pref), 50);
			// Apply preferred language on first load if different from default
			if (pref !== DEFAULT) {
				applyLanguage(pref).catch(err => console.error('[i18n] applyLanguage error', err));
			}
		}
	}

	// Expose for debugging
	window.i18n = {
		getPreferred,
		setPreferred,
		applyLanguage
	};

	init();
})();

// Helper: bind and update the button if it exists
function bindButtonIfExists() {
	try {
		const btn = document.getElementById('lang-switch');
		if (!btn) return false;
		if (!btn.dataset.bound) {
			btn.dataset.bound = '1';
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				// toggle via the same function in closure
				if (window.i18n && typeof window.i18n.getPreferred === 'function') {
					const current = window.i18n.getPreferred();
					const next = current === 'ENG' ? 'ID' : 'ENG';
					window.i18n.setPreferred && window.i18n.setPreferred(next);
					window.i18n.applyLanguage && window.i18n.applyLanguage(next);
				}
			});
		}
		// update UI to reflect stored pref
		if (window.i18n && typeof window.i18n.getPreferred === 'function') {
			const pref = window.i18n.getPreferred();
			// call updateLangButtonUI if available
			if (typeof updateLangButtonUI === 'function') updateLangButtonUI(pref);
			else btn.textContent = pref;
		}
		return true;
	} catch (e) {
		console.error('[i18n] bindButtonIfExists error', e);
		return false;
	}
}
