import axios from 'axios'
import useSWR from 'swr'
import getLangFromPath from '../util/getLangFromPath'

interface IProps {
  text: string
  path: string
}

async function explanationFetcher([url, { text, path }]: [string, IProps]) {
  const { data } = await axios.post(url, {
    text,
    language: getLangFromPath(path),
  })
  const choice = data && data.choices && data.choices[0] && data.choices[0]

  return choice.text.trim()
}

export default function useExplanation({ text, path }: IProps) {
  const { data, error, isLoading } = useSWR(
    [`/api/explain`, { text, path }],
    explanationFetcher,
  )

  return {
    isLoading,
    error,
    explanation: data,
  }
}
