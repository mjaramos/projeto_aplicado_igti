export default function HomePage() {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <h3 className="text-center mb-6">Bem vindo ao Sistema de Gerenciamento de Psicólogo</h3>
      <ul className="text-center mb-6">
        <li>
          Acesse Pacientes para cadastrar seus pacientes.
        </li>
        <li>
          Acesse Sessões para cadastrar suas sessões.
        </li>
      </ul>
    </div>
  )
}
