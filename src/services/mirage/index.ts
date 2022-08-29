import { createServer, Factory, Model, Response } from "miragejs"; //server api
import { faker } from "@faker-js/faker"; //geração dados fictícios

type User = {
  name: string;
  email: string;
  createdAt: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}), //modelo da base dados mirage
    },

    factories: {
      //forma gerar dados em massa, 200, 1000, etc
      //nome modulo
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        //mesmo estando em camelCase ele compreende que e o created_at
        createdAt() {
          return faker.date.recent(10);
        },
      }), //nome modulo
    },

    seeds(server) {
      //criar usuários ou dados assim mirage for iniciado
      server.createList("user", 200); //criar uma lista do modele user, de 200 usuários
    },

    routes() {
      this.namespace = "api"; //definir a rota /api/users
      this.timing = 750; //tempo de request

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const totalUsers = schema.all("user").length; //recebe total users existentes

        const pageStart = (Number(page) - 1) * Number(per_page); //ex.: page: 3 - 1 = 2 * 10 = 20 - inicia item 20
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        ); //retorna objeto com array uses ex.: { ..., user:[user1,user2,...],...} / usar serialize para usar o nosso model acima, se da error.

        //como nosso requisição nao faz parte da estrutura, precisamos enviar como headers
        return new Response(
          200,
          { "x-total-count": String(totalUsers) },
          { users }
        ); //retornamos 200 success, nome padrão usado comunidade 'x-total-count' com total users, e os registros users - listagem
      });
      this.post("/users");

      this.namespace = ""; //para nao dar conflito com rotas api do Next, do src/api
      this.passthrough(); //detectar as rotas pelo mirage, se nao passar para o nextjs
    },
  });
  return server;
}
