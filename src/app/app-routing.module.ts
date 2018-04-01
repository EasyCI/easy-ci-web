import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SettingComponent} from './setting/setting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateFlowComponent} from './create-flow/create-flow.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user/register', component: HomeComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/setting', component: SettingComponent},
  {path: 'flow/create', component: CreateFlowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
