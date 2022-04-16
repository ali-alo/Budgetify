import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userFullName!: string;

  constructor(
    private auth: AuthService,
    private userData: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData.getUser().subscribe({
      next: (data) => {
        this.userFullName = `${data.name} ${data.surname}`;
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
