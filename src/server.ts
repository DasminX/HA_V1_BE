import dotenv from "dotenv";
import app from "./index";
import path from "path";
import { FirebaseService } from "./services/firebaseService";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(process.cwd(), ".env") });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  try {
    FirebaseService.initializeApp();
    console.log("Firebase service initialized properly!");
  } catch (e) {
    console.log("Error in initializing firebase service");
  } finally {
    console.log(`App running on port ${port}...`);
  }
});

/* process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
}); */

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
