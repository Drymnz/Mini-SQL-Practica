import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './componets/editor/editor.component';
import { TablaComponent } from './componets/tabla/tabla.component';

const routes: Routes = [
  {path:'',component:EditorComponent},
  {path:'lista-tabla',component:TablaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
