export function scrollToSection(sectionId, offset) {
    const section = document.getElementById(sectionId)
    const sectionTop = section.offsetTop + offset
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    })
}