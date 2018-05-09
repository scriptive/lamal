import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userCurrent: firebase.User = null;
  constructor(private firebase: AngularFireAuth, private router: Router) {
    this.user = firebase.authState;
    this.user.subscribe((user) => {
        // console.log('fee');
        if (user) {
          this.userCurrent = user;
          // console.log('subscribe');
          // console.log(this.userCurrent);
        }
        else {
          this.userCurrent = null;
        }
      }
    );
  }
  signInWithEmail(email, password) {
     const credential = firebase.auth.EmailAuthProvider.credential( email, password );
     return this.firebase.auth.signInWithEmailAndPassword(email, password);
  }
  signInWithGoogle() {
    return this.firebase.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
  signInWithFacebook() {
    return this.firebase.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }
 signInWithGithub() {
   return this.firebase.auth.signInWithPopup(
     new firebase.auth.GithubAuthProvider()
   )
 }
  signInWithTwitter() {
    return this.firebase.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }
  hasSignedIn() {
    return (this.userCurrent)?true:false;
  }
  signout(): void {
    this.firebase.auth.signOut().then((res) => {
      this.redirectToHome();
    });
  }
  sendPasswordResetEmail(email) {
    return this.firebase.auth.sendPasswordResetEmail(email);
    // firebase.auth().sendPasswordResetEmail(data.email.value)
  }
  sendEmailVerification() {
    return this.userCurrent.sendEmailVerification();
  }
  signUpWithEmail(email, password) {
    return this.firebase.auth.createUserWithEmailAndPassword(email, password);
  }
  redirectToHome(): void {
    this.router.navigate(['/']);
  }
  redirectToSignIn(): void {
     this.router.navigate(['signin']);
     // this.router.navigateByUrl('/signin');
  }
  redirectToProfile(): void {
    this.router.navigate(['dashboard']);
  }
}