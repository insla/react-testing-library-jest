import useExplanation from '../../hooks/useExplanation'
import { ISelection } from './EditorPanel'

interface IExplanationPopup {
  selection: ISelection
  onClose: (selection: ISelection) => void
}

function ExplanationPopup({ selection, onClose }: IExplanationPopup) {
  const { explanation, isLoading, error } = useExplanation(selection)

  let content
  if (isLoading) {
    content = 'Loading...'
  } else if (error) {
    content = error.message
  } else if (explanation) {
    content = explanation
  }

  const handleClose = () => {
    onClose(selection)
  }

  return (
    <div className="relative z-50 w-96 overflow-scroll border bg-gray-700 p-2 pr-3 drop-shadow-lg">
      <pre className="whitespace-pre-wrap text-xs">{content}</pre>
      <button onClick={handleClose} className="border px-2 py-0.5 text-xs">
        Close
      </button>
    </div>
  )
}

export default ExplanationPopup
