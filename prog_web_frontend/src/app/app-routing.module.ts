import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {    path: '',component: AuthComponent},
  {    path: 'home',component: HomeComponent, canActivate: [AuthGuard],
          children:  [ 
            {    path: 'paciente',component: PacienteComponent   },
            {    path: 'prontuario',component: ProntuarioComponent   }
          ]
  },
  {    path: 'auth',component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatFormFieldModule],
  exports: [RouterModule, MatFormFieldModule],
  
})
export class AppRoutingModule { }

