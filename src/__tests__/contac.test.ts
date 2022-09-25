import { DataSource } from "typeorm";
import AppDataSource from "../data-source";
import request from "supertest";
import app from "../app";
import { describe, expect, test, beforeAll, afterAll, it } from "@jest/globals";
import { IUserRequest, IUserLogin } from "../interfaces/user";
import { IContactRequest, IContact } from "../interfaces/contact";

let user1: IUserRequest = {
  full_name: "User Um",
  phone_number: "(24) 3346-1133",
  email: "user1@mail.com",
  password: "1234",
};

let loginUser: IUserLogin = {
  email: "user1@mail.com",
  password: "1234",
};

let contact1: IContactRequest = {
  full_name: "Contact Um",
  phone_number: "(24) 3346-1155",
  email: "contact1@mail.com",
  user_id: "",
};

let contact2: IContactRequest = {
  full_name: "Contact Dois",
  phone_number: "(24) 3346-1166",
  email: "contact1@mail.com",
  user_id: "",
};

describe("Testing the contact creation", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(user1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should create a new contact", async () => {
    const login = await request(app).post("/login").send(loginUser);
    const { token } = login.body;

    const response = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send(contact1);

    expect(response.body).toHaveProperty("user");
  });
});

describe("Testing the contact list method", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    const user = await request(app).post("/users").send(user1);
    const login = await request(app).post("/login").send(loginUser);
    const { token } = login.body;

    await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send(contact1);

    await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send(contact2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Test list contacts by user id", async () => {
    const login = await request(app).post("/login").send(loginUser);
    const { token } = login.body;

    const response = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.length).toEqual(2);
  });
});

describe("Testing GET, PATCH, and DELETE contacts method", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    const user = await request(app).post("/users").send(user1);
    const login = await request(app).post("/login").send(loginUser);
    const { token } = login.body;

    await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send(contact1);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
