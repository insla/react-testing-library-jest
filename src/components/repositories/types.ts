export interface IRepository {
  id: number
  full_name: string
  language: string
  description: string
  owner: IOwner
  name: string
  stargazers_count: string
  open_issues: string
  forks: string
  html_url: string
}

interface IOwner {
  login: string
  id?: number
  url?: string
}
