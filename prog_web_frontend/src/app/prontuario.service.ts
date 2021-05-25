import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Globals } from './globals/globals';
import { Paciente, Prontuario } from './paciente/paciente.component';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {

  constructor(private http: HttpClient, private globals: Globals) { }
  getProntuario(): Observable<Prontuario[]>{
    return this.http.get<Prontuario[]>("http://localhost:3000/consulta",this.header());
  }

  header(){
    return{ headers: new HttpHeaders ( {'Content-Type': 'application/json', 
    'x-access-token': this.globals.loginData.token    
      })
    };
  }
}
