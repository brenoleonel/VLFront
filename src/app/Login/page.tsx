"use client";
import React, { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resposta = await api.post<{ token: string }>("/user-admin/login", { Email, Senha });

      if (resposta.token) {
        localStorage.setItem("token", resposta.token);
        router.push("/Cadastro/Cadastrar");
      } else {
        alert("Token inválidas")
      }

    } catch (error) {
      alert("Error ao fazer login")
    }
  }

  return (
    <div className="h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-slate-300 shadow-lg rounded-lg p-9 w-full max-w-sm">
        <h1 className="text-gray-700 text-2xl font-bold text-center mb-6">Login</h1>

    <form onSubmit={handleLogin} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="Email" className="block text-gray-700 font-medium mb-2">Email</label>
        <input
        type="Email"
        id="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-700 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite seu email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Senha</label>
        <input
        type="password"
        id="password"
        value={Senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full border border-gray-700 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite sua senha"
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
  )
}

export default Login