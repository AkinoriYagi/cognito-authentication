import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CognitoService } from '../../services/cognito.service';
import { Router } from '@angular/router';
import { ComponentsModule } from '../components.module';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  user: User | undefined;
  isConfirm: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirm = false;
  }

  public signUpWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService.signUp(this.user)
        .then(() => {
          this.isConfirm = true;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Missing email or password');
    }
  }

  public confirmSignUp() {
    if (this.user) {
      this.cognitoService.confirmSignUp(this.user)
        .then(() => {
          this.router.navigate(['/sign-in']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Missing user information');
    }
  }

  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }

}
