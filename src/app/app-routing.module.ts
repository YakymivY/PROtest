import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestConstructorComponent } from './test-constructor/test-constructor.component';
import { TestSolvingComponent } from './test-solving/test-solving.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudntComponent } from './studnt/studnt.component';


const routes: Routes = [
//type routes here
  { path: "constructor", component: TestConstructorComponent },
  { path: "solving", component: TestSolvingComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "teacher", component: TeacherComponent },
  { path: "student", component: StudntComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
