import { IdTokenResult } from "firebase/auth";

type ISignupResponse = {
  status: "ok";
  message: string;
};

export class SignupResponse implements ISignupResponse {
  public readonly status: "ok";
  public readonly message: string;

  constructor() {
    this.status = "ok";
    this.message = "Successfully signed up";
  }
}
