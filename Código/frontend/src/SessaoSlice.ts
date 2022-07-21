import { PacienteState } from "./PacienteSlice";

export interface SessaoState {
  sessaoId: number | null;
  pacienteId: string | null;
  paciente: PacienteState | null;
  data: string | null;
  observacao: string | null;
  valor: number | null;
  inPago: boolean | null;
}

export const InitialSessaoState : SessaoState = {
  sessaoId: null,
  pacienteId: null,
  paciente: null,
  data: null,
  observacao: null,
  valor: null,
  inPago: null
}