import { useForm } from 'react-hook-form';
import { InitialPacienteState, PacienteState } from './PacienteSlice';
import Input from './component/Input';
import { apiCreatePaciente, apiDeletePacientes, apiEditPaciente, apiGetPacientes } from './services/pacienteService';
import React, { useEffect, useState } from 'react';
import { CustomTable } from './component/CustomTable';
import Mensagem from './component/Mensagem';
import { Box } from '@material-ui/core';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function Paciente() {

  const [pacientes, setPacientes] = useState<PacienteState[] | []>([]);
  const [created, setCreated] = useState(true);
  const [mensagem, setMensagem] = useState<string[] | []>([]);

  const { formState: { errors }, control, handleSubmit, setValue } = useForm<PacienteState>({ defaultValues: InitialPacienteState });

  const limparCampos = () => {
    setValue('nome', '');
    setValue('email', '');
    setValue('telefone', '');
    setValue('endereco', '');
  }

  const submeter = async (paciente: PacienteState) => {
    const response = await apiCreatePaciente(paciente);

    setPacientes(currentPacientes => [
      ...currentPacientes,
      response
    ])

    limparCampos();

    setMensagem(["Sucesso ao cadastrar!"])
  }

  const editar = async (paciente: PacienteState) => {
    const response = await apiEditPaciente(paciente);

    const newPacientes = [...pacientes];
    const index = pacientes.findIndex((p) => p.pacienteId === paciente.pacienteId);
    newPacientes[index] = response;

    setPacientes(newPacientes);

    // setPacientes(
    //   pacientes.map((pac) => {
    //     if (pac.pacienteId === response.pacienteId) {
    //       return { ...pac, response }
    //     }
    //     return { ...pac }
    //   })
    // )

    limparCampos();

    setCreated(true);
    setMensagem([`Sucesso ao atulizar o paciente!`])

  }

  const atualizar = async (paciente: PacienteState) => {
    setCreated(false);
    setValue('pacienteId', paciente.pacienteId);
    setValue('nome', paciente.nome);
    setValue('email', paciente.email);
    setValue('telefone', paciente.telefone);
    setValue('endereco', paciente.endereco);
  }

  function eliminarId(arr1, b) {
    return arr1.filter(function (ele_val) {
      return ele_val.pacienteId !== b
    })
  }

  const deletar = async (pacienteId: number) => {

    try {
      await apiDeletePacientes(pacienteId);
      setPacientes(eliminarId(pacientes, pacienteId))
    } catch (error: any) {
      setMensagem([error]);
    }

  }

  useEffect(() => {

    async function getPacientes() {
      const bkPacientes = await apiGetPacientes();
      setPacientes(bkPacientes);
    }

    getPacientes();

  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'nome',
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Telefone',
        accessor: 'telefone',
      },
      {
        Header: 'Endereço',
        accessor: 'endereco',
      },
      {
        Header: 'Ações',
        accessor: 'acoes',
      },
    ],
    []
  )



  return (
    <>
      {mensagem.length > 0 &&
        mensagem.map((msg, index) => {
          return (<Mensagem key={index} mensagem={msg} />)
        })
      }
      <Box alignItems="start" className="text-center pb-5">

        <Input id="pacienteId" type="hidden" control={control} />
        <Input
          id="nome"
          label="Nome"
          type="text"
          control={control}
          errors={errors}
          rules={{
            required: 'Nome é campo obrigatorio.',
          }} />
        <Input
          id="email"
          label="E-mail"
          type="text"
          control={control}
          errors={errors}
          rules={{
            required: 'E-mail é campo obrigatorio.',
          }} />
        <Input
          id="telefone"
          label="Telefone"
          type="text"
          control={control}
          errors={errors}
          rules={{
            required: 'Telefone é campo obrigatorio.',
          }} />
        <Input
          id="endereco"
          label="Endereço"
          type="text"
          control={control}
          errors={errors}
          rules={{
            required: 'Endereço é campo obrigatorio.',
          }} />
      </Box>
      <Box className="text-center">
        <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={handleSubmit(submeter)} value="Cadastrar" disabled={!created} />
        <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={handleSubmit(editar)} value="Atualizar" disabled={created} />
      </Box>

      {pacientes.length > 0 &&
        <CustomTable
          columns={columns}
          data={pacientes.map((paciente) => ({
            ...paciente,
            acoes: (
              <div>
                <button
                  type="button"
                  onClick={() => deletar(paciente.pacienteId)}
                >
                  <i className="text-center" aria-hidden="true" title="Deletar">
                    <AiFillDelete />
                  </i>
                </button>
                <button
                  type="button"
                  onClick={() => atualizar(paciente)}
                >
                  <i className="text-center" aria-hidden="true" title="Atualizar">
                    <AiFillEdit />
                  </i>
                </button>

              </div>
            )
          }))}
        />
      }
    </>
  )
}
