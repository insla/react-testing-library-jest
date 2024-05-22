import useSWR, { mutate } from 'swr'
import axios, { AxiosError } from 'axios'

async function signOut(path: string) {
  try {
    const { data } = await axios.get(path)
    mutate('/api/user')
    return data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError
      if (axiosError.response) {
        throw axiosError.response.data
      } else {
        throw axiosError
      }
    }
  }
}

function useSignOut() {
  const { data, error, isLoading } = useSWR('/api/auth/signout', signOut, {
    revalidateOnMount: true,
  })

  return {
    isSignedOut: data,
    error,
    isLoading,
  }
}

export default useSignOut
