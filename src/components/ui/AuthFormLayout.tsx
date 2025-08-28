import type { ReactNode } from "react";
import AuthRedirectLinks from "./AuthRedirectLinks";

// Interface que define as props que o componente aceita
interface AuthFormLayoutProps {
  title: string; // Título da página (ex: "Login", "Cadastro")
  children: ReactNode; // Conteúdo principal (formulário, campos, botões)
  redirectLinks?: ReactNode; // Links opcionais (ex: "Já tem conta? Faça login")
}

/**
 * COMPONENTE: AuthFormLayout
 *
 * PROPÓSITO:
 * - Layout reutilizável para páginas de autenticação
 * - Padroniza a estrutura visual de login, cadastro, etc.
 * - Evita repetição de código entre diferentes telas de auth
 *
 * ESTRUTURA RENDERIZADA:
 * 1. Título da página (h1)
 * 2. Conteúdo principal (formulário)
 * 3. Links de redirecionamento (navegação entre páginas)
 */
export default function AuthFormLayout({
  title, // Título que será exibido no topo
  children, // Conteúdo que será inserido no meio (formulário)
  redirectLinks, // Links customizados (opcional)
}: AuthFormLayoutProps) {
  return (
    <>
      {/* SEÇÃO 1: Título da página */}
      <h1 className="text-2xl font-bold mb-4">
        {title} {/* Exibe o título passado via props */}
      </h1>
      {/* SEÇÃO 2: Conteúdo principal */}
      {children} {/* Renderiza o conteúdo passado como children */}
      {/* SEÇÃO 3: Links de redirecionamento */}
      {/* 
        LÓGICA: Se redirectLinks for fornecido, usa ele.
        Caso contrário, usa o componente padrão AuthRedirectLinks
        
        Operador ||: 
        - Se redirectLinks existe e não é null/undefined → usa redirectLinks
        - Se redirectLinks é null/undefined → usa <AuthRedirectLinks />
      */}
      {redirectLinks || <AuthRedirectLinks />}
    </>
  );
}

/*
EXEMPLO DE USO:

// Uso básico (com links padrão):
<AuthFormLayout title="Login">
  <LoginForm />
</AuthFormLayout>

// Uso com links customizados:
<AuthFormLayout 
  title="Cadastro" 
  redirectLinks={<Link to="/login">Já tem conta?</Link>}
>
  <SignUpForm />
</AuthFormLayout>

VANTAGENS:
✅ Reutilização de código
✅ Consistência visual
✅ Fácil manutenção
✅ Flexibilidade nos links
✅ Separação de responsabilidades
*/
