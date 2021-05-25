import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProntuarioService } from '../prontuario.service';


export class Prontuario {  
    public idconsulta!: number;
    public idpaciente!: number;
    public motivo_consulta!: string;
    public data_consulta!: string;   
    public data_prontuario!: Date; 
    public quadro_atual!: string 
    public hora_prontuario!: Date;
    public sintoma_prontuario!: string;
}

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {

  displayedColumns: string []= ['idpaciente','motivo_consulta','sintoma_prontuario','quadro_atual','data_consulta','data_prontuario', 'hora_prontuario'];
  dataSource = new MatTableDataSource<Prontuario>();

  constructor(private service: ProntuarioService) { }

  ngOnInit() {
    this.service.getProntuario().subscribe(prontuario => this.dataSource.data = prontuario)
  }
}
