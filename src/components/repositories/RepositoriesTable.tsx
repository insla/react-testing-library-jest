import { Link } from 'react-router-dom'
import { IRepository } from './types'

interface IRepositoriesTable {
  label: string
  repositories: IRepository[]
  id?: string
}

function RepositoriesTable({
  label,
  repositories,
  id = '',
}: IRepositoriesTable) {
  const rendered =
    repositories &&
    repositories.map(repo => {
      return (
        <div key={repo.full_name} className="p-0.5">
          <Link
            className="text-blue-500"
            to={`/repositories/${repo.full_name}`}
          >
            {repo.full_name}
          </Link>
        </div>
      )
    })

  return (
    <div className="rounded border p-4">
      <h1 id={id || ''} className="mb-1 border-b text-lg font-bold">
        {label}
      </h1>
      {rendered}
    </div>
  )
}

export default RepositoriesTable
