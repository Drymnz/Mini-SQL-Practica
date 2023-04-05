import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CodeEditorModule } from '@ngstack/code-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './componets/editor/editor.component';
import { TablaComponent } from './componets/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
