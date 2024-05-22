import axios from 'axios'
import useSWR from 'swr'

interface IFile {
  type: string
  name: string
  entries?: IFile[]
}

interface IUseEntryProps {
  repoName: string
  owner: string
  path: string
  shouldFetch?: boolean
}

async function filesFetcher(url: string): Promise<IFile> {
  const { data } = await axios.get<IFile>(url)

  if (data.type === 'file') {
    return data
  }

  data.entries!.sort((a, b) => {
    if (a.type === 'file' && b.type === 'dir') {
      return 1
    }
    if (a.type === 'dir' && b.type === 'file') {
      return -1
    }
    return a.name.localeCompare(b.name)
  })

  return data
}

export default function useEntry({
  repoName,
  owner,
  path,
  shouldFetch,
}: IUseEntryProps) {
  const _shouldFetch = shouldFetch ?? true
  const { data, error, isLoading } = useSWR<IFile, Error>(
    _shouldFetch && `/api/repositories/${owner}/${repoName}/contents/${path}`,
    filesFetcher,
  )

  return {
    isLoading,
    error,
    entry: data,
  }
}
