import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Label from './Label'

interface IInput {
  className?: string
  label?: string
  name?: string
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  error?: { [key: string]: string[] }
  placeholder?: string
}

function Input({
  className,
  label,
  error,
  onChange,
  name,
  value,
  type,
  placeholder,
}: IInput) {
  const [showError, setShowError] = useState(true)

  useEffect(() => {
    setShowError(true)
  }, [error])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false)
    onChange(event)
  }

  let errorMessage = null
  if (showError && error && name && error[name]) {
    errorMessage = (
      <div className="mt-0.5 text-sm text-red-500">
        {error[name].join(', ')}
      </div>
    )
  }

  const classes = classNames(
    'mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm',
    errorMessage && 'border-red-500',
    className,
  )

  return (
    <div>
      <Label htmlFor={name}>{label ? label : ''}</Label>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        id={name}
        className={classes}
        onChange={handleChange}
      />
      {errorMessage}
    </div>
  )
}

export default Input
