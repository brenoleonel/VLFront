"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Image from "next/image";
import FormAlunoAtualizar from "./FormAlunoAtualizar";

interface Aluno {
  id: string;
  Nome: string;
}

export default function ListaAlunos() {
  const [userAdmId, setUserAdmId] = useState("");
  const [Alunos, setAluno] = useState<Aluno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const router = useRouter();

  useEffect(() => {
    buscarAlunos();
  }, []);

  const buscarAlunos = async () => {
    try {
      const response = await api.get<{ message: string; Alunos: Aluno[] }>("/alunos/allalunos");
  
      console.log("Resposta da API:", response);
  
      if (response.data.Alunos && Array.isArray(response.data.Alunos)) {
        setAluno(response.data.Alunos);
      } else {
        console.error("Resposta inesperada da API:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await api.delete(`/alunos/${id}`);
        setAluno((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
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
    router.push("/Login");
  };

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
            width={30} 
            height={30} 
            className="flex items-end p-1 cursor-pointer hover:opacity-80"
            onClick={handleLogout}
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/Cadastro/Cadastrar")}
            className="flex items-center gap-2 border-1 bg-slate-950 bg-opacity-50 transition"
          >
            <img src="/adicionar.png" alt="Adicionar" width={30} height={30} /> 
          </button>
        </div>

        <ul className="space-y-2 mt-4">
          {Alunos.map((aluno) => (
            <li
              key={aluno.id}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
            >
              <span className="text-gray-800">{aluno.Nome}</span>
              <div className="flex space-x-3">
                <button onClick={() => handleEdit(aluno)}>
                  <img src="/editar.png" alt="Editar" width={20} height={20} />
                </button>
                <button onClick={() => handleDelete(aluno.id)}>
                  <img src="/deletar.png" alt="Deletar" width={20} height={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isModalOpen && alunoSelecionado && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <FormAlunoAtualizar alunoId={alunoSelecionado.id} onClose={() => setIsModalOpen(false)} />
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
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
