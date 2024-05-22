import { useParams } from 'react-router-dom'
import TreeEntry from './TreeEntry'
import useEntry from '../../hooks/useEntry'

function TreePanel() {
  const { owner, repoName } = useParams()
  const { entry, isLoading, error } = useEntry({
    owner: owner || '',
    repoName: repoName || '',
    path: '',
  })

  if (isLoading) {
    return null
  } else if (error) {
    return <div>{error.message}</div>
  }

  if (!entry) {
    return null
  }

  return (
    <div className="tree-panel overflow-hidden bg-gray-800 drop-shadow-md">
      <div className="border-b border-gray-700 p-2">
        <h1 className="text-xl font-bold text-gray-50">{repoName}</h1>
      </div>
      <div className="h-full overflow-scroll">
        <TreeEntry file={entry} owner={owner || ''} repoName={repoName || ''} />
      </div>
    </div>
  )
}

export default TreePanel
