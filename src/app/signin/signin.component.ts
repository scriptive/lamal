import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  private userEmail: string;
  private userPassword: string;
  private userMessage: string;
  constructor(private authService: AuthService, private panel: PanelService) {
    this.authService.user.subscribe((user) => {
      if (this.authService.hasSignedIn()) this.authService.redirectToHome();
    });
  }
  ngOnInit() {
    this.panel.closeIf();
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle().then((res) => {
      this.authService.redirectToProfile();
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
  signInWithFacebook() {
    this.authService.signInWithFacebook().then((res) => {
      this.authService.redirectToProfile();
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
  signInWithGithub() {
    this.authService.signInWithGithub().then((res) => {
      this.authService.redirectToProfile();
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
  signInWithTwitter() {
    this.authService.signInWithTwitter().then((res) => {
      this.authService.redirectToProfile();
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
  signInWithEmail() {
    this.authService.signInWithEmail(this.userEmail, this.userPassword).then((res) => {
      this.authService.redirectToProfile();
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
}
