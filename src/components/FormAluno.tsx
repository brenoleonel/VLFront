"use client";
import { useState } from "react";

export default function FormAluno() {
  const [curso, setCurso] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [celular1, setCelularPrimeiro] = useState("");
  const [celular2, setCelularSegundo] = useState("");
  const [celular3, setCelularTerceiro] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviado para Impressao e cadastrado!!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-950 text-center mb-4">Cadastro de Aluno</h2>

      <div>
        <label htmlFor="curso" className="block text-gray-700">Curso</label>
        <input
          type="text"
          id="curso"
          placeholder="Digite o nome do curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="nome" className="block text-gray-700">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Digite o nome do aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="cpf" className="block text-gray-700">CPF</label>
        <input
          type="text"
          id="cpf"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Digite o email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="endereco" className="block text-gray-700">Endereço</label>
        <input
          type="text"
          id="endereco"
          placeholder="Digite o endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="numero" className="block text-gray-700">Número</label>
          <input
            type="number"
            id="numero"
            placeholder="Nº"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="bairro" className="block text-gray-700">Bairro</label>
          <input
            type="text"
            id="bairro"
            placeholder="Digite o bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cidade" className="block text-gray-700">Cidade</label>
          <input
            type="text"
            id="cidade"
            placeholder="Digite a cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="estado" className="block text-gray-700">Estado</label>
          <input
            type="text"
            id="estado"
            placeholder="Digite o estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Telefones</label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            id="celular1"
            placeholder="Celular 1"
            value={celular1}
            onChange={(e) => setCelularPrimeiro(formatPhone(e.target.value))}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
          <input
            type="text"
            id="celular2"
            placeholder="Celular 2"
            value={celular2}
            onChange={(e) => setCelularSegundo(formatPhone(e.target.value))}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
          <input
            type="text"
            id="celular3"
            placeholder="Celular 3"
            value={celular3}
            onChange={(e) => setCelularTerceiro(formatPhone(e.target.value))}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg"
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
        Cadastrar e Imprimir
      </button>
    </form>
  );
}
