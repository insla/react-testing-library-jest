import File from './File'
import Folder from './Folder'
import { ITree } from './types'

function TreeEntry({ owner, repoName, file }: ITree) {
  if (file.type === 'dir') {
    return (
      <div className="my-[3px] ml-1.5 text-sm text-gray-200">
        <Folder file={file} owner={owner} repoName={repoName} />
      </div>
    )
  } else {
    return (
      <div className="my-[3px] ml-1.5 text-sm text-gray-200">
        <File file={file} owner={owner} repoName={repoName} />
      </div>
    )
  }
}

export default TreeEntry
