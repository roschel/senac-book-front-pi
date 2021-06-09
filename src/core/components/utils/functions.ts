//§ recuperar localizacao de um elemento e o seu tamanho
export function getLocationElement(e: HTMLElement | null) {
  const width = e?.offsetWidth
  const height = e?.offsetHeight
  const top = e?.offsetTop
  const left = e?.offsetLeft

  return [top, left, height, width];
}