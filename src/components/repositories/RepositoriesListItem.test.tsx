import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RepositoriesListItem from './RepositoriesListItem'
import { IRepository } from './types'

async function renderComponent(repository?: Partial<IRepository>) {
  const defaultRepository: IRepository = {
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
    open_issues: '1',
    forks: '30',
  }
  const mergedRepository = { ...defaultRepository, ...repository }

  await act(async () => {
    render(
      <MemoryRouter>
        <RepositoriesListItem repository={mergedRepository} />
      </MemoryRouter>,
    )
  })

  return { repository: mergedRepository }
}
test('shows a link to the github homepage for this repository', async () => {
  const { repository } = await renderComponent()

  await screen.findByRole('img', { name: 'Javascript' })

  const link = screen.getByRole('link', {
    name: /github repository/i,
  })

  expect(link).toHaveAttribute('href', repository.html_url)
})

test('shows a fileicon with the appropriate icon', async () => {
  await renderComponent()

  const icon = await screen.findByRole('img', { name: 'Javascript' })

  expect(icon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async () => {
  const { repository } = await renderComponent()

  await screen.findByRole('img', { name: 'Javascript' })

  const link = await screen.findByRole('link', {
    name: repository.owner?.login ? new RegExp(repository.owner.login) : '',
  })
  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})

test('displays the repository description', async () => {
  const { repository } = await renderComponent()

  const description = await screen.findByText(repository.description)
  expect(description).toBeInTheDocument()
})

test('handles missing owner property gracefully', async () => {
  const { repository } = await renderComponent({ owner: undefined })

  const link = screen.queryByRole('link', {
    name: repository.owner?.login ? new RegExp(repository.owner.login) : '',
  })
  expect(link).not.toBeInTheDocument()

  const description = await screen.findByText(repository.description)
  expect(description).toBeInTheDocument()
})

test('container div has the correct classes', async () => {
  await renderComponent()

  const container = screen.getByTestId('repository-container')
  expect(container).toHaveClass('flex border-b py-3')
})
