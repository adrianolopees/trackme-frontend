import { Link } from "react-router-dom";

// Interface que define as props do componente
interface AuthRedirectLinksProps {
  // Prop opcional que define qual página alternativa mostrar
  alternate?: "login" | "register"; // Union type: só aceita esses 2 valores
}

/**
 * COMPONENTE: AuthRedirectLinks
 *
 * PROPÓSITO:
 * - Fornecer navegação contextual em páginas de autenticação
 * - Permitir alternância entre login e cadastro
 * - Oferecer rota de escape (voltar ao início)
 *
 * LÓGICA:
 * - Se alternate = "register" → está na página de login, mostra link para cadastro
 * - Se alternate = "login" → está na página de cadastro, mostra link para login
 * - Sempre mostra link para voltar ao início
 */
export default function AuthRedirectLinks({
  // Destructuring com valor padrão
  // Se não passar alternate, assume "register" (ou seja, está na página de login)
  alternate = "register",
}: AuthRedirectLinksProps) {
  return (
    <div className="text-sm mt-4 text-center space-y-2">
      {/* 
        RENDERIZAÇÃO CONDICIONAL:
        Usa operador ternário para mostrar conteúdo diferente
        baseado no valor da prop 'alternate'
      */}
      {alternate === "register" ? (
        // CASO 1: Está na página de LOGIN
        // Mostra link para CADASTRO
        <p>
          Ainda não tem conta?{" "}
          {/* 
            Espaço em branco (" ") para separar texto do link
            React ignora espaços simples, então usamos {" "}
          */}
          <Link
            to="/register" // Rota para página de cadastro
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cadastre-se
          </Link>
        </p>
      ) : (
        // CASO 2: Está na página de CADASTRO
        // Mostra link para LOGIN
        <p>
          Já tem uma conta?{" "}
          <Link
            to="/login" // Rota para página de login
            className="text-blue-600 underline hover:text-blue-800"
          >
            Entrar
          </Link>
        </p>
      )}

      {/* 
        LINK SEMPRE PRESENTE:
        Independente da página atual, sempre mostra
        opção de voltar ao início da aplicação
      */}
      <p>
        <Link
          to="/" // Rota raiz da aplicação
          className="text-gray-600 underline hover:text-gray-800"
        >
          Voltar ao início
        </Link>
      </p>
    </div>
  );
}

/*
EXEMPLOS DE USO:

// Uso na página de LOGIN (padrão):
<AuthRedirectLinks />
// ou explicitamente:
<AuthRedirectLinks alternate="register" />
// Resultado: "Ainda não tem conta? Cadastre-se"

// Uso na página de CADASTRO:
<AuthRedirectLinks alternate="login" />
// Resultado: "Já tem uma conta? Entrar"

CLASSES CSS EXPLICADAS:
- text-sm: texto pequeno
- mt-4: margin-top 1rem
- text-center: centraliza o texto
- space-y-2: espaçamento vertical entre elementos filhos
- text-blue-600: cor azul para links principais
- hover:text-blue-800: azul mais escuro no hover
- underline: sublinhado nos links
- text-gray-600: cor cinza para link secundário

VANTAGENS DO DESIGN:
✅ Contextual: mostra links relevantes para cada página
✅ Consistente: mesmo estilo em todas as páginas
✅ Acessível: links bem definidos com hover states
✅ Flexível: pode ser customizado via props
✅ Padrão sensato: assume comportamento mais comum
*/
