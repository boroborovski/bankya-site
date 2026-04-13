<script>
  let name = $state('')
  let email = $state('')
  let phone = $state('')
  let subject = $state('')
  let message = $state('')
  let status = $state(null) // null | 'sending' | 'success' | 'error'
  let errors = $state({})

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Моля въведете вашето име'
    if (!email.trim()) e.email = 'Моля въведете имейл адрес'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Невалиден имейл адрес'
    if (!message.trim()) e.message = 'Моля напишете вашето съобщение'
    errors = e
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    status = 'sending'
    // TODO: wire up POST /api/contact
    await new Promise((r) => setTimeout(r, 1000))
    status = 'success'
  }
</script>

{#if status === 'success'}
  <div class="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
    <svg class="w-14 h-14 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 class="text-xl font-bold text-gray-900 mb-2">Съобщението е изпратено!</h3>
    <p class="text-gray-600">Ще се свържем с вас в рамките на работния ден.</p>
  </div>
{:else}
  <form onsubmit={handleSubmit} class="space-y-5" novalidate>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <!-- Name -->
      <div>
        <label for="cf-name" class="block text-sm font-medium text-gray-700 mb-1">
          Имена <span class="text-red-500">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          bind:value={name}
          placeholder="Иван Иванов"
          class="w-full px-4 py-3 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition {errors.name
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 bg-white'}"
        />
        {#if errors.name}
          <p class="mt-1 text-xs text-red-600">{errors.name}</p>
        {/if}
      </div>

      <!-- Email -->
      <div>
        <label for="cf-email" class="block text-sm font-medium text-gray-700 mb-1">
          Имейл <span class="text-red-500">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          bind:value={email}
          placeholder="ivan@example.com"
          class="w-full px-4 py-3 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition {errors.email
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 bg-white'}"
        />
        {#if errors.email}
          <p class="mt-1 text-xs text-red-600">{errors.email}</p>
        {/if}
      </div>

      <!-- Phone -->
      <div>
        <label for="cf-phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
        <input
          id="cf-phone"
          type="tel"
          bind:value={phone}
          placeholder="+359 88 ..."
          class="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <!-- Subject -->
      <div>
        <label for="cf-subject" class="block text-sm font-medium text-gray-700 mb-1">Относно</label>
        <select
          id="cf-subject"
          bind:value={subject}
          class="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        >
          <option value="">Изберете тема...</option>
          <option value="appointment">Записване на час</option>
          <option value="info">Обща информация</option>
          <option value="pathways">Клинични пътеки</option>
          <option value="noi">НОИ / Социално осигуряване</option>
          <option value="paid">Платен прием</option>
          <option value="other">Друго</option>
        </select>
      </div>
    </div>

    <!-- Message -->
    <div>
      <label for="cf-message" class="block text-sm font-medium text-gray-700 mb-1">
        Съобщение <span class="text-red-500">*</span>
      </label>
      <textarea
        id="cf-message"
        bind:value={message}
        rows="5"
        placeholder="Напишете вашето съобщение тук..."
        class="w-full px-4 py-3 border rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none {errors.message
          ? 'border-red-400 bg-red-50'
          : 'border-gray-300 bg-white'}"
      ></textarea>
      {#if errors.message}
        <p class="mt-1 text-xs text-red-600">{errors.message}</p>
      {/if}
    </div>

    {#if status === 'error'}
      <div class="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
        Грешка при изпращане. Моля опитайте отново или се обадете директно.
      </div>
    {/if}

    <button
      type="submit"
      disabled={status === 'sending'}
      class="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {#if status === 'sending'}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 16 4.418 16A8 8 0 014 12z"></path>
        </svg>
        Изпращане...
      {:else}
        Изпрати съобщение
      {/if}
    </button>
  </form>
{/if}
