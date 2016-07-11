const headerTypes = [
  { label: 'H1',           style: 'header-one' },
  { label: 'H2',           style: 'header-two' },
  { label: 'H3',           style: 'header-three' },
  { label: 'H4',           style: 'header-four' },
  { label: 'H5',           style: 'header-five' },
  { label: 'H6',           style: 'header-six' },
]

const listTypes = [
  { label: 'Bullets',      style: 'unordered-list-item' },
  { label: 'Numerals',     style: 'ordered-list-item' },
]

const insetTypes = [
  { label: 'Block Quote',  style: 'blockquote' },
  { label: 'Code Snippet', style: 'code-block' },
]

const inlineStyles = [
  { label: 'Bold',         style: 'BOLD' },
  { label: 'Italic',       style: 'ITALIC' },
  { label: 'Underline',    style: 'UNDERLINE' },
  { label: 'Code',         style: 'CODE' },
]

const styleMap = {
  CODE: {
    backgroundColor: '#111111',
    fontFamily: `'Ubuntu Mono', 'Inconsolata', 'Menlo', 'Consolas', monospace`,
    fontSize: 16,
    color: '#ffe600',
    padding: 2,
  },
}

export {
  headerTypes,
  inlineStyles,
  insetTypes,
  listTypes,
  styleMap,
}
