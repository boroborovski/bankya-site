import { config, collection, singleton, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({ label: 'Publish Date' }),
        author: fields.text({ label: 'Author' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    team: collection({
      label: 'Team Members',
      slugField: 'name',
      path: 'content/team/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/team',
          publicPath: '/images/team',
        }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
        twitter: fields.text({ label: 'Twitter / X URL' }),
      },
    }),

    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'content/services/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        icon: fields.text({ label: 'Icon (e.g. heroicon name or emoji)' }),
        order: fields.integer({ label: 'Display Order' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },

  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'content/singletons/homepage',
      schema: {
        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroSubheadline: fields.text({ label: 'Hero Subheadline', multiline: true }),
        heroCtaLabel: fields.text({ label: 'Hero CTA Label' }),
        heroCtaUrl: fields.text({ label: 'Hero CTA URL' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/images',
          publicPath: '/images',
        }),
      },
    }),

    settings: singleton({
      label: 'Site Settings',
      path: 'content/singletons/settings',
      schema: {
        siteName: fields.text({ label: 'Site Name' }),
        siteDescription: fields.text({ label: 'Site Description', multiline: true }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images',
          publicPath: '/images',
        }),
        twitterUrl: fields.text({ label: 'Twitter / X URL' }),
        linkedinUrl: fields.text({ label: 'LinkedIn URL' }),
        githubUrl: fields.text({ label: 'GitHub URL' }),
        instagramUrl: fields.text({ label: 'Instagram URL' }),
        footerText: fields.text({ label: 'Footer Text' }),
      },
    }),
  },
})
