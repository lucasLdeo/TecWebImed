import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from './globals/globals';
import { Paciente, Prontuario } from './paciente/paciente.component';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient, private globals: Globals) { }
  getPacientes(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>("http://localhost:3000/pacientes",this.header());
  }
  
  getPaciente(pacienteId: number): Observable<Paciente>{
    return this.http.get<Paciente>("http://localhost:3000/paciente/"+pacienteId,this.header());
  }

  adicionar(paciente: Paciente): Observable<any>{
    return this.http.post("http://localhost:3000/paciente",paciente,this.header());
  }  

  editar(paciente: Paciente): Observable<any>{
    return this.http.put("http://localhost:3000/pacientes/"+paciente.idpaciente, paciente, this.header());
  }  

  remover(pacienteid: number): Observable<any>{
    return this.http.delete("http://localhost:3000/paciente/"+pacienteid,this.header());
  }
  adicionar_prontuario(prontuario: Prontuario): Observable<any>{    
    return this.http.post("http://localhost:3000/consulta/"+prontuario.idpaciente, prontuario,this.header());
  }

  header(){
    return{ headers: new HttpHeaders ( {'Content-Type': 'application/json', 
    'x-access-token': this.globals.loginData.token    
      })
    };
  }
}
