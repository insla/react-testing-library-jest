import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'

function AuthButtons() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return null
  } else if (user) {
    return (
      <Link
        className="block whitespace-nowrap rounded-md border px-5 py-2.5 text-sm font-medium"
        to="/signout"
      >
        Sign Out
      </Link>
    )
  } else {
    return (
      <>
        <Link
          className="block whitespace-nowrap rounded-md border border-teal-600 px-5 py-2.5 text-sm font-medium text-teal-600"
          to="/signin"
        >
          Sign In
        </Link>
        <Link
          className="block whitespace-nowrap rounded-md border border-teal-600 bg-teal-600 px-5 py-2.5 text-sm font-medium text-white"
          to="/signup"
        >
          Sign Up
        </Link>
      </>
    )
  }
}

export default AuthButtons
