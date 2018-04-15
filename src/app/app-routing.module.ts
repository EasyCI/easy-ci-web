import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SettingComponent} from './setting/setting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateFlowComponent} from './create-flow/create-flow.component';
import {FlowTasksComponent} from './flow-tasks/flow-tasks.component';
import {EditFlowComponent} from './edit-flow/edit-flow.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user/register', component: HomeComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/setting', component: SettingComponent},
  {path: 'flow/create', component: CreateFlowComponent},
  {path: 'flow/:flowName', component: FlowTasksComponent},
  {path: 'flow/:flowName/edit', component: EditFlowComponent},
  {path: 'flow/:flowName/task/:taskQueueNumber', component: TaskDetailComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
