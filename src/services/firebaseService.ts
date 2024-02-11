import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

export class FirebaseService {
  private static app: FirebaseApp;
  private static auth: Auth;
  private static firestore: Firestore;

  private constructor() {} // Make the constructor private to prevent instantiation

  public static initializeApp() {
    if (!FirebaseService.app) {
      FirebaseService.app = initializeApp(FirebaseService.getConfig());
      FirebaseService.auth = getAuth(FirebaseService.app);
      FirebaseService.firestore = getFirestore(FirebaseService.app);
      console.log("Initialized firebase service internally...");
    }
  }

  public static getApp(): FirebaseApp {
    if (!this.app) {
      this.initializeApp();
    }
    return this.app;
  }

  public static getAuth(): Auth {
    if (!this.auth) {
      this.initializeApp();
    }
    return this.auth;
  }

  public static getFirestore(): Firestore {
    if (!this.firestore) {
      this.initializeApp();
    }
    return this.firestore;
  }

  private static getConfig() {
    return {
      apiKey: process.env.FIREBASE_API_KEY as string,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.FIREBASE_APP_ID as string,
    };
  }
}
