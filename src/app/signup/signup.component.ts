import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
  signUpWithEmail() {
    this.authService.signUpWithEmail(this.userEmail, this.userPassword).then((res) => {
      this.authService.redirectToProfile();
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
}
