import { Component, OnInit } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';

declare var calculador : any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent{
  theme = 'vs-dark';
  resut=""

  codeModel: CodeModel = {
    language: 'sql',
    uri: 'main.json',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    FontSize:32
  };
  vista(){
    try {
      console.log(this.codeModel.value);
      const result =calculador.parse(this.codeModel.value);
      this.resut = 'Resultado ' + result;
    } catch (error) {
      console.log("Error ");
      console.log(error);
    }
    
  }
}
