export interface RelatorioState {
  nome: string | null;
  pacienteId: string;
  dataInicial: string | null;
  dataFinal: string | null;
  pago: string | null;
}

export const InitialRelatorioState : RelatorioState = {
  nome: null,
  pacienteId: '',
  dataInicial: null,
  dataFinal: null,
  pago: null,
}