<script>
  let open = $state(false)

  let { navItems = [] } = $props()
</script>

<!-- Hamburger button -->
<button
  onclick={() => (open = !open)}
  class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
  aria-label="Toggle menu"
  aria-expanded={open}
>
  {#if open}
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  {/if}
</button>

<!-- Mobile drawer -->
{#if open}
  <div class="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <button
      class="absolute inset-0 bg-black/30 cursor-default"
      onclick={() => (open = false)}
      aria-label="Close menu"
    ></button>

    <!-- Panel -->
    <nav class="absolute top-0 right-0 h-full w-64 bg-white shadow-xl flex flex-col p-6">
      <button
        onclick={() => (open = false)}
        class="self-end p-2 text-gray-500 hover:text-gray-900 mb-6"
        aria-label="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <ul class="flex flex-col gap-4">
        {#each navItems as item}
          <li>
            <a
              href={item.url}
              onclick={() => (open = false)}
              class="block text-base font-medium text-gray-700 hover:text-gray-900"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>

      <a
        href="/contact"
        class="mt-8 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Get in touch
      </a>
    </nav>
  </div>
{/if}
