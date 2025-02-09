"use client";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Image from "next/image";


interface Aluno {
  id: string
  nome: string
}

export default function ListarAluno () {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get<{ Alunos: Aluno[] }>("/alunos/allalunos");
        setAlunos(response.data.Alunos);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  const handleEdit = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await api.delete(`/alunos/${id}`);
        setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
        alert("Aluno excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-slate-950 text-center mb-4">
          Lista de Alunos
        </h2>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <ul className="space-y-2">
            {alunos.map((aluno) => (
              <li key={aluno.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span>{aluno.nome}</span>
                <div className="flex gap-4">
                  <button onClick={() => handleEdit(aluno)}>
                    <Image src="/edit.png" alt="Editar" width={24} height={24} />
                  </button>
                  <button onClick={() => handleDelete(aluno.id)}>
                    <Image src="/delete.png" alt="Apagar" width={24} height={24} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {showModal && alunoSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Editar Aluno</h2>
              <p className="mb-4">Editar informações de {alunoSelecionado.nome}</p>
              <button className="bg-red-500 text-white p-2 rounded" onClick={() => setShowModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}