import { useController } from "react-hook-form";

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
  errors?: any
  placeholder?: string
  onKeyDown?: any
}

export default function Input(props: InputType) {

  const { id, value, onChange, control, rules, errors, ...rest } = props
  const { field } = useController({ name: id, defaultValue: value, control, rules })

  return (
    <div>
      <input {...field} />
    </div>
  )
}
