import { useQuery } from "react-query"; //requisições para back-end
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

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
  return users;
}

export function useUsers() {
  //return useQuery<User[]>... assim*, ou na função porque o useQuery usa automaticamente a tipagem retornada das funções chamadas
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5, //5 segundos, que o react-query nao ira re-validar as informações, nem atualizar a página
  });
}
