"use client";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlunoData from "@/app/Interfaces/AlunoData";


interface FormAlunoAtualizarProps {
  alunoId: string;
  onClose: () => void;
}

export default function FormAlunoAtualizar({ alunoId, onClose  }: FormAlunoAtualizarProps) {
  const [formData, setFormData] = useState<AlunoData>({
    id: "",
    Escola: "",
    Curso: "",
    Nome: "",
    Cpf: "",
    Email: "",
    Endereco: "",
    Numero: "",
    Bairro: "",
    Cidade: "",
    Estado: "",
    Celular1: "",
    Celular2: "",
    Celular3: "",
    userAdmId: "",
    PublicId: "",
    createdAt: ""
  });

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

  const router = useRouter();

  useEffect(() => {
    const fetchAluno = async () => {
      if (alunoId) {
        try {
          const response = await api.get<{ message: string; Aluno: AlunoData }>(`/alunos/${alunoId}`);
          setFormData((prevData) => ({
            ...prevData,
            ...response.data.Aluno,
          }));
        } catch (error) {
          console.error("Erro ao buscar dados do aluno:", error);
        }
      }
    };
    fetchAluno();
  }, [alunoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
  
    if (name === "Cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "Celular1" || name === "Celular2" || name === "Celular3") {
      formattedValue = formatPhone(value);
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue ?? "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (alunoId) {
      try {
        const { id, PublicId, createdAt, ...dataToSend } = formData;
  
        await api.put(`/alunos/${alunoId}`, dataToSend);
        alert("Cadastro atualizado com sucesso!");
        
        onClose();

      } catch (error) {
        console.error("Erro ao atualizar cadastro:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-950 text-center mb-4">Atualizar Aluno</h2>
      
      {Object.keys(formData).map((key) => {
        if (key === "id" || key === "userAdmId") return null;
        return (
          <input
            key={key}
            type="text"
            name={key}
            className="text-slate-900"
            value={formData[key as keyof AlunoData] ?? ""}
            onChange={handleChange}
            placeholder={key}
          />
        );
      })}

      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
        Atualizar Cadastro
      </button>
    </form>
  );
}
