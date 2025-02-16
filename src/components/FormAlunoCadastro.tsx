"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

export default function FormAluno() {
  const [Escola, setEscola] = useState("")
  const [Curso, setCurso] = useState("");
  const [Nome, setNome] = useState("");
  const [Cpf, setCpf] = useState("");
  const [Email, setEmail] = useState("");
  const [Endereco, setEndereco] = useState("");
  const [Numero, setNumero] = useState("");
  const [Bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Estado, setEstado] = useState("");
  const [Celular1, setCelularPrimeiro] = useState("");
  const [Celular2, setCelularSegundo] = useState("");
  const [Celular3, setCelularTerceiro] = useState("");
  const [userAdmId, setUserAdmId] = useState("");
  const router = useRouter();

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        console.log("UserAdmId decodificado:", decoded.id);
        setUserAdmId(decoded.id);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/alunos", {
        Escola,
        Curso,
        Nome,
        Cpf,
        Email,
        Endereco,
        Numero,
        Bairro,
        Cidade,
        Estado,
        Celular1,
        Celular2,
        Celular3,
        userAdmId,
      });

      alert("Aluno cadastrado com sucesso!");
      router.push("/Cadastro/Listar");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-950 text-center mb-4">Cadastro de Aluno</h2>

      <div>
        <label htmlFor="Escola" className="block text-gray-700 font-bold">Escola</label>
        <input
          type="text"
          id="Escola"
          placeholder="Digite o nome da instituicao de ensino"
          value={Escola}
          onChange={(e) => setEscola(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Curso" className="block text-gray-700 font-bold">Curso</label>
        <input
          type="text"
          id="Curso"
          placeholder="Digite o nome do curso"
          value={Curso}
          onChange={(e) => setCurso(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Nome" className="block text-gray-700 font-bold">Nome</label>
        <input
          type="text"
          id="Nome"
          placeholder="Digite o nome do aluno"
          value={Nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Cpf" className="block text-gray-700 font-bold">CPF</label>
        <input
          type="text"
          id="Cpf"
          placeholder="Digite o CPF"
          value={Cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Email" className="block text-gray-700 font-bold">Email</label>
        <input
          type="email"
          id="Email"
          placeholder="Digite o email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Endereco" className="block text-gray-700 font-bold">Endereco</label>
        <input
          type="text"
          id="Endereco"
          placeholder="Digite o seu endereco"
          value={Endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Numero" className="block text-gray-700 font-bold">Numero</label>
        <input
          type="text"
          id="Numero"
          placeholder="Digite o numero"
          value={Numero}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Bairro" className="block text-gray-700 font-bold">Bairro</label>
        <input
          type="text"
          id="Bairro"
          placeholder="Digite o seu bairro"
          value={Bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Cidade" className="block text-gray-700 font-bold">Cidade</label>
        <input
          type="text"
          id="Cidade"
          placeholder="Digite o sua cidade"
          value={Cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Estado" className="block text-gray-700 font-bold">Estado</label>
        <input
          type="text"
          id="Estado"
          placeholder="Digite o seu estado"
          value={Estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Celular1" className="block text-gray-700 font-bold">Celular 1</label>
        <input
          type="text"
          id="Celular1"
          placeholder="Digite o seu celular"
          value={Celular1}
          onChange={(e) => setCelularPrimeiro(formatPhone(e.target.value))}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Celular2" className="block text-gray-700 font-bold">Celular 2</label>
        <input
          type="text"
          id="Celular2"
          placeholder="Digite o seu celular"
          value={Celular2}
          onChange={(e) => setCelularSegundo(formatPhone(e.target.value))}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="Celular3" className="block text-gray-700 font-bold">Celular 3</label>
        <input
          type="text"
          id="Celular3"
          placeholder="Digite o seu celular"
          value={Celular3}
          onChange={(e) => setCelularTerceiro(formatPhone(e.target.value))}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
        Cadastrar e Imprimir
      </button>
    </form>
  );
}
