import { useController } from "react-hook-form";
import { handleErrors } from "./handleErrors";

type CheckboxType = {
  id: `${string}`
  label?: string
  checked?: boolean
  multiple?: false
  disabled?: false
  onChange?: any
  help?: ''
  sucesso?: ''
  erro?: ''
  control: any
  value?: null
  rules?: any
  type?: any
  errors?: any
}

export default function Checkbox(props: CheckboxType) {

  const { id, value, label, control, rules, type, errors, onChange, multiple, checked } = props
  const { field } = useController({ name: id, defaultValue: value, control, rules })

  return (
    <div className="pt-1 text-center">
      <label htmlFor={id} className="pr-2">{label}</label>
      <input type="checkbox" checked={checked} className="border rounded-sm p-1" {...field} />
      {handleErrors({ name: id, errors })}
    </div>
  )

}