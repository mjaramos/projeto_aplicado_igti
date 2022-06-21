export function Header({
  title = 'Título do Header',
}) {
  return (
    <header>
      <div className="bg-blend-multiply bg-blue-700 text-white">
        <h1 className="text-center text-xl p-2">{title}</h1>
      </div>
    </header>
  )
}