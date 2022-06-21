export interface SessaoState {
  sessaoId: number | null;
  pacienteId: string | null;
  data: string | null;
  observacao: string | null;
  valor: number | null;
}

export const InitialSessaoState : SessaoState = {
  sessaoId: null,
  pacienteId: null,
  data: null,
  observacao: null,
  valor: null,
}