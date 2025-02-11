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
  useAuth();
  const [Alunos, setAlunos] = useState<Aluno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const router = useRouter();

  const buscarAlunos = async () => {
    try {
      const response = await api.get<{ message: string; Alunos?: Aluno[] }>("/alunos/allalunos");
  
      if (response.data.Alunos && Array.isArray(response.data.Alunos)) {
        setAlunos(response.data.Alunos);
      } else {
        console.error("Erro: resposta da API em formato inesperado.", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await api.delete(`/alunos/${id}`);
        setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/Login")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-slate-300 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10"></div>  

          <h2 className="text-2xl font-bold text-gray-800 flex-1 text-center">
            Lista de Alunos
          </h2>

          <Image 
            src="/sair.png"  
            alt="Logout"
            width={40} 
            height={40} 
            className="cursor-pointer hover:opacity-80"
            onClick={handleLogout}
          />
        </div>

        {Alunos.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Nenhum aluno cadastrado.</p>
            <button
              onClick={() => router.push("/Cadastro/Cadastrar")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Cadastrar Novo Aluno
            </button>
          </div>
        ) : (
          <ul className="space-y-2">
            {Alunos.map((aluno) => (
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
