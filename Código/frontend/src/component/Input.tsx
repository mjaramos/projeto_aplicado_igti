import { useController } from "react-hook-form";
import { handleErrors } from "./handleErrors";

type InputType = {
  id: `${string}`
  label?: string
  mode?: 'text' | 'number'
  value?: string | number | null
  disabled?: boolean
  decimalScale?: number
  decimalSeparator?: string
  maxLength?: number
  type?: string
  mask?: string
  onChange?: any
  onBlur?: any
  control: any
  rules?: any
  required?: any
  errors?: any
  placeholder?: string
  onKeyDown?: any
}

export default function Input(props: InputType) {

  const { id, value, label, control, rules, type, errors } = props
  const { field } = useController({ name: id, defaultValue: value, control, rules })

  //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  return (
    <div className="pt-1 text-center">
      <label htmlFor={id} className="pr-2">{label}</label>
      <input type={type} className="border rounded-sm p-1" {...field} />
      {handleErrors({ name: id, errors })}
    </div>
  )
}
