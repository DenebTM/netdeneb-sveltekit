export const login = (username: string, password: string) => {
    const formdata = new FormData()
    formdata.append('username', username)
    formdata.append('password', password)

    return fetch('/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formdata
    })
}

export const logout = (fetch: Function) => fetch('/logout', {
    method: 'POST',
    headers: { 'Accept': 'application/json' }
})