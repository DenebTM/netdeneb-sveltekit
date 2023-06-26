export const login = async (username: string, password: string): Promise<Response> => {
  const formdata = new FormData()
  formdata.append('username', username)
  formdata.append('password', password)

  return fetch('/login', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formdata,
  })
}

export const logout = async (): Promise<Response> =>
  fetch('/logout', {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })
