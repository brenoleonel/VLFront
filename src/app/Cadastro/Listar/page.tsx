"use client";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/useAuth";

interface Aluno {
  id: string;
  nome: string;
}

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const router = useRouter();

  useEffect(() => {
    useAuth();
    const fetchAlunos = async () => {
      try {
        const response = await api.get<{ Alunos: Aluno[] }>("/alunos/allalunos");
        if (response.data.Alunos) {
          setAlunos(response.data.Alunos);
        }
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await api.delete(`/alunos/${id}`);
        setAlunos(alunos.filter((aluno) => aluno.id !== id));
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Lista de Alunos</h2>

        {alunos.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Nenhum aluno cadastrado.</p>
            <button
              onClick={() => router.push("Cadastro/Cadastrar")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Cadastrar Novo Aluno
            </button>
          </div>
        ) : (
          <ul className="space-y-2">
            {alunos.map((aluno) => (
              <li
                key={aluno.id}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
              >
                <span className="text-gray-800">{aluno.nome}</span>
                <div className="flex space-x-3">
                  <button onClick={() => handleEdit(aluno)}>
                    <Image src="/edit.png" alt="Editar" width={20} height={20} />
                  </button>
                  <button onClick={() => handleDelete(aluno.id)}>
                    <Image src="/delete.png" alt="Deletar" width={20} height={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Modal de Edição */}
        {isModalOpen && alunoSelecionado && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">Editar Aluno</h3>
              <p className="text-gray-700 mb-2">Nome: {alunoSelecionado.nome}</p>
              <button
                onClick={() => {
                  router.push(`/editar?id=${alunoSelecionado.id}`);
                  setIsModalOpen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
