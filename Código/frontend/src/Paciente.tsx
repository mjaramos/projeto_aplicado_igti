import { useForm } from 'react-hook-form';
import { InitialPacienteState, PacienteState } from './PacienteSlice';
import Input from './component/Input';
import { apiCreatePaciente } from './services/pacienteService';

export default function Paciente() {

  const { control, handleSubmit } = useForm<PacienteState>({ defaultValues: InitialPacienteState });

  const submeter = async (paciente: PacienteState) => {
    console.log('Entrou')
    const response = await apiCreatePaciente(paciente);
    console.log('Response: ', response);
  }

  return (
    <>
      <Input id="nome" control={control} rules={{ required: true }} />
      <Input id="email" control={control} rules={{ required: true }} />
      <Input id="telefone" control={control} rules={{ required: true }} />
      <Input id="endereco" control={control} rules={{ required: true }} />
      <input type="button" onClick={handleSubmit(submeter)} value="Botão" />
    </>
  )
}
