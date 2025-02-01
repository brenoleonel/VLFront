import FormAluno from "@/components/FormAluno";

export default function Cadastro() {
  return(
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        {/* <h1 className="text-2xl font-bold mb-6 text-center">Ficha de Cadastro</h1> */}
        <FormAluno />
      </div>
    </div>
  )
}

