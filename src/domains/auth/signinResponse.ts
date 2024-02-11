import { IdTokenResult } from "firebase/auth";

type ISigninResponse = {
  status: "ok";
  data: {
    iat: number;
    exp: number;
    token: string;
  };
};

export class SigninResponse implements ISigninResponse {
  public readonly status: "ok";
  public readonly data: ISigninResponse["data"];

  constructor(idTokenResult: IdTokenResult) {
    this.status = "ok";
    this.data = {
      iat: Number(idTokenResult.claims.iat),
      exp: Number(idTokenResult.claims.exp),
      token: idTokenResult.token,
    };
  }
}
