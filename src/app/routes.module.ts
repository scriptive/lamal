import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from './guard.service';

import { CategoryComponent } from './category/category.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HomeComponent }   from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FgpwdComponent } from './fgpwd/fgpwd.component';
import { EditorComponent } from './editor/editor.component';
import { LyricComponent } from './lyric/lyric.component';
const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '',data:{name:'home.'}, pathMatch: 'full', component:HomeComponent},

  { path: 'signin',data:{name:'Signin',auth:'guest'}, component:SigninComponent},
  { path: 'signup',data:{name:'Signup',auth:'guest'}, component:SignupComponent},
  { path: 'fgpwd',data:{name:'Reset Password',auth:'guest'}, component:FgpwdComponent},

  { path: 'dashboard',data:{name:'Dashboard',auth:'user'},  component:DashboardComponent },

  { path: 'category',data:{name:'category'}, component:CategoryComponent},
  { path: 'lyric/:category',data:{name:'Lyric'}, component:LyricComponent},
  { path: 'editor',data:{name:'Editor'}, component:EditorComponent},
  { path: 'search',data:{name:'Search'}, component:DashboardComponent},
  { path: 'about',data:{name:'About'}, component:DashboardComponent},
  { path: 'contact',data:{name:'Contact'}, component:DashboardComponent}
];
// canActivate: [GuardService],
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule {
}
