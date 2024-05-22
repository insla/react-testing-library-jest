export interface ITree {
  repoName: string
  owner: string
  file: {
    name: string
    path?: string
    type?: string
  }
}
