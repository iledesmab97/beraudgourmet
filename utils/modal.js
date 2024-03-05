export function accept (addInformation, closeModal ) {
    addInformation.action(addInformation.value)
    closeModal()
}

export function scrollToSection (ideSection) {
    const section = document.querySelector(ideSection)
    section.scrollIntoView({ behavior: 'smooth' })
}

export function showScrollPosition (contenedor) {
    const content = document.querySelector(contenedor)
    return {vertical: content.scrollTop}
}

export function saveModal(modal) {
    localStorage.setItem('modalToOpen', modal)
}

export function modalSaved() {
    return localStorage.getItem('modalToOpen')
}