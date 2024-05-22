import { Link } from 'react-router-dom'
import FileIcon from './FileIcon'
import { ITree } from './types'

function File({ file, repoName, owner }: ITree) {
  return (
    <Link
      to={`/repositories/${owner}/${repoName}/${file.path}`}
      className="cursor-default whitespace-nowrap hover:font-bold"
    >
      <FileIcon name={file.name} />
      {file.name}
    </Link>
  )
}

export default File
