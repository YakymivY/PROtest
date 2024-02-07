import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestConstructorComponent } from './test-constructor/test-constructor.component';
import { FormsModule } from '@angular/forms';
import { TestConstructorService } from 'src/app/services/test-constructor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TestSolvingComponent } from './test-solving/test-solving.component';
import { TestSolvingService } from 'src/app/services/test-solving.service';
import { RegisterComponent } from './register/register.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudntComponent } from './studnt/studnt.component';
import { AuthService } from './services/auth.service';
import { DisciplineService } from './services/discipline.service';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptrProvider } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestConstructorComponent,
    TestSolvingComponent,
    RegisterComponent,
    TeacherComponent,
    StudntComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TestConstructorService, TestSolvingService, AuthService, DisciplineService, AuthInterceptrProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
