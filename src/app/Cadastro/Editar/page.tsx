"use client";
import FormAlunoAtualizar from "@/components/FormAlunoAtualizar";
import { useSearchParams } from "next/navigation";

export default function Editar() {
  const searchParams = useSearchParams();
  const alunoId = searchParams.get("id"); // Captura o ID da URL

  if (!alunoId) {
    return <p className="text-center text-red-500">Erro: ID do aluno não encontrado.</p>;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <FormAlunoAtualizar alunoId={alunoId} />
      </div>
    </div>
  );
}
