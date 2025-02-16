"use client"
import FormAluno from "@/components/FormAlunoCadastro";
import { useAuth } from "@/utils/useAuth";

export default function Cadastro() {
  useAuth();
  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-700 overflow-auto">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        {/* <h1 className="text-2xl font-bold mb-6 text-center">Ficha de Cadastro</h1> */}
        <FormAluno />
      </div>
    </div>
  )
}