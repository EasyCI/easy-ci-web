import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SettingComponent} from './setting/setting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateFlowComponent} from './create-flow/create-flow.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/flow/create', component: CreateFlowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
