export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p className="text-lg mt-2">Oops! Parece que essa página não existe.</p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Voltar para a Página Inicial
      </a>
    </div>
  );
}
