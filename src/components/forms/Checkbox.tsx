import React from 'react'
import classNames from 'classnames'
import Label from './Label'

interface ICheckbox {
  className?: string
  label: string
  name: string
  checked: boolean
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

function Checkbox({ className, label, name, checked, onChange }: ICheckbox) {
  const classes = classNames(
    'h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm',
    className,
  )

  return (
    <div className="flex gap-4">
      <input
        type="checkbox"
        id={name}
        className={classes}
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={name}>{label}</Label>
    </div>
  )
}

export default Checkbox
