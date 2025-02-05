"use client";
import { api } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AlunoData {
  curso: string;
  nome: string;
  cpf: string;
  email: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  celular1: string;
  celular2: string;
  celular3: string;
}

export default function FormAlunoAtualizar() {
  const [formData, setFormData] = useState<AlunoData>({
    curso: "",
    nome: "",
    cpf: "",
    email: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    celular1: "",
    celular2: "",
    celular3: "",
  });

  const searchParams = useSearchParams();
  const alunoId = searchParams.get("id");

  useEffect(() => {
    const fetchAluno = async () => {
      if (alunoId) {
        try {
          const response = await api.get<AlunoData>(`/alunos/${alunoId}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do aluno:", error);
        }
      }
    };
    fetchAluno();
  }, [alunoId]);

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .slice(0, 15);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "cpf" ? formatCPF(value) : id.startsWith("celular") ? formatPhone(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (alunoId) {
      try {
        await api.put(`/alunos/${alunoId}`, formData);
        alert("Cadastro atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar cadastro:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-950 text-center mb-4">Atualizar Aluno</h2>

      <div>
        <label htmlFor="curso" className="block text-gray-700">Curso</label>
        <input type="text" id="curso" value={formData.curso} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
      </div>

      <div>
        <label htmlFor="nome" className="block text-gray-700">Nome</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
      </div>

      <div>
        <label htmlFor="cpf" className="block text-gray-700">CPF</label>
        <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
      </div>

      <div>
        <label htmlFor="endereco" className="block text-gray-700">Endereço</label>
        <input type="text" id="endereco" value={formData.endereco} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="numero" className="block text-gray-700">Número</label>
          <input type="text" id="numero" value={formData.numero} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
        </div>
        <div>
          <label htmlFor="bairro" className="block text-gray-700">Bairro</label>
          <input type="text" id="bairro" value={formData.bairro} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cidade" className="block text-gray-700">Cidade</label>
          <input type="text" id="cidade" value={formData.cidade} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
        </div>
        <div>
          <label htmlFor="estado" className="block text-gray-700">Estado</label>
          <input type="text" id="estado" value={formData.estado} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Telefones</label>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" id="celular1" placeholder="Celular 1" value={formData.celular1} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
          <input type="text" id="celular2" placeholder="Celular 2" value={formData.celular2} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
          <input type="text" id="celular3" placeholder="Celular 3" value={formData.celular3} onChange={handleChange} className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg" />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
        Atualizar Cadastro
      </button>
    </form>
  );
}
