import { create, deletar, edit, read } from './httpService';
import {PacienteState} from '../PacienteSlice';

export async function apiCreate(paciente: PacienteState) {
  const postPaciente = await create('/paciente', paciente);
  return postPaciente;
}

export async function apiEdit(paciente: PacienteState) {
  const putPaciente = await edit('/paciente', paciente);
  return putPaciente;
}

export async function apiGet() {
  const getPacientes = await read('/paciente');
  return getPacientes;
}

export async function apiDelete(idPaciente: number) {
  const getPacientes = await deletar('/paciente/'+idPaciente);
  return getPacientes;
}