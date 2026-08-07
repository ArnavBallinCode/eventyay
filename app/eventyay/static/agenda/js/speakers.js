// Progressive enhancement for the public speakers overview: fetches additional
// pages of speaker cards on demand instead of loading the whole directory.

function initSpeakersLoadMore() {
	const button = document.querySelector('[data-speakers-loadmore]')
	const grid = document.querySelector('[data-speakers-grid]')
	if (!button || !grid) {
		return
	}

	const baseUrl = button.dataset.url
	const query = button.dataset.query || ''
	const totalPages = parseInt(button.dataset.totalPages, 10) || 1
	let nextPage = parseInt(button.dataset.nextPage, 10) || 2
	let loading = false

	const finish = () => {
		if (observer) {
			observer.disconnect()
		}
		button.remove()
	}

	async function loadNext() {
		if (loading || nextPage > totalPages) {
			return
		}
		loading = true
		button.disabled = true
		const params = new URLSearchParams({ partial: '1', page: String(nextPage) })
		if (query) {
			params.set('q', query)
		}
		try {
			const response = await fetch(`${baseUrl}?${params.toString()}`, {
				credentials: 'same-origin',
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			})
			if (!response.ok) {
				throw new Error(`Unexpected response ${response.status} while loading speakers`)
			}
			const markup = await response.text()
			grid.insertAdjacentHTML('beforeend', markup)
			nextPage += 1
			if (nextPage > totalPages) {
				finish()
			}
		} catch (error) {
			console.error('Failed to load more speakers', error)
		} finally {
			loading = false
			button.disabled = false
		}
	}

	button.addEventListener('click', loadNext)

	// Auto-load as the visitor approaches the button, so the directory keeps
	// filling in without an explicit click on capable browsers.
	let observer = null
	if ('IntersectionObserver' in window) {
		observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				loadNext()
			}
		}, { rootMargin: '400px' })
		observer.observe(button)
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initSpeakersLoadMore)
} else {
	initSpeakersLoadMore()
}
