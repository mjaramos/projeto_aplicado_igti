import PacienteRepository from '../repositories/paciente.repository.js';
import SessaoRepository from '../repositories/sessao.repository.js';

async function createPaciente(paciente) {
  return await PacienteRepository.insertPaciente(paciente);
}

async function updatePaciente(paciente) {
  return await PacienteRepository.updatePaciente(paciente);
}

async function deletePaciente(id) {
  const sessoes = await SessaoRepository.getSessoesByPaciente(id);
  if (!sessoes) {
    throw new Error(
      'Não pode excluir paciente pois o mesmo já tem sessao associado.'
    );
  }
  await PacienteRepository.deletePaciente(id);
}

async function getPacientees() {
  return await PacienteRepository.getPacientees();
}

async function getPaciente(id) {
  return await PacienteRepository.getPaciente(id);
}

export default {
  createPaciente,
  getPacientees,
  getPaciente,
  deletePaciente,
  updatePaciente,
};
