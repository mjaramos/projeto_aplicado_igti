import { create } from './httpService';
import {PacienteState} from '../PacienteSlice';

export async function apiCreatePaciente(paciente: PacienteState) {
  const postPaciente = await create('/paciente', paciente);
  return postPaciente;
}