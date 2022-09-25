import { DataSource } from "typeorm";
import AppDataSource from "../data-source";
import request from "supertest";
import app from "../app";
import { describe, expect, test, beforeAll, afterAll, it } from "@jest/globals";
import { IAdminRequest, IUserRequest, IUserLogin } from "../interfaces/user";

let user1: IUserRequest = {
  full_name: "User Um",
  phone_number: "(24) 3346-1133",
  email: "user1@mail.com",
  password: "1234",
};

let user2: IUserRequest = {
  full_name: "User Dois",
  phone_number: "(24) 3346-1144",
  email: "user2@mail.com",
  password: "1234",
};

let loginUser: IUserLogin = {
  email: "user1@mail.com",
  password: "1234",
};

let testAdmin: IAdminRequest = {
  name: "Seu Dono",
  email: "dono@mail.com",
  password: "1234",
};

let loginAdmin: IUserLogin = {
  email: "dono@mail.com",
  password: "1234",
};

describe("Teste para o método POST em /users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Teste de criação de usuário.", async () => {
    const response = await request(app).post("/users").send(user1);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("createdAt");
  });
  it("Teste de criação de usuário com email já existente", async () => {
    const response = await request(app).post("/users").send(user1);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("message");
  });
  it("Teste de criação de usuário sem passar nenhum dado", async () => {
    const response = await request(app).post("/users").send();
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });
  it("Testando login de usuário", async () => {
    const login = await request(app).post("/login").send(loginUser);

    expect(login.status).toEqual(200);
    expect(login.body).toHaveProperty("token");
    expect(typeof login.body.token).toBe("string");
  });
});

describe("Teste para o método GET, PATCH e DELETE em /users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(user2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Tentando listar todos usuários", async () => {
    const registerAdm = await request(app).post("/adm").send(testAdmin);
    const loginAdm = await request(app).post("/login/adm").send(loginAdmin);
    const { token } = loginAdm.body;

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(response.body)).toEqual(true);
  });
  it("Tentando deletar usuário", async () => {
    const response1 = await request(app).post("/users").send(user1);
    const login = await request(app).post("/login").send(loginUser);
    const { token } = login.body;
    const response = await request(app)
      .delete(`/users`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toHaveProperty("");
  });
});
