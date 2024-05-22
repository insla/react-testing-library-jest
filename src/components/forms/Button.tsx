import classNames from 'classnames'
import { IssueDraftIcon as Spinner } from '@primer/octicons-react'

interface IButton {
  wide: boolean
  className?: string
  children: string
  loading: boolean
  type: 'button' | 'submit' | 'reset' | undefined
}

function Button({ wide, className, children, loading, type }: IButton) {
  const classes = classNames(
    'rounded-md border bg-blue-600 py-3 text-sm font-medium text-white',
    {
      'opacity-50': loading,
    },
    wide ? 'px-12' : 'px-6',
    loading ? 'border-blue-300' : 'border-blue-600',
    className,
  )

  const spinner = <Spinner className="w-10 animate-spin" />

  return (
    <button className={classes} disabled={loading} type={type}>
      {loading ? spinner : children}
    </button>
  )
}

export default Button
