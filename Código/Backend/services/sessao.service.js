import SessaoRepository from '../repositories/sessao.repository.js';
import PacienteRepository from '../repositories/paciente.repository.js';

async function createSessao(sessao) {
  const paciente = await PacienteRepository.getPaciente(sessao.pacienteId);
  if (!paciente) {
    throw new Error('Paciente não existente na base da dados');
  }
  let novaSessao = await SessaoRepository.insertSessao(sessao);
  return getSessao(novaSessao.sessaoId);
}

async function updateSessao(sessao) {
  return await SessaoRepository.updateSessao(sessao);
}

async function deleteSessao(id) {
  await SessaoRepository.deleteSessao(id);
}

async function getSessoes(pacienteId) {
  if (pacienteId) {
    return await SessaoRepository.getSessoesByPaciente(pacienteId);
  }
  return await SessaoRepository.getSessoes();
}

async function getSessao(id) {
  const sessao = await SessaoRepository.getSessao(id);
  return sessao;
}

export default {
  createSessao,
  getSessoes,
  getSessao,
  deleteSessao,
  updateSessao
};
