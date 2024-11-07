import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmiComponent } from './emi/emi.component';

const routes: Routes = [
  {path:'',component:EmiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
