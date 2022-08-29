import { useQuery } from "react-query"; //requisições para back-end
import { api } from "../api";

type User = {
  id: number;
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
    createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));
  return { users, totalCount };
}

export function useUsers(page: number) {
  //return useQuery<User[]>... assim*, ou na função porque o useQuery usa automaticamente a tipagem retornada das funções chamadas
  //recebe a pagina e envia a função* e executa com o valor page
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10min, que o react-query nao ira re-validar as informações, nem atualizar a página
  });
}
