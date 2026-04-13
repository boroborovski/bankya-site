<script>
  import { onMount } from 'svelte'

  let { items = [] } = $props()
  let openIndex = $state(0)

  function toggle(i) {
    openIndex = openIndex === i ? null : i
  }

  onMount(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const idx = items.findIndex((item) => item.id === hash)
      if (idx !== -1) {
        openIndex = idx
        // wait for render then scroll
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
    }
  })
</script>

<div class="max-w-3xl mx-auto divide-y divide-gray-100 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
  {#each items as item, i}
    <div id={item.id}>
      <button
        onclick={() => toggle(i)}
        class="flex items-center justify-between w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
        aria-expanded={openIndex === i}
      >
        <span class="font-semibold text-gray-900 text-base pr-4">{item.title}</span>
        <span class="shrink-0 ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700 transition-transform duration-200 {openIndex === i ? 'rotate-180' : ''}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {#if openIndex === i}
        <div class="px-6 py-5 bg-gray-50 border-t border-gray-100 text-gray-600 leading-relaxed text-sm sm:text-base">
          {@html item.content}
        </div>
      {/if}
    </div>
  {/each}
</div>
