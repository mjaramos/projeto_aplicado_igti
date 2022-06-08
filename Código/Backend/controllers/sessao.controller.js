import SessaoService from '../services/sessao.service.js';

async function createSessao(req, res, next) {
  try {
    let sessao = req.body;
    if (!sessao.nome || !sessao.valor || !sessao.pacienteId) {
      throw new Error('Nome, valor e pacienteId são obrigatórios.');
    }
    sessao = await SessaoService.createSessao(sessao);
    res.send(sessao);
    logger.info(`POST /sessao - ${JSON.stringify(sessao)}`);
  } catch (error) {
    next(error);
  }
}

async function updateSessao(req, res, next) {
  try {
    let sessao = req.body;
    if (!sessao.sessaoId || !sessao.valor) {
      throw new Error('Sessao_Id e valor são obrigatórios.');
    }
    if (sessao.nome || sessao.pacienteId) {
      throw new Error(
        'Os campos nome e pacienteId não são permitidos para a atualização.'
      );
    }
    sessao = await SessaoService.updateSessao(sessao);
    res.send(sessao);
    logger.info(`PUT /sessao - ${JSON.stringify(sessao)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteSessao(req, res, next) {
  try {
    let id = req.params.id;
    await SessaoService.deleteSessao(id);
    res.end();
    logger.info(`DELETE /sessao/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getSessao(req, res, next) {
  try {
    let id = req.params.id;
    res.send(await SessaoService.getSessao(id));
    logger.info(`GET /sessao/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getSessoes(req, res, next) {
  try {
    res.send(await SessaoService.getSessoes(req.query.autorId));
    logger.info('GET /sessao');
  } catch (error) {
    next(error);
  }
}

export default {
  createSessao,
  getSessoes,
  getSessao,
  deleteSessao,
  updateSessao
};
