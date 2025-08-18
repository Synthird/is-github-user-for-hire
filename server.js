import express from "express";
import forHireRouter from "./routes/is-for-hire.js";

export const app = express();
app.use("/api/is-for-hire", forHireRouter);
