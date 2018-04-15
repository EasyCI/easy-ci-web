import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {UserService} from './core/service/user.service';
import {LoginComponent} from './login/login.component';
import {ExceptionService} from './core/service/exception.service';
import {CommonService} from './core/service/common.service';
import {SettingComponent} from './setting/setting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FlowService} from './core/service/flow.service';
import {CreateFlowComponent} from './create-flow/create-flow.component';
import {ReposService} from './core/service/repos.service';
import {FlowTasksComponent} from './flow-tasks/flow-tasks.component';
import {EditFlowComponent} from './edit-flow/edit-flow.component';
import {TaskService} from './core/service/task.service';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {DashboardService} from './core/service/dashboard.service';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SettingComponent,
    DashboardComponent,
    CreateFlowComponent,
    FlowTasksComponent,
    EditFlowComponent,
    TaskDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    ExceptionService,
    CommonService,
    FlowService,
    ReposService,
    TaskService,
    FlowTasksComponent,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
