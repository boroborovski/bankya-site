import Markdoc from '@markdoc/markdoc'

function extractYouTubeId(url: string): string {
  // Handles: youtu.be/ID, ?v=ID, /embed/ID, or bare ID
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /[?&]v=([^?&]+)/,
    /\/embed\/([^?&]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return url
}

export const markdocConfig = {
  tags: {
    youtube: {
      attributes: {
        url: { type: String, required: true },
      },
      transform(node: any, config: any) {
        const id = extractYouTubeId(node.attributes.url ?? '')
        return new Markdoc.Tag(
          'div',
          { class: 'youtube-embed my-8' },
          [
            new Markdoc.Tag('iframe', {
              src: `https://www.youtube.com/embed/${id}`,
              title: 'YouTube видео',
              frameborder: '0',
              allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
              allowfullscreen: 'true',
            }),
          ]
        )
      },
    },
  },
}
