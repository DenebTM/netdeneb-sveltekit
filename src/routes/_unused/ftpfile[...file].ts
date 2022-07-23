// this route exists to make sure old links still work
import type { RequestHandler } from '@sveltejs/kit'
import { join as pathJoin } from 'path'

export const GET: RequestHandler = async ({ params: { file } }) => ({
    status: 301,
    headers: { 'Location': pathJoin('/files', file) }
})