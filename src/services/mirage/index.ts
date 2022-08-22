import { createServer, Factory, Model } from "miragejs";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}), //modelo da base dados mirage
    },

    factories: {
      //forma gerar dados em massa, 200, 1000, etc
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {},
        createdAt() {}, //mesmo estando em camelCase ele compreende que e o created_at
      }), //nome modulo
    },

    seeds(server) {
      //criar usuários ou dados assim mirage for iniciado
    },

    routes() {
      this.namespace = "api"; //definir a rota /api/users
      this.timing = 750; //tempo de request

      this.get("/users");
      this.post("/users");

      this.namespace = ""; //para nao dar conflito com rotas api do Next, do src/api
      this.passthrough(); //detectar as rotas pelo mirage, se nao passar para o nextjs
    },
  });
  return server;
}
