export default function Mensagem({ mensagem }) {

  let msgErro = "";
  if (mensagem.response) {
    const inicio = mensagem.response.data.indexOf("<pre>")
    const fim = mensagem.response.data.indexOf("<br>")
    msgErro = mensagem.response.data.substring(inicio + 5, fim);
  } else {
    msgErro = mensagem
  }

  return (
    <div className="text-center">
      <p>{msgErro}</p>
    </div>
  )
}
