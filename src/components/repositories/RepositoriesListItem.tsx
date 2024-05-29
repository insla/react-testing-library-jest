import { Link } from 'react-router-dom'
import FileIcon from '../tree/FileIcon'
import RepositoriesSummary from './RepositoriesSummary'
import { IRepository } from './types'
import { MarkGithubIcon } from '@primer/octicons-react'

function RepositoriesListItem({ repository }: { repository: IRepository }) {
  const { full_name, language, description, owner, name } = repository

  return (
    <div className="flex border-b py-3" data-testid="repository-container">
      <FileIcon name={language ?? ''} className="w-6 shrink pt-1" />
      <div>
        {owner && (
          <Link to={`/repositories/${full_name}`} className="text-xl">
            {owner.login}/<span className="font-bold">{name}</span>
          </Link>
        )}
        <p className="py-1 italic text-gray-500">{description}</p>
        <RepositoriesSummary repository={repository} />
      </div>
      <div className="flex grow items-center justify-end pr-2">
        <a href={repository.html_url} aria-label="github repository">
          <MarkGithubIcon />
        </a>
      </div>
    </div>
  )
}

export default RepositoriesListItem
