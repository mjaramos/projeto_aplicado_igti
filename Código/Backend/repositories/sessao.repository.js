import Paciente from '../models/paciente.model.js';
import Sessao from '../models/sessao.model.js';

async function insertSessao(sessao) {
  try {
    return await Sessao.create(sessao);
  } catch (error) {
    throw error;
  }
}

async function updateSessao(sessao) {
  try {
    await Sessao.update(
      {
        valor: sessao.valor,
        observacao: sessao.observacao
      },
      {
        where: {
          sessaoId: sessao.sessaoId,
        },
      }
    );
    return await getSessao(sessao.sessaoId);
  } catch (error) {
    throw error;
  }
}

async function deleteSessao(id) {
  try {
    return await Sessao.destroy({
      where: {
        sessaoId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getSessao(id) {
  try {
    return await Sessao.findByPk(id, { raw: true });
  } catch (error) {
    throw error;
  }
}

async function getSessoes() {
  try {
    return await Sessao.findAll({
      include: [
        {
          model: Paciente
        }
      ]
    });
  } catch (error) {
    throw error;
  }
}

async function getSessoesByPaciente(pacienteId) {
  try {
    return await Sessao.findAll({
      include: [
        {
          model: Paciente,
          where: {
            pacienteId,
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

export default {
  insertSessao,
  updateSessao,
  deleteSessao,
  getSessao,
  getSessoes,
  getSessoesByPaciente,
};
