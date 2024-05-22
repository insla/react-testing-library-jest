import classNames from 'classnames'

interface ILabel {
  children: JSX.Element | string
  className?: string
  htmlFor: string | undefined
}

function Label({ children, className, htmlFor }: ILabel) {
  const classes = classNames(
    'block text-sm font-medium text-gray-700',
    className,
  )

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  )
}

export default Label
