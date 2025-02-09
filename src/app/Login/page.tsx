"use client";
import React, { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resposta = await api.post<{ token: string }>("/user-admin/login", { email, senha });

      if (resposta.data.token) {
        sessionStorage.setItem("token", resposta.data.token); // 🔄 Usando sessionStorage ao invés de localStorage
        router.push("/Cadastro/Listar");
      } else {
        alert("Credenciais inválidas");
      }

    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao fazer login"); // 🔄 Mostra mensagem real do backend
    }
  };

  return (
    <div className="h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-slate-300 shadow-lg rounded-lg p-9 w-full max-w-sm">
        <h1 className="text-gray-700 text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-700 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Senha</label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-700 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
