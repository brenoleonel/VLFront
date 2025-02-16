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
      const resposta = await api.post<{ token: string; user: { id: string; nome: string; email: string; senha: string } }>(
        "/user-admin/login",
        { Email, Senha }
      );

      const { token, user } = resposta.data || resposta;
      console.log('userId:', user)

      if (token) {
        sessionStorage.setItem("token", token);
        router.push("/Cadastro/Listar");
      } else {
        alert("Credenciais inválidas");
      }

    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={Email}
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
              value={Senha}
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
  )
}

export default Login;