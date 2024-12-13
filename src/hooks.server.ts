import type { HandleServerError } from '@sveltejs/kit'

export const handleError: HandleServerError = async ({
  error,
  event,
  status,
  message,
}) => {
  const href_path = event.url.href.replace(event.url.origin, '')

  console.error(`SvelteKit error: ${status} ${message} (path: '${href_path}')`)
}
