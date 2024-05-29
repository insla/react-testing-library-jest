import { screen, render } from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'
import { IRepository } from './types'

test('displays information about the repository', () => {
  const repository: IRepository = {
    id: 1,
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'A js library',
    owner: {
      login: 'facebook',
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react',
    stargazers_count: '5',
    forks: '30',
    open_issues: '10',
  }

  render(<RepositoriesSummary repository={repository} />)

  expect(screen.getByLabelText('stars')).toBeInTheDocument()
  expect(screen.getByText('5')).toBeInTheDocument()
  expect(screen.getByText('10 issues need help')).toBeInTheDocument()
  expect(screen.getByText('30 Forks')).toBeInTheDocument()
})
