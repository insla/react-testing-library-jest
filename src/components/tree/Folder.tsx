import { useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { ChevronRightIcon, ChevronDownIcon } from '@primer/octicons-react'
import TreeEntry from './TreeEntry'
import useEntry from '../../hooks/useEntry'
import { ITree } from './types'

function Folder({ repoName, owner, file }: ITree) {
  const { '*': path } = useParams()
  const [expanded, setExpanded] = useState(() => {
    return (path || '').startsWith(file.path || '')
  })

  const { entry, error } = useEntry({
    repoName,
    owner,
    path: file.path ? file.path : '',
  })
  if (error) {
    console.error(error)
  }

  let name
  if (file.name) {
    name = (
      <div
        className="select-none whitespace-nowrap"
        onClick={e => {
          e.stopPropagation()
          setExpanded(!expanded)
        }}
      >
        {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        {file.name}
      </div>
    )
  }

  const childEntries = entry?.entries || []
  const children =
    expanded &&
    childEntries.map(entry => (
      <TreeEntry
        key={entry.name}
        owner={owner}
        repoName={repoName}
        file={entry}
      />
    ))

  return (
    <div>
      <div className="hover:font-bold">{name}</div>
      {expanded && (
        <div
          className={classNames(
            { 'border-l': expanded },
            'ml-1.5 border-gray-400',
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Folder
