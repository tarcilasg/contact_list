import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import adminRoutes from "./routes/admin.routes";
import contactRoutes from "./routes/contact.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/adm", adminRoutes);
app.use("/contacts", contactRoutes);

app.use(errorMiddleware);

export default app;
