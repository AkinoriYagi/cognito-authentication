import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { User } from '../../models/user';
import { Session } from '../../models/session';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  currentUser: User | null = null;
  currentSession: Session | null = null;

  constructor(private router: Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  async getUserDetails(): Promise<void> {
    try {
      const user = await this.cognitoService.getUser();
      if (user) {
        this.currentUser = user;
        await this.getCurrentSession();
      } else {
        this.router.navigate(['/sign-in']);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      this.router.navigate(['/sign-in']);
    }
  }

  async getCurrentSession(): Promise<void> {
    try {
      this.currentSession = await this.cognitoService.getCurrentSession();
    } catch (error) {
      console.error('Error fetching current session:', error);
    }
  }

  async signOutWithCognito(): Promise<void> {
    try {
      await this.cognitoService.signOut();
      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
