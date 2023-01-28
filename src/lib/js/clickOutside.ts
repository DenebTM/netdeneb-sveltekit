export const clickOutside = (element: HTMLElement, callback: () => void): SvelteActionReturnType => {
  const onClick = (e: Event): void => { !element.contains(e.target as Node) && callback() }
  document.addEventListener('click', onClick)

  return {
    update: (newCallback: () => void) => (callback = newCallback),
    destroy: () => { document.body.removeEventListener('click', onClick) },
  }
}
