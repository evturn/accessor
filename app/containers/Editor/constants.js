const blockTypes = [
  { label: 'H1',         style: 'header-one' },
  { label: 'H2',         style: 'header-two' },
  { label: 'H3',         style: 'header-three' },
  { label: 'H4',         style: 'header-four' },
  { label: 'H5',         style: 'header-five' },
  { label: 'H6',         style: 'header-six' },
]

const insetTypes = [
  { label: 'Bullets',    style: 'unordered-list-item' },
  { label: 'Numerals',   style: 'ordered-list-item' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'Code Block', style: 'code-block' },
]

const inlineStyles = [
  { label: 'Code Inline', style: 'CODE' },
  { label: 'Bold',        style: 'BOLD' },
  { label: 'Italic',      style: 'ITALIC' },
  { label: 'Underline',   style: 'UNDERLINE' },
]

export { blockTypes, inlineStyles, insetTypes }
