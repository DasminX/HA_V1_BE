import express, { NextFunction, Request, Response, json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { AppError } from "./utils/appError";
import authRouter from "./router/authRouter";

const app = express();

app.options("*", cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(limiter);

app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(compression());

app.use("/api/auth", authRouter);

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(
  (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Response => {
    console.log(err);

    const isDevel = process.env.NODE_ENV === "development";

    return res.json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
      stack: isDevel ? err.stack : null,
    });
  }
);

export default app;
