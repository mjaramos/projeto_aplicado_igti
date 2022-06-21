import { Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Input from './component/Input';
import { InitialSessaoState, SessaoState } from './SessaoSlice';

export default function Sessao() {

  const { formState: { errors }, control, handleSubmit, setValue } = useForm<SessaoState>({ defaultValues: InitialSessaoState });

  return (
    <>
      <Box alignItems="start" className="text-center pb-5">
        <Input
          id="pacienteId"
          label="Paciente"
          type="text"
          control={control}
          errors={errors}
          rules={{
            required: 'Nome é campo obrigatorio.',
          }} />
      </Box>
    </>
  )
}
