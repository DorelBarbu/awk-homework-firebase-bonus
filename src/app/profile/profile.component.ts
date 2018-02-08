import { Component, OnInit } from '@angular/core';
import { loggedInUser } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loggedInUser = loggedInUser;

  private _attendLab(): void {
    if(loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      var selectedLab = (document.getElementById("Laboratories") as HTMLInputElement).value;
      console.log('Selected lab is: ' + selectedLab);
    }
  }
}

