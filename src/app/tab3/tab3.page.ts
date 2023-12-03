import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  userData: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  logout() {
    localStorage.removeItem('customerId');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth']);
  }

  loadUserData() {
    const userId = localStorage.getItem('customerId');

    if (userId) {
      this.userService.findUserInformationById(userId).subscribe(
        (data: any) => {
          this.userData = data;
        },
        (error) => {
          console.error('Error find data user:', error);
        }
      );
    }
  }
}
