export const clickOutside = (element : HTMLElement, callback : Function) => {
    const onClick = (e : Event) => !element.contains(e.target as Node) && callback()
    document.addEventListener('click', onClick)

    return {
        update: (newCallback : Function) => callback = newCallback,
        destroy: () => document.body.removeEventListener('click', onClick)
    }
}