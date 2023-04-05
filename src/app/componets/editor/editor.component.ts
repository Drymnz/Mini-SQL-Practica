import { Component, OnInit } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { Parser } from "src/app/analyzer/parser";
import { Memoria } from 'src/app/Memoria/Memoria';

//declare var calculador : any;
declare var parser: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent{
  theme = 'vs-dark';
  resut = '';
  memoria:Memoria = new Memoria();

  codeModel: CodeModel = {
    language: 'sql',
    uri: 'main.sql',
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
      const parser = new Parser(this.codeModel.value);
      parser.parse();
      const resultadoAnalize = parser.getRealizar();
      this.memoria.cargar(resultadoAnalize);
      console.log(resultadoAnalize);
      console.log(this.memoria);
      //const result =calculador.parse(this.codeModel.value);
      //this.resut = result;
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
    
  }
}
