export const login = (username: string, password: string) => fetch('/login', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: JSON.stringify({username, password})
})

export const logout = (fetch: Function) => fetch('/logout', {
    method: 'POST',
    headers: { 'Accept': 'application/json' }
})