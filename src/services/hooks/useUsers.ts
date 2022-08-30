import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"; //requisições para back-end
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

//a função recebe parâmetro com valor da page
//e enviamos o valor da page através de params para a api
//além da lista do usuários *data* precisamos receber do headers os 'x-total-count*
export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    },
  });
  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));
  return { users, totalCount };
}

export function useUsers(page: number, options?: UseQueryOptions) {
  //return useQuery<User[]>... assim*, ou na função porque o useQuery usa automaticamente a tipagem retornada das funções chamadas
  //recebe a pagina e envia a função* e executa com o valor page
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10min, que o react-query nao ira re-validar as informações, nem atualizar a página
    ...options, //UseQueryOptions - recebe o initialData enviado pelo GetServerSideProps (qual valor quer inicializar a parte do users) - se tiver initialData nao será feita a primeira requisição por parte do cliente, e será feito pelo servidor (Forma de integrar React-query com SSR)
  }) as UseQueryResult<GetUsersResponse, unknown>; //configura o hook useUsers- erro começa a acontecer após principalmente da configuração das options - algumas pessoas apenas usaram o workaround de fazer o cast do resultado do useQuery para o formato correto
}
