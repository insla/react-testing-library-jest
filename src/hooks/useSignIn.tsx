import useSWRMutation from 'swr/mutation'
import axios, { AxiosError } from 'axios'

interface ISignIn {
  arg: { email: string; password: string }
}

async function signIn(url: string, { arg }: ISignIn) {
  try {
    const { data } = await axios.post('/api/auth/signin', arg)
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

function useSignIn() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/user',
    signIn,
  )

  return {
    isSignedIn: data,
    error,
    signIn: trigger,
    isLoading: isMutating,
  }
}

export default useSignIn
