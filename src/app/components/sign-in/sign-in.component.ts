import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { ComponentsModule } from '../components.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  user: User | undefined;
  alertMessage: string = '';
  showAlert: boolean = false;

  isForgotPassword: boolean = false;
  newPassword: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.user = {} as User;
  }

  signInWithCognito() {
    if (this.user && this.user.name && this.user.password) {
      this.cognitoService.signInName(this.user)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        })
    } else {
      this.displayAlert("Please enter a valid email or password");
    }
  }

  signInWithCognitobk() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService.signIn(this.user)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        })
    } else {
      this.displayAlert("Please enter a valid email or password");
    }
  }

  forgotPasswordClicked() {
    if (this.user && this.user.email) {
      this.cognitoService.forgotPassword(this.user)
        .then(() => {
          this.isForgotPassword = true;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        })
    } else {
      this.displayAlert("Please Enter a valid email address")
    }
  }

  newPasswordSubmit() {
    if (this.user && this.user.code && this.newPassword.trim().length != 0) {
      this.cognitoService.forgotPasswordSubmit(this.user, this.newPassword.trim())
        .then(() => {
          this.displayAlert("Password Updated");
          this.isForgotPassword = false;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        })
    } else {
      this.displayAlert("Please enter Valid input")
    }
  }

  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
