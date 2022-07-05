import { create, deletar, edit, read } from './httpService';

export async function apiCreateSessao(Sessao) {
  const postSessao = await create('/Sessao', Sessao);
  return postSessao;
}

export async function apiEditSessao(Sessao) {
  const putSessao = await edit('/Sessao', Sessao);
  return putSessao;
}

export async function apiGetSessoes() {
  const getSessaos = await read('/Sessao');
  return getSessaos;
}

export async function apiDeleteSessao(idSessao) {
  const getSessaos = await deletar('/Sessao/'+idSessao);
  return getSessaos;
}