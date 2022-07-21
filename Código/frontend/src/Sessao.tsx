import { Box, colors } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomTable } from './component/CustomTable';
import Input from './component/Input';
import Checkbox from './component/Checkbox';
import Mensagem from './component/Mensagem';
import { Select } from './component/Select';
import TextArea from './component/TextArea';
import { PacienteState } from './PacienteSlice';
import SessaoReports from './reports/SessaoReports';
import { apiGetPacientes } from './services/pacienteService';
import { apiCreateSessao, apiDeleteSessao, apiEditSessao, apiGetSessoes } from './services/sessaoService';
import { InitialSessaoState, SessaoState } from './SessaoSlice';

export default function Sessao() {

  const [pacientes, setPacientes] = useState<PacienteState[] | []>([]);
  const [sessoes, setSessoes] = useState<SessaoState[] | []>([]);
  const [created, setCreated] = useState(true);
  const [mensagem, setMensagem] = useState<string[] | []>([]);

  const { formState: { errors }, control, handleSubmit, setValue, watch } = useForm<SessaoState>({ defaultValues: InitialSessaoState });

  const report = () => {
    SessaoReports(sessoes);
  }

  const limparCampos = () => {
    setValue('pacienteId', '0');
    setValue('data', '');
    setValue('observacao', '');
    setValue('valor', 0);
  }

  const submeter = async (sessao: SessaoState) => {
    const response = await apiCreateSessao(sessao)

    setSessoes(currentSessoes => [
      ...currentSessoes,
      response
    ])

    limparCampos();

    setMensagem(["Sucesso ao cadastrar!"])
  }

  const editar = async (sessao: SessaoState) => {

    let response;
    try {

      response = await apiEditSessao(sessao);
      const newSessoes = [...sessoes];
      let index = sessoes.findIndex((s) => s.sessaoId === sessao.sessaoId);
      newSessoes[index] = response;

      setSessoes(newSessoes);

      limparCampos();

      setCreated(true);
      setMensagem([`Sucesso ao atualizar o paciente!`])

    } catch (error: any) {
      setMensagem([error]);
    }

  }

  function selectPacientes(bkPacientes) {
    let retorno: any = ([] as any).concat(
      bkPacientes.map((pac) => {
        return { id: pac.pacienteId, label: pac.nome }
      })
    )
    return retorno;
  }

  useEffect(() => {

    async function getPacientes() {
      const bkPacientes = await apiGetPacientes();
      setPacientes(selectPacientes(bkPacientes));
    }

    async function getSessoes() {
      const bkSessoes = await apiGetSessoes()
      setSessoes(bkSessoes);
    }

    getPacientes();
    getSessoes();

  }, [])

  const atualizar = async (sessao: SessaoState) => {
    console.log("Sessao.InPago: ", sessao.inPago);
    setCreated(false);
    setValue('sessaoId', sessao.sessaoId);
    setValue('pacienteId', sessao.pacienteId);
    let data = moment(sessao.data).format('yyyy-MM-DDTHH:mm')
    setValue('data', data);
    setValue('observacao', sessao.observacao);
    setValue('valor', sessao.valor);
    setValue('inPago', sessao.inPago);
  }

  const inPago = watch('inPago');

  function eliminarId(arr1, b) {
    return arr1.filter(function (ele_val) {
      return ele_val.sessaoId !== b
    })
  }

  const deletar = async (sessaoId: number) => {

    try {
      await apiDeleteSessao(sessaoId)
      setSessoes(eliminarId(sessoes, sessaoId))
    } catch (error: any) {
      setMensagem([error]);
    }

  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Paciente',
        accessor: 'paciente.nome',
      },
      {
        Header: 'Data',
        accessor: 'data',
      },
      {
        Header: 'Valor',
        accessor: 'valor',
      },
      {
        Header: 'Observação',
        accessor: 'observacao',
      },
      {
        Header: 'Pago',
        accessor: 'pago',
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
        <Input id="sessaoId" type="hidden" control={control} />
        <Select
          id="pacienteId"
          label="Paciente"
          options={pacientes}
          control={control}
          errors={errors}
          rules={{
            required: 'Paciente é campo obrigatorio.',
          }}
        />
        <Input
          id="data"
          label="Data"
          type="datetime-local"
          mode="number"
          control={control}
          errors={errors}
          rules={{
            required: 'Data é campo obrigatorio.',
          }}
        />
        <TextArea
          id="observacao"
          label="Observacao"
          control={control}
          errors={errors}
          rules={{
            required: 'Observacão é campo obrigatorio.',
          }}
        />
        <Input
          id="valor"
          label="Valor"
          type="number"
          mode="number"
          control={control}
          errors={errors}
          rules={{
            required: 'Valor é campo obrigatorio.',
          }}
        />
        <Checkbox
          id="inPago"
          label="Pago ?"
          control={control}
          errors={errors}
          checked={inPago ? true : false}
        />
      </Box>
      <Box className="text-center">
        <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={handleSubmit(submeter)} value="Cadastrar" disabled={!created} />
        <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={handleSubmit(editar)} value="Atualizar" disabled={created} />
      </Box>
      {sessoes.length > 0 &&
        <CustomTable
          columns={columns}
          data={sessoes.map((sessao) => ({
            ...sessao,
            data: moment(sessao.data).format('DD/MM/yyyy HH:mm'),
            pago: sessao.inPago ? <i className="fa-solid fa-circle-dollar-to-slot text-green-500" /> : <i className="fa-solid fa-circle-dollar-to-slot text-red-500" />,
            acoes: (
              <div>
                <button
                  type="button"
                  onClick={() => deletar(sessao.sessaoId)}
                >
                  <i className="fa-solid fa-trash text-center" aria-hidden="true" title="Deletar" />
                </button>
                <button
                  type="button"
                  onClick={() => atualizar(sessao)}
                >
                  <i className="fa-solid fa-pen text-center" aria-hidden="true" title="Atualizar" />
                </button>

              </div>
            )
          }))}
        />
      }
    </>
  )
}
