import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  name: any;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userId = localStorage.getItem('customerId');

    if (userId) {
      this.userService.findUserInformationById(userId).subscribe(
        (data: any) => {
          this.name = data.name.split(' ')[0];
        },
        (error) => {
          console.error('Error find data user:', error);
        }
      );
    }
  }
}
