import { useController } from "react-hook-form";
import { handleErrors } from "./handleErrors";

type SelectType = {
  id: `${string}`
  label?: string
  value?: string | number | null
  disabled?: boolean
  onChange?: any
  onBlur?: any
  control: any
  rules?: any
  required?: any
  errors?: any
  placeholder?: string
  onKeyDown?: any
  options?: any
}

export function Select(props: SelectType) {

  const { id, value, label, control, rules, errors, options } = props
  const { field } = useController({ name: id, defaultValue: value, control, rules })

  return (
    <div className="pt-1 text-center">
      <label htmlFor={id} className="pr-2">{label}</label>
      <select className="border rounded-sm p-1" {...field}>
        <option key={0}>Escolha uma opção</option>
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {handleErrors({ name: id, errors })}
    </div>
  );
}