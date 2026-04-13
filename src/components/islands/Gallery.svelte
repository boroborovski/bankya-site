<script>
  let { images = [], pageSize = 12 } = $props()

  // Categories
  const allCategories = [...new Set(images.map((img) => img.category).filter(Boolean))]
  const hasCategories = allCategories.length > 0

  let activeCategory = $state('all')
  let page = $state(1)
  let lightboxIndex = $state(null)

  const filtered = $derived(
    activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory)
  )
  const totalPages = $derived(Math.ceil(filtered.length / pageSize))
  const visible = $derived(filtered.slice(0, page * pageSize))
  const hasMore = $derived(page * pageSize < filtered.length)

  function setCategory(cat) {
    activeCategory = cat
    page = 1
  }

  function loadMore() {
    page += 1
  }

  // Lightbox index is relative to `filtered`, not `images`
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
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-gap:1rem]">
    {#each visible as img, i}
      <button
        onclick={() => openLightbox(i)}
        class="w-full mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-zoom-in block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group"
      >
        <div class="relative">
          <img
            src={img.src}
            alt={img.alt}
            class="w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          {#if img.caption}
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-sm">{img.caption}</p>
            </div>
          {/if}
        </div>
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
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    onclick={closeLightbox}
    role="dialog"
    aria-modal="true"
    aria-label="Преглед на снимка"
  >
    <div
      class="relative max-w-5xl w-full flex flex-col items-center"
      onclick={(e) => e.stopPropagation()}
    >
      <img
        src={filtered[lightboxIndex].src}
        alt={filtered[lightboxIndex].alt}
        class="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
      />
      {#if filtered[lightboxIndex].caption}
        <p class="mt-4 text-gray-300 text-sm text-center">{filtered[lightboxIndex].caption}</p>
      {/if}
      <p class="mt-2 text-gray-500 text-xs">{lightboxIndex + 1} / {filtered.length}</p>
    </div>

    <button onclick={closeLightbox} class="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors" aria-label="Затвори">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {#if filtered.length > 1}
      <button onclick={prevImage} class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors" aria-label="Предишна снимка">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onclick={nextImage} class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors" aria-label="Следваща снимка">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>
{/if}
