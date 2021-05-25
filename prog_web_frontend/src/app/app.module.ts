import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MngNewProntuarioDialog, MngPacienteDialog, PacienteComponent } from './paciente/paciente.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { Globals } from './globals/globals';
@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    ProntuarioComponent,
    MngPacienteDialog,
    MngNewProntuarioDialog,
    AuthComponent,
    HomeComponent,        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,

  ],
  entryComponents: [
    MngPacienteDialog,
    MngNewProntuarioDialog
  ],
  providers: [AuthGuard, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
