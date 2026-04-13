<script>
  let { images = [] } = $props()
  let lightboxIndex = $state(null)

  function openLightbox(i) {
    lightboxIndex = i
  }

  function closeLightbox() {
    lightboxIndex = null
  }

  function nextImage(e) {
    e.stopPropagation()
    lightboxIndex = (lightboxIndex + 1) % images.length
  }

  function prevImage(e) {
    e.stopPropagation()
    lightboxIndex = (lightboxIndex - 1 + images.length) % images.length
  }

  function handleKeydown(e) {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % images.length
    if (e.key === 'ArrowLeft') lightboxIndex = (lightboxIndex - 1 + images.length) % images.length
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
  <!-- Masonry-style grid -->
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-gap:1rem]">
    {#each images as img, i}
      <button
        onclick={() => openLightbox(i)}
        class="w-full mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-zoom-in block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <img
          src={img.src}
          alt={img.alt}
          class="w-full object-cover hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
      </button>
    {/each}
  </div>
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
    <!-- Image container -->
    <div
      class="relative max-w-5xl w-full flex flex-col items-center"
      onclick={(e) => e.stopPropagation()}
    >
      <img
        src={images[lightboxIndex].src}
        alt={images[lightboxIndex].alt}
        class="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
      />
      {#if images[lightboxIndex].caption}
        <p class="mt-4 text-gray-300 text-sm text-center">{images[lightboxIndex].caption}</p>
      {/if}
      <p class="mt-2 text-gray-500 text-xs">{lightboxIndex + 1} / {images.length}</p>
    </div>

    <!-- Close -->
    <button
      onclick={closeLightbox}
      class="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
      aria-label="Затвори"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Prev -->
    {#if images.length > 1}
      <button
        onclick={prevImage}
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Предишна снимка"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Next -->
      <button
        onclick={nextImage}
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Следваща снимка"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}
  </div>
{/if}
