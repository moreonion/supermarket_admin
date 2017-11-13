export const t = (item) => {
  if (item.de) {
    return item.de
  } else if (item.en) {
    return item.en
  } else {
    return 'n/a'
  }
}
