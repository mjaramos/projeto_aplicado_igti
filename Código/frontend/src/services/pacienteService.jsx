import { create, deletar, edit, read } from './httpService';

export async function apiCreatePaciente(paciente) {
  const postPaciente = await create('/paciente', paciente);
  return postPaciente;
}

export async function apiEditPaciente(paciente) {
  const putPaciente = await edit('/paciente', paciente);
  return putPaciente;
}

export async function apiGetPacientes() {
  const getPacientes = await read('/paciente');
  return getPacientes;
}

export async function apiDeletePaciente(idPaciente) {
  const getPacientes = await deletar('/paciente/'+idPaciente);
  return getPacientes;
}