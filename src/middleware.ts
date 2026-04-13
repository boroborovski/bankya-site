import { defineMiddleware } from 'astro:middleware'

// On Vercel, the serverless function may receive requests where req.headers.host
// is 'localhost'. The real hostname comes from x-forwarded-host.
// Keystatic builds its OAuth redirect_uri from context.request.url, so we need
// to fix the URL before the request reaches Keystatic.
export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url)

  if (url.hostname === 'localhost') {
    const forwardedHost = context.request.headers.get('x-forwarded-host')
    const forwardedProto = context.request.headers.get('x-forwarded-proto') ?? 'https'

    if (forwardedHost) {
      const [hostname, port] = forwardedHost.split(':')
      url.protocol = forwardedProto + ':'
      url.hostname = hostname
      url.port = port ?? ''

      context.request = new Request(url.toString(), context.request)
    }
  }

  return next()
})
