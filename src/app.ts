import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
//import { Request, Response } from "express";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("server running!");
});

//appRoutes(app);
/* app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello, World!",
  });
}); */
