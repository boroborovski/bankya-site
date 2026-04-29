<script>
  let { images = [], pageSize = 12 } = $props()

  const allCategories = [...new Set(images.map((img) => img.category).filter(Boolean))]
  const hasCategories = allCategories.length > 0

  let activeCategory = $state('all')
  let page = $state(1)
  let lightboxIndex = $state(null)

  const filtered = $derived(
    activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory)
  )
  const visible = $derived(filtered.slice(0, page * pageSize))
  const hasMore = $derived(page * pageSize < filtered.length)

  function setCategory(cat) {
    activeCategory = cat
    page = 1
  }

  function loadMore() { page += 1 }
  function openLightbox(i) { lightboxIndex = i }
  function closeLightbox() { lightboxIndex = null }
  function nextImage(e) {
    e.stopPropagation()
    lightboxIndex = (lightboxIndex + 1) % filtered.length
  }
  function prevImage(e) {
    e.stopPropagation()
    lightboxIndex = (lightboxIndex - 1 + filtered.length) % filtered.length
  }
  function handleKeydown(e) {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % filtered.length
    if (e.key === 'ArrowLeft') lightboxIndex = (lightboxIndex - 1 + filtered.length) % filtered.length
  }

  function getYouTubeId(url) {
    if (!url) return null
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/)
    return m ? m[1] : null
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if images.length === 0}
  <div class="text-center py-20 text-gray-400">
    <svg class="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p class="text-lg">Галерията скоро ще бъде попълнена.</p>
  </div>
{:else}
  <!-- Category filter -->
  {#if hasCategories}
    <div class="flex flex-wrap gap-2 mb-8 justify-center">
      <button
        onclick={() => setCategory('all')}
        class={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
      >
        Всички ({images.length})
      </button>
      {#each allCategories as cat}
        <button
          onclick={() => setCategory(cat)}
          class={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {cat} ({images.filter((img) => img.category === cat).length})
        </button>
      {/each}
    </div>
  {/if}

  <!-- Grid -->
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {#each visible as img, i}
      {@const ytId = getYouTubeId(img.youtubeUrl)}
      {@const thumbSrc = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : img.src}
      <button
        onclick={() => openLightbox(i)}
        class="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 {ytId ? 'cursor-pointer' : 'cursor-zoom-in'}"
      >
        <img
          src={thumbSrc}
          alt={img.alt}
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
          loading="lazy"
        />
        {#if ytId}
          <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
            <div class="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        {:else if img.caption}
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <p class="text-white text-xs leading-tight">{img.caption}</p>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Load more -->
  {#if hasMore}
    <div class="mt-10 text-center">
      <button
        onclick={loadMore}
        class="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
      >
        Покажи още ({filtered.length - page * pageSize} остават)
      </button>
    </div>
  {/if}
{/if}

<!-- Lightbox -->
{#if lightboxIndex !== null}
  {@const item = filtered[lightboxIndex]}
  {@const ytId = getYouTubeId(item.youtubeUrl)}
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    onclick={closeLightbox}
    role="dialog"
    aria-modal="true"
    aria-label="Преглед"
  >
    <div
      class="relative max-w-5xl w-full flex flex-col items-center"
      onclick={(e) => e.stopPropagation()}
    >
      {#if ytId}
        <div class="w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/{ytId}?autoplay=1"
            title={item.alt || 'Видео'}
            class="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      {:else}
        <img
          src={item.src}
          alt={item.alt}
          class="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
        />
      {/if}
      {#if item.caption}
        <p class="mt-4 text-gray-300 text-sm text-center">{item.caption}</p>
      {/if}
      <p class="mt-2 text-gray-500 text-xs">{lightboxIndex + 1} / {filtered.length}</p>
    </div>

    <button onclick={closeLightbox} class="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors" aria-label="Затвори">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {#if filtered.length > 1}
      <button onclick={prevImage} class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors" aria-label="Предишна">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onclick={nextImage} class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors" aria-label="Следваща">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>
{/if}
