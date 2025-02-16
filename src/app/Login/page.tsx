"use client";
import FormAluno from "@/components/FormLogin";

export default function Login() {
  return (
    <div className="h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-slate-300 shadow-lg rounded-lg p-9 w-full max-w-sm">
        <h1 className="text-gray-700 text-2xl font-bold text-center mb-6">Login</h1>
        <FormAluno />
      </div>
    </div>
  );
};

