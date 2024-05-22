import useSWRMutation from 'swr/mutation'
import axios, { AxiosError } from 'axios'

interface ISignUp {
  arg: {
    email: string
    password: string
    passwordConfirmation: string
  }
}

async function signUp(url: string, { arg }: ISignUp) {
  try {
    const { data } = await axios.post('/api/auth/signup', arg)
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

function useSignUp() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/user',
    signUp,
  )

  return {
    isSignedIn: data,
    error,
    signUp: trigger,
    isLoading: isMutating,
  }
}

export default useSignUp
