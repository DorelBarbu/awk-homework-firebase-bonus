import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { loggedInUser } from '../environments/environment';
import { logInMessage } from '../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `

  <head>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>

  <body>
    <header>
    <!-- Partea de login -->
    <h3 id="logInMessage">
      {{logInMessage.message}}
    </h3>
    </header>

    <div style="text-align:center">
      <h1>
        {{ title }}
      </h1>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-6" id="menuDiv">
          <ul id="menu">
            <li>
            <button class="menuButton" (click)="logInShow = !logInShow; attendanceShow = false; profileShow = false; registerShow = false">LogIn</button>
            </li>
            <li>
            <button class="menuButton" (click)="logInShow = false; registerShow = !registerShow; attendanceShow = false; profileShow = false">Register</button>
            </li>
            <li>
            <button class="menuButton" (click)="logInShow = false; registerShow = false; profileShow = !profileShow; attendanceShow = false">Profil</button>
            </li>
            <li>
            <button class="menuButton" (click)="logInShow = false; registerShow = false; profileShow = false; attendanceShow=!attendanceShow">Attendance</button>
            <li>
          </ul>
        </div>
        <div class="col-sm-6" id="appDiv"> 
          <div id="logInContainer" *ngIf="logInShow">
            Distance limit(km): <br> 
            <input id="distanceLimit" type="text">
            <app-log-in></app-log-in>
          </div>
    
          <div id="registerContainer" *ngIf="registerShow" style="text-align:left">
            <app-register></app-register>
          </div>
        
          <div id="profileContainer" *ngIf="profileShow" style="text-align:left">
            <app-profile></app-profile>
          </div>

          <div id="attendanceContainer" *ngIf="attendanceShow" style="text-align:left">
            <app-attendance></app-attendance>
          </div>
        </div>
      </div>
    </div>

  </body>
`
})

export class AppComponent {
  title = 'Dorel Barbu 331AA';
  environment = environment;
  loggedInUser = loggedInUser;
  logInMessage = logInMessage;
}
