import { Box } from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./component/Input";
import Mensagem from "./component/Mensagem";
import { Select } from "./component/Select";
import { PacienteState } from "./PacienteSlice";
import { InitialRelatorioState, RelatorioState } from "./RelatorioSlice";
import PacienteReports from "./reports/PacienteReports";
import SessaoReports from "./reports/SessaoReports";
import { apiGetPacientes, apiGetPacientesLikeNome } from "./services/pacienteService";
import { apiGetSessoes } from "./services/sessaoService";

export default function Relatorio() {

  const { formState: { errors }, control, handleSubmit, setValue } = useForm<RelatorioState>({ defaultValues: InitialRelatorioState });

  const [report, setReport] = useState(0);
  const [pacientes, setPacientes] = useState<PacienteState[] | []>([]);
  const [mensagem, setMensagem] = useState<string[] | []>([]);

  const simNao = [{ label: "Sim", value: "S" }, { label: "Não", value: "N" }]

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

    getPacientes();

  }, [])

  const reportPaciente = async (relatorio: RelatorioState) => {
    let pacientes = null;
    if (relatorio.nome !== null) {
      pacientes = await apiGetPacientesLikeNome(relatorio.nome);
    } else {
      pacientes = await apiGetPacientes();
    }
    PacienteReports(pacientes);
  }

  const reportSessao = async (relatorio: RelatorioState) => {
    const sessoes = await apiGetSessoes();

    let ses = sessoes;
    let verificaData = false;

    if (relatorio.dataInicial !== null) {
      if (relatorio.dataFinal === null) {
        setMensagem([`Precisa informar o data final!`])
      }
      verificaData = true;
    }
    if (relatorio.dataFinal !== null) {
      if (relatorio.dataInicial === null) {
        setMensagem([`Precisa informar o data inicial!`])
      }
      verificaData = true;
    }

    console.log("Paciente: ", relatorio.pacienteId)
    if (relatorio.pacienteId !== '') {
      ses = ses.filter((sessao) => {
        return sessao.pacienteId.toString() === relatorio.pacienteId
      })
    }
    if (verificaData) {
      ses = ses.filter((sessao) => {
        let data = moment(sessao.data, 'YYYY-MM-DD');
        let dataInicio = moment(relatorio.dataInicial, 'YYYY-MM-DD');
        let dataFim = moment(relatorio.dataFinal, 'YYYY-MM-DD');
        return data.isAfter(dataInicio) && data.isBefore(dataFim)
      })
    }

    if (relatorio.pago === 'Sim') {
      ses = ses.filter((sessao) => {
        return sessao.inPago === true
      })
    } else if (relatorio.pago === 'Não') {
      ses = ses.filter((sessao) => {
        return sessao.inPago === false
      })
    }

    SessaoReports(ses);
  }

  return (
    <>
      <Box className="text-center pt-2">
        <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={() => setReport(1)} value="Pacientes" />
        <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={() => setReport(2)} value="Sessões" />
      </Box>
      {report === 1 &&
        <>
          <Box alignItems="start" className="text-center pb-5">
            <Input
              id="nome"
              label="Nome"
              type="text"
              mode="text"
              control={control}
              errors={errors}
            />
          </Box>
          <Box className="text-center">
            <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={handleSubmit(reportPaciente)} value="Relatório" />
          </Box>
        </>
      }
      {report === 2 &&
        <>
          {mensagem.length > 0 &&
            mensagem.map((msg, index) => {
              return (<Mensagem key={index} mensagem={msg} />)
            })
          }
          <Box alignItems="start" className="text-center pb-5">
            <Select
              id="pacienteId"
              label="Paciente"
              options={pacientes}
              control={control}
              errors={errors}
            />
            <Input
              id="dataInicial"
              label="Data Inicial"
              type="date"
              mode="number"
              control={control}
              errors={errors}
            />
            <Input
              id="dataFinal"
              label="Data Final"
              type="date"
              mode="number"
              control={control}
              errors={errors}
            />
            <Select
              id="pago"
              label="Pago"
              options={simNao}
              control={control}
              errors={errors}
            />
          </Box>
          <Box className="text-center">
            <input type="button" className="text-white bg-blue-700 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 disabled:bg-slate-300" onClick={handleSubmit(reportSessao)} value="Relatório" />
          </Box>
        </>
      }
    </>
  )
}
