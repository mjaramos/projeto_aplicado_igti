export interface PacienteState {
  pacienteId: number | null;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
}

export const InitialPacienteState : PacienteState = {
  pacienteId: null,
  nome: null,
  email: null,
  telefone: null,
  endereco: null,
}