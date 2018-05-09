import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-fgpwd',
  templateUrl: './fgpwd.component.html',
  styleUrls: ['./fgpwd.component.scss']
})
export class FgpwdComponent implements OnInit {
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
  sendPasswordResetEmail() {
    this.authService.sendPasswordResetEmail(this.userEmail).then((res) => {
      this.userMessage='E-mail has been sent, please follow the verification link!';
    }).catch((error) => {
      this.userMessage=error.message;
    });
  }
}
