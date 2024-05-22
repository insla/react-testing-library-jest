import { useState, useEffect, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import ExplanationPanel from './ExplanationPopup'
import * as monaco from 'monaco-editor'
import { ISelection } from './EditorPanel'

interface IExplanationWidget extends ISelection {
  domNode: HTMLDivElement | null
  getId: () => string
  getDomNode: () => HTMLDivElement
  getPosition: () => monaco.editor.IContentWidgetPosition
}

interface IExplanationList {
  editorRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
  selections: ISelection[]
  onExplanationClose: (selection: ISelection) => void
}

function ExplanationList({
  editorRef,
  selections,
  onExplanationClose,
}: IExplanationList) {
  const [widgets, setWidgets] = useState<IExplanationWidget[]>([])

  useEffect(() => {
    const updateWidgets = (widgets: IExplanationWidget[]) => {
      widgets
        .filter(w => !selections.find(s => s.line === w.line))
        .forEach(w => {
          if (editorRef.current) editorRef.current.removeContentWidget(w)
        })

      const updatedWidgets = selections.map(explanation => {
        const existingWidget = widgets.find(w => w.line === explanation.line)
        if (existingWidget) {
          return existingWidget
        }
        const widget = buildWidget(explanation, editorRef)
        if (editorRef.current) editorRef.current.addContentWidget(widget)
        return widget
      })

      return updatedWidgets.filter(w => selections.find(s => s.line === w.line))
    }
    setWidgets(updateWidgets)
  }, [selections, editorRef])

  const renderedZones = widgets.map(widget => {
    if (widget.domNode && widget.domNode.nodeType === 1) {
      return createPortal(
        <ExplanationPanel selection={widget} onClose={onExplanationClose} />,
        widget.domNode,
      )
    }
    return null
  })

  return <>{renderedZones}</>
}

function buildWidget(
  selection: ISelection,
  editorRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>,
): IExplanationWidget {
  return {
    ...selection,
    domNode: null,
    getId: function () {
      return `explanation-${selection.line}`
    },
    getDomNode: function () {
      if (!this.domNode) {
        this.domNode = document.createElement('div')
        this.domNode.classList.add('z-50')
      }
      return this.domNode
    },
    getPosition: function () {
      return {
        position: {
          lineNumber: selection.line,
          column: 0,
        },
        preference: [2],
      }
    },
  }
}

export default ExplanationList
