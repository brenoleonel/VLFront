import React from "react";

const Login = () => {
  return (
    <div className="h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-slate-300 shadow-lg rounded-lg p-9 w-full max-w-sm">
        <h1 className="text-gray-700 text-2xl font-bold text-center mb-6">Login</h1>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
        <input
        type="email"
        id="email"
        className="w-full border border-gray-700 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite seu email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Senha</label>
        <input
        type="password"
        id="password"
        className="w-full border border-gray-700 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite sua senha"
        />
      </div>
      
      <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition">
        Login
      </button>
      </div>
    </div>
  )
}

export default Login