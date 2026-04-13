import { config, collection, singleton, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    // ─── Blog Posts ───────────────────────────────────────────────────────────
    posts: collection({
      label: 'Новини',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заглавие' } }),
        publishDate: fields.date({ label: 'Дата на публикуване' }),
        author: fields.text({ label: 'Автор' }),
        summary: fields.text({ label: 'Резюме', multiline: true }),
        coverImage: fields.image({
          label: 'Корица',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        content: fields.markdoc({ label: 'Съдържание' }),
      },
    }),

    // ─── Team Members ─────────────────────────────────────────────────────────
    team: collection({
      label: 'Екип',
      slugField: 'name',
      path: 'content/team/*',
      schema: {
        name: fields.slug({ name: { label: 'Имена' } }),
        role: fields.text({ label: 'Длъжност / Специалност' }),
        bio: fields.text({ label: 'Кратка биография', multiline: true }),
        photo: fields.image({
          label: 'Снимка',
          directory: 'public/images/team',
          publicPath: '/images/team',
        }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        twitter: fields.url({ label: 'Twitter / X URL' }),
      },
    }),

    // ─── Services / Activities ────────────────────────────────────────────────
    services: collection({
      label: 'Дейности',
      slugField: 'title',
      path: 'content/services/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заглавие' } }),
        summary: fields.text({ label: 'Кратко описание', multiline: true }),
        icon: fields.text({ label: 'Икона (emoji или heroicon)' }),
        order: fields.integer({ label: 'Ред на показване' }),
        content: fields.markdoc({ label: 'Пълно съдържание' }),
      },
    }),

    // ─── Gallery ──────────────────────────────────────────────────────────────
    gallery: collection({
      label: 'Галерия',
      slugField: 'title',
      path: 'content/gallery/*',
      schema: {
        title: fields.slug({ name: { label: 'Alt текст / Заглавие' } }),
        image: fields.image({
          label: 'Снимка',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery',
        }),
        caption: fields.text({ label: 'Надпис под снимката (по желание)' }),
        order: fields.integer({ label: 'Ред на показване' }),
      },
    }),
  },

  singletons: {
    // ─── Homepage ─────────────────────────────────────────────────────────────
    homepage: singleton({
      label: 'Начална страница',
      path: 'content/singletons/homepage',
      schema: {
        // Hero slider
        heroSlides: fields.array(
          fields.object({
            headline: fields.text({ label: 'Заглавие' }),
            subheadline: fields.text({ label: 'Подзаглавие', multiline: true }),
            ctaLabel: fields.text({ label: 'Бутон 1 – текст' }),
            ctaUrl: fields.text({ label: 'Бутон 1 – URL' }),
            secondaryCtaLabel: fields.text({ label: 'Бутон 2 – текст (по желание)' }),
            secondaryCtaUrl: fields.text({ label: 'Бутон 2 – URL (по желание)' }),
            image: fields.image({
              label: 'Снимка',
              directory: 'public/images/slides',
              publicPath: '/images/slides',
            }),
          }),
          {
            label: 'Слайдове',
            itemLabel: (props) => props.fields.headline.value || 'Слайд',
          }
        ),

        // Section visibility toggles
        showStats: fields.checkbox({ label: 'Покажи статистики', defaultValue: true }),
        showAbout: fields.checkbox({ label: 'Покажи секция "За нас"', defaultValue: true }),
        showServices: fields.checkbox({ label: 'Покажи секция "Дейности"', defaultValue: true }),
        showCta: fields.checkbox({ label: 'Покажи CTA банер', defaultValue: true }),
        showBlog: fields.checkbox({ label: 'Покажи последни новини', defaultValue: true }),

        // Stats strip
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Стойност (напр. 200+)' }),
            label: fields.text({ label: 'Описание (напр. Легла)' }),
          }),
          {
            label: 'Статистики',
            itemLabel: (props) => props.fields.label.value || 'Статистика',
          }
        ),

        // About section
        aboutHeading: fields.text({ label: 'За нас – Заглавие' }),
        aboutBody: fields.text({ label: 'За нас – Параграф 1', multiline: true }),
        aboutBody2: fields.text({ label: 'За нас – Параграф 2', multiline: true }),
        aboutBullets: fields.array(
          fields.object({ text: fields.text({ label: 'Точка' }) }),
          {
            label: 'Предимства (bullet points)',
            itemLabel: (props) => props.fields.text.value || 'Точка',
          }
        ),

        // CTA section
        ctaHeading: fields.text({ label: 'CTA – Заглавие' }),
        ctaBody: fields.text({ label: 'CTA – Текст', multiline: true }),
      },
    }),

    // ─── About Page ───────────────────────────────────────────────────────────
    aboutPage: singleton({
      label: 'Страница "За нас"',
      path: 'content/singletons/about-page',
      schema: {
        // Mission
        missionHeading: fields.text({ label: 'Мисия – Заглавие' }),
        missionBody: fields.text({ label: 'Мисия – Параграф 1', multiline: true }),
        missionBody2: fields.text({ label: 'Мисия – Параграф 2', multiline: true }),
        missionBullets: fields.array(
          fields.object({ text: fields.text({ label: 'Точка' }) }),
          {
            label: 'Предимства',
            itemLabel: (props) => props.fields.text.value || 'Точка',
          }
        ),

        // Stats
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Стойност' }),
            label: fields.text({ label: 'Описание' }),
          }),
          {
            label: 'Статистики',
            itemLabel: (props) => props.fields.label.value || 'Статистика',
          }
        ),

        // Mineral water section
        mineralHeading: fields.text({ label: 'Минерална вода – Заглавие' }),
        mineralBody: fields.text({ label: 'Минерална вода – Параграф 1', multiline: true }),
        mineralBody2: fields.text({ label: 'Минерална вода – Параграф 2', multiline: true }),
        mineralBullets: fields.array(
          fields.object({ text: fields.text({ label: 'Точка' }) }),
          {
            label: 'Предимства',
            itemLabel: (props) => props.fields.text.value || 'Точка',
          }
        ),

        // Timeline
        timelineEvents: fields.array(
          fields.object({
            year: fields.text({ label: 'Година' }),
            title: fields.text({ label: 'Заглавие на събитието' }),
            description: fields.text({ label: 'Описание', multiline: true }),
          }),
          {
            label: 'История (таймлайн)',
            itemLabel: (props) =>
              props.fields.year.value
                ? `${props.fields.year.value} – ${props.fields.title.value}`
                : 'Събитие',
          }
        ),
      },
    }),

    // ─── Site Settings ────────────────────────────────────────────────────────
    settings: singleton({
      label: 'Настройки на сайта',
      path: 'content/singletons/settings',
      schema: {
        siteName: fields.text({ label: 'Име на сайта' }),
        siteDescription: fields.text({ label: 'Описание на сайта', multiline: true }),
        footerDescription: fields.text({ label: 'Footer – Кратко описание', multiline: true }),
        logo: fields.image({
          label: 'Лого',
          directory: 'public/images',
          publicPath: '/images',
        }),

        // Contact info (used in TopBar, Footer, Contact page)
        phone: fields.text({ label: 'Телефон' }),
        email: fields.text({ label: 'Имейл' }),
        address: fields.text({ label: 'Адрес' }),
        hours: fields.text({ label: 'Работно време' }),

        // Social
        facebookUrl: fields.url({ label: 'Facebook URL' }),
        instagramUrl: fields.url({ label: 'Instagram URL' }),
        linkedinUrl: fields.url({ label: 'LinkedIn URL' }),
      },
    }),
  },
})
