export interface File {
  id: string
  name: string
  type: 'file'
  content: string
}

export interface Directory {
  name: string
  type: 'directory'
  children: (File | Directory)[]
}