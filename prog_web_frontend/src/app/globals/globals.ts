
import { Injectable } from "@angular/core";
import { Usuario } from "../auth/auth.component";
@Injectable()
export class Globals {

    loginData = new LoginData();
}

class LoginData{
    token!: string;
    usuario!: Usuario ;
}