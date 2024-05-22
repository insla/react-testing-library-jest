const languages: Record<string, string[]> = {
  javascript: ['js', 'jsx'],
  typescript: ['ts', 'tsx'],
  json: ['json'],
  markdown: ['md', 'markdown'],
  html: ['html'],
  go: ['go'],
  rust: ['rs'],
  shell: ['sh'],
  ruby: ['rb'],
}

export default function getLangFromFile(path: string) {
  let lang = 'javascript'
  for (const language in languages) {
    for (const ext of languages[language]) {
      if (path.endsWith(ext)) {
        lang = language
      }
    }
  }
  return lang
}
