import type { HandleServerError } from '@sveltejs/kit'

export const handleError: HandleServerError = ({
  error,
  event,
  status,
  message,
}) => {
  const hrefPath = event.url.href.replace(event.url.origin, '')

  console.error(`SvelteKit error: ${status} ${message} (path: '${hrefPath}')`)
  if (status === 500) {
    console.error(error)
  }
}
