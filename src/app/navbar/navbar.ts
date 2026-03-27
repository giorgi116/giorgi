import { Component, signal, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public service: Service, public router: Router) {
    this.getRaodenoba();
    this.showAllKalata();
  }

  public raodenoba = signal<number>(0);
  menuOpen = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  @HostListener('document:keydown.escape')
  onEscape() { this.closeMenu(); }

  showAllKalata() {
    this.service.kalata().subscribe((data: any) => {
      this.raodenoba.set(data.length);
      this.service.trailer.next(data.length);
    });
  }

  getRaodenoba() {
    this.service.trailer.subscribe((data: any) => {
      this.raodenoba.set(data);
    });
  }

  isLoggedIn(): boolean { return this.service.isLoggedIn(); }

  logout() {
    this.service.logout();
    this.raodenoba.set(0);
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
