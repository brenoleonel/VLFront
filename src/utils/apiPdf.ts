const BASE_URL = "http://localhost:3003";

export const baixarPdfAluno = async (alunoId: string) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/alunos/${alunoId}/pdf`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) throw new Error("Erro ao baixar o PDF");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aluno-${alunoId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar o PDF:", error);
  }
};
