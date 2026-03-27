import { Component, signal } from '@angular/core';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor(public service: Service, public router: Router) {
    this.getUser();
  }

  myInfo = signal<any>({});

  getUser() {
    this.service.profileInfo().subscribe((data: any) => {
      this.myInfo.set(data);
    });
  }

  signOut() {
    this.service.logout();
    this.router.navigate(['/']);
  }
}
