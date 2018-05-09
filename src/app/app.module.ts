import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RoutesModule } from './routes.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';

import { PanelService } from './panel.service';
import { NotifyService } from './notify.service';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';
import { DataService } from './data.service';
import * as Hammer from 'hammerjs';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FgpwdComponent } from './fgpwd/fgpwd.component';
// import { SongComponent } from './song/song.component';
import { LyricComponent } from './lyric/lyric.component';
import { EditorComponent } from './editor/editor.component'

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'swipe': { direction: Hammer.DIRECTION_ALL  }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    DashboardComponent,
    SigninComponent,
    SignupComponent,
    FgpwdComponent,
    // SongComponent,
    LyricComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    AuthService,
    GuardService,
    PanelService,
    NotifyService,
    DataService,
    {
      provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
