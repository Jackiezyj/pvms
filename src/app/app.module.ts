import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorage } from './utilities/localStorage';
import { LoginGuard } from './utilities/login.guard';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { todoReducer } from './utilities/ngrxStore/reducer';
import { ScrStyleService } from './servies/scr-style.service';
import { SituationComponent } from './components/situation/situation.component';
import { AccessComponent } from './components/access/access.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { PowerComponent } from './components/power/power.component';
import { CongigureComponent } from './components/congigure/congigure.component';
import { CarsComponent } from './components/access/cars/cars.component';
import { UsersComponent } from './components/access/users/users.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: "situation", component: SituationComponent ,canActivate: [LoginGuard]},
      { path: "access", component: AccessComponent ,canActivate: [LoginGuard],children:[
        { path: 'cars', component: CarsComponent },
        { path: 'users', component: UsersComponent },
      ]},
      { path: "monitor", component: MonitorComponent ,canActivate: [LoginGuard]},
      { path: "power", component: PowerComponent ,canActivate: [LoginGuard]},
      { path: "congigure", component: CongigureComponent ,canActivate: [LoginGuard]},
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SituationComponent,
    AccessComponent,
    MonitorComponent,
    PowerComponent,
    CongigureComponent,
    CarsComponent,
    UsersComponent,
    // HttpClientModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      todos: todoReducer
    })
    //注册store
  ],
  providers: [LocalStorage, LoginGuard, LoginComponent, ScrStyleService,HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
