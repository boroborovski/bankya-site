<script>
  let open = $state(false)
  let expandedItem = $state(null)

  let { navItems = [] } = $props()

  function toggleSubmenu(label) {
    expandedItem = expandedItem === label ? null : label
  }
</script>

<!-- Hamburger -->
<button
  onclick={() => (open = !open)}
  class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
  aria-label="Отвори меню"
  aria-expanded={open}
>
  {#if open}
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  {/if}
</button>

<!-- Drawer -->
{#if open}
  <div class="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <button
      class="absolute inset-0 bg-black/40 cursor-default"
      onclick={() => (open = false)}
      aria-label="Затвори меню"
    ></button>

    <!-- Panel -->
    <nav class="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <span class="font-extrabold text-gray-900 tracking-tight">
          БПЛР<span class="text-blue-700">–БАНКЯ</span>
        </span>
        <button
          onclick={() => (open = false)}
          class="p-1.5 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Затвори"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Nav items -->
      <ul class="flex flex-col px-4 py-4 gap-1 flex-1">
        {#each navItems as item}
          <li>
            {#if item.subItems}
              <!-- Expandable item -->
              <button
                onclick={() => toggleSubmenu(item.label)}
                class="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-left"
                aria-expanded={expandedItem === item.label}
              >
                {item.label}
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200 {expandedItem === item.label ? 'rotate-180' : ''}"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {#if expandedItem === item.label}
                <ul class="ml-4 mt-1 border-l-2 border-blue-100 pl-3 space-y-1">
                  {#each item.subItems as sub}
                    <li>
                      <a
                        href={sub.url}
                        onclick={() => (open = false)}
                        class="block py-2 px-2 text-sm text-gray-600 hover:text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        {sub.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            {:else}
              <a
                href={item.url}
                onclick={() => (open = false)}
                class="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            {/if}
          </li>
        {/each}
      </ul>

      <!-- CTA -->
      <div class="px-4 pb-6 pt-2 border-t border-gray-100">
        <a
          href="/kontakti"
          onclick={() => (open = false)}
          class="flex justify-center items-center px-4 py-3 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
        >
          Свържете се с нас
        </a>
      </div>
    </nav>
  </div>
{/if}
