import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './componets/editor/editor.component';
import { MemoriaGlobalService } from './servicio/memoria-global.service';

const routes: Routes = [
  {path:'',component:EditorComponent},
  {path:':memoria',component:EditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[MemoriaGlobalService]
})
export class AppRoutingModule { }
