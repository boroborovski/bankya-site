<script>
  import { onMount } from 'svelte'

  let { slides = [] } = $props()

  let current = $state(0)
  let timer = null

  function next() {
    current = (current + 1) % slides.length
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length
  }

  function goTo(i) {
    current = i
    restartTimer()
  }

  function startTimer() {
    if (slides.length < 2) return
    timer = setInterval(next, 5000)
  }

  function stopTimer() {
    clearInterval(timer)
    timer = null
  }

  function restartTimer() {
    stopTimer()
    startTimer()
  }

  onMount(() => {
    startTimer()
    return () => stopTimer()
  })
</script>

<div
  class="relative w-full overflow-hidden bg-blue-900"
  style="min-height: 560px"
  onmouseenter={stopTimer}
  onmouseleave={startTimer}
  role="region"
  aria-label="Слайдшоу"
>
  {#each slides as slide, i}
    <div
      class="absolute inset-0 transition-opacity duration-700 {i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
      aria-hidden={i !== current}
    >
      {#if slide.image}
        <img src={slide.image} alt="" class="w-full h-full object-cover absolute inset-0" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10"></div>
      {:else}
        <div class="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600"></div>
      {/if}

      <div class="absolute inset-0 flex items-center">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
          <div class="max-w-2xl">
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {slide.headline}
            </h1>
            {#if slide.subheadline}
              <p class="mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed">{slide.subheadline}</p>
            {/if}
            {#if slide.ctaLabel && slide.ctaUrl}
              <div class="mt-8 flex flex-wrap gap-4">
                <a
                  href={slide.ctaUrl}
                  class="inline-flex items-center px-6 py-3 text-base font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  {slide.ctaLabel}
                </a>
                {#if slide.secondaryCtaLabel && slide.secondaryCtaUrl}
                  <a
                    href={slide.secondaryCtaUrl}
                    class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {slide.secondaryCtaLabel}
                  </a>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}

  <!-- Prev button -->
  {#if slides.length > 1}
    <button
      onclick={prev}
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors backdrop-blur-sm"
      aria-label="Предишен слайд"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Next button -->
    <button
      onclick={next}
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/25 hover:bg-black/45 text-white transition-colors backdrop-blur-sm"
      aria-label="Следващ слайд"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Dot indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {#each slides as _, i}
        <button
          onclick={() => goTo(i)}
          class="rounded-full transition-all duration-300 {i === current
            ? 'w-6 h-2.5 bg-white'
            : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'}"
          aria-label={`Слайд ${i + 1}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>
