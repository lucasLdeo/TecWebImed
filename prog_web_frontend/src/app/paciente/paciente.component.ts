import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from '../paciente.service';

export class Paciente {
  public idpaciente!: number;
  public nome_paciente!: string;
  public idade_paciente!: number;
  public cor_paciente!: string;
  public estado_civil_paciente!: string;
  public naturalidade_paciente!: string;
  public procedencia_paciente!: string;
  public profissao_paciente!: string;
  public endereco_paciente!: string;
  public telefone_paciente!: string;
  public email_paciente!: string;

}
  
export class Prontuario {  
  public idconsulta!:number;
  public idpaciente!: number;
  public nomePaciente!: string;
  public motivo_consulta!: string;
  public data_consulta!: string;
  public sintoma_prontuario!: string;  
  public data_prontuario!: Date; 
  public quadro_atual!: string 
  public hora_prontuario!: Date;

}
@Component(
{
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  displayedColumns: string []= ['Nome', 'Idade','Email','Telefone','Endereco','acoes'];
  dataSource = new MatTableDataSource<Paciente>();

  constructor(private service: PacienteService, public dialog : MatDialog) { }

  ngOnInit() { 
    this.service.getPacientes().subscribe(pacientes => this.dataSource.data = pacientes)
}

openNewDialog(): void {
  const dialogRef = this.dialog.open(MngPacienteDialog,{
    width: '750px',            
    data : new Paciente()
  });
  dialogRef.afterClosed().subscribe(paciente => {
    this.service.adicionar(paciente).subscribe(pacienteId=> {
      paciente.idpaciente = pacienteId;
      this.dataSource.data = this.dataSource.data.concat(paciente);
    });
  })
}
openEditDialog(pacientes: Paciente): void {
  const dialogRef = this.dialog.open(MngPacienteDialog,{
    width: '750px',            
    data : pacientes
  });
  dialogRef.afterClosed().subscribe(paciente => {    
    this.service.editar(paciente).subscribe(_ => {
      this.dataSource.data = this.dataSource.data.map(oldPaciente =>{
        if (oldPaciente.idpaciente == paciente.idpaciente) return paciente;
        else return oldPaciente;
      })        
    });
  });    
}

excluir(paciente: Paciente): void {
  this.service.remover(paciente.idpaciente).subscribe(_=>{
    this.dataSource.data = this.dataSource.data.filter(oldPaciente => oldPaciente.idpaciente != paciente.idpaciente)
  })
}

openNewProntuarioDialog(paciente: Paciente): void {
  const dialogRef = this.dialog.open(MngNewProntuarioDialog,{
    width: '750px',            
    data : new Prontuario()
  });
  dialogRef.afterClosed().subscribe(prontuario => {
    prontuario.idpaciente = paciente.idpaciente;    
    prontuario.hora_prontuario = formatehour();
    prontuario.data_prontuario = formatDate();
    console.log(prontuario)
    this.service.adicionar_prontuario(prontuario).subscribe();
  });    
}  
}
@Component({
selector: 'dialog-mng-paciente',
templateUrl: 'dialog-mng-paciente.html'
})
export class MngPacienteDialog{
constructor(public dialogRef: MatDialogRef<MngPacienteDialog>, 
  @Inject (MAT_DIALOG_DATA)public data: Paciente){}
onNoClick(): void {
  this.dialogRef.close();
  }
}
const formatDate = () => {
  const dateObject = new Date;
  const year = dateObject.getFullYear();
  const month = `0${dateObject.getMonth() + 1}`.slice(-2);
  const day = `0${dateObject.getDate()}`.slice(-2);
  return `${year}/${month}/${day}`;
};
const formatehour = () => {
  const dateObject = new Date;
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${hours}:${minutes}`;  
}
@Component({
selector: 'dialog-mng-prontuario',
templateUrl: 'dialog-mng-prontuario.html'
})

export class MngNewProntuarioDialog{
constructor(public dialogRef: MatDialogRef<MngNewProntuarioDialog>, 
  @Inject (MAT_DIALOG_DATA)public data: Prontuario){}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
