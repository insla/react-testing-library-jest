import React from 'react'
import MonacoEditor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import getLangFromPath from '../../util/getLangFromPath'

interface IEditorProps {
  file: {
    content: string
    path: string
  }
  onExplainRequest: (data: {
    text: string
    line: number
    editor: monaco.editor.IStandaloneCodeEditor
    path: string
  }) => void
}

function Editor({ file, onExplainRequest }: IEditorProps) {
  return (
    <div className="relative pt-1" style={{ backgroundColor: '#1e1e1e' }}>
      <MonacoEditor
        height="calc(100vh - 88px)"
        theme="vs-dark"
        path={file.path}
        defaultValue={file.content}
        defaultLanguage={getLangFromPath(file.path)}
        options={{
          minimap: { enabled: false },
          glyphMargin: true,
          lineNumbersMinChars: 1,
        }}
        onValidate={() => {}}
        onMount={editor => {
          const explainCode = () => {
            const selectedRange = editor.getSelection()
            const model = editor.getModel()
            if (model && selectedRange) {
              const text = model.getValueInRange(selectedRange)

              onExplainRequest({
                path: model.uri.path,
                text,
                editor,
                line: selectedRange.endLineNumber,
              })
            }
          }

          editor.addOverlayWidget({
            getId: () => 'explain-code-widget',
            getDomNode: () => {
              const { height } = editor
                .getContainerDomNode()
                .getBoundingClientRect()
              const domNode = document.createElement('div')
              domNode.style.position = 'absolute'
              domNode.style.top = `${height - 95}px`
              domNode.style.right = '40px'
              domNode.classList.add('z-50')
              const button = document.createElement('button')
              button.classList.add(
                'bg-blue-500',
                'text-white',
                'p-3',
                'rounded',
                'font-bold',
                'text-xl',
              )
              button.innerText = 'Explain Code'
              button.addEventListener('click', explainCode)
              domNode.appendChild(button)
              return domNode
            },
            getPosition: () => null,
          })

          editor.addAction({
            id: 'explain-code',
            label: 'Explain This Code',
            keybindings: [],
            precondition: '',
            keybindingContext: '',
            contextMenuGroupId: 'modification',
            contextMenuOrder: 1,
            run: explainCode,
          })
        }}
      />
    </div>
  )
}

export default Editor
