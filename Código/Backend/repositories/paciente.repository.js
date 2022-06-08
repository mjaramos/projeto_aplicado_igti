import Paciente from '../models/paciente.model.js';

async function insertPaciente(paciente) {
  try {
    return await Paciente.create(paciente);
  } catch (error) {
    throw error;
  }
}

async function updatePaciente(paciente) {
  try {
    await Paciente.update(
      {
        nome: paciente.nome,
        email: paciente.email,
        telefone: paciente.telefone,
      },
      {
        where: {
          pacienteId: paciente.pacienteId,
        },
      }
    );
    return await getPaciente(paciente.pacienteId);
  } catch (error) {}
}

async function deletePaciente(id) {
  try {
    await Paciente.destroy({
      where: {
        pacienteId: id,
      },
    });
  } catch (error) {}
}

async function getPacientes() {
  try {
    return await Paciente.findAll();
  } catch (error) {
    throw error;
  }
}

async function getPaciente(id) {
  try {
    return await Paciente.findByPk(id);
  } catch (error) {}
}

export default {
  insertPaciente,
  getPacientes,
  getPaciente,
  updatePaciente,
  deletePaciente,
};
