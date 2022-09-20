import express from "express";
import { appRoutes } from "./routes/index";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
appRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello, World!",
  });
});

app.use(errorMiddleware);
app.listen(3000, () => {
  console.log("server running!");
});
