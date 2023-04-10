import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CodeEditorModule } from '@ngstack/code-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './componets/editor/editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { DinamicoTablaMemoriaDirective } from './directive/dinamico-tabla-memoria.directive';
import { TablaMemoriaComponent } from './componets/tabla-memoria/tabla-memoria.component';
@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DinamicoTablaMemoriaDirective,
  ],
  entryComponents:[
    TablaMemoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeEditorModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
