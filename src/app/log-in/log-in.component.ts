declare var require: any
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { loggedInUser } from '../../environments/environment';
import { logInMessage } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { AngularFireDatabase } from 'angularfire2/database';
const geolib = require('geolib');

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  /* We create an observable with the available users and iterate through it */
  users: any[];
  constructor(private db: AngularFireDatabase) {
    db.list('/users')
      .valueChanges().subscribe(users => {
        this.users = users;
        console.log(this.users);
      });
  };


  ngOnInit() {
  }


  private _login(): void {
    /*Aici setam distanta la care trebuie sa fim fata de politehnica, pentru a ne putea loga. Pentru
    ca programul sa returneze corect latitudinea si longitudinea pozitiei curente, serviciul de locatie
    de pe laptop trebuie sa fie activat, iar browser-ul trebuie sa aiba permisiunea pentru a 
    accesa locatia. */

    /*Am procedat in felul urmator:
    1. Am gasit coordonatele politehnicii, in latitudine si longitutinde ca fiind: 44.435010, 26.054920
    2. Folosesc geolocation pentru a lua locatia curenta.
    3. Calculez distanta dintre locatia curenta si coordonatele politehnicii folosind modulul geolib.
      https://www.npmjs.com/package/geolib
    */
    let distanceFromPoli = 0;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position.coords);
          var poliCoords = {
            latitude: 44.4350,
            longitude: 26.0549
          }
          var currCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          console.log('Poli logs');
          console.log(poliCoords);
          distanceFromPoli = geolib.getDistance(currCoords, poliCoords) / 1000.0;
          alert('Distance from poli is ' + distanceFromPoli + ' km.');
          /*Apelam functia care incearca sa logheze user-ul*/
          tryToLogin(distanceFromPoli);
        },
        function () {
          alert('Position could note be determined');
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      alert('Geolocation unavailable');
    }

    var tryToLogin = (distanceFromPoli) => {
      let distanceLimit: Number = parseFloat((document.getElementById('distanceLimit') as HTMLInputElement).value);
      /*Daca distanta de la pozitia curenta catre pozitia politehnicii este mai mare decat limita admisa,
      nu permitem logarea*/
      // alert(distanceFromPoli - distanceLimit);
      //debugger;
      if (distanceLimit < distanceFromPoli) {
        alert('You are too far away to log in');
        return;
      }
      var enteredUserName = (document.getElementById('userLogInText') as HTMLInputElement).value;
      var enteredPassword = (document.getElementById('passwordLogInText') as HTMLInputElement).value;
      var numberOfUsers = this.users.length;
      var usecase = 0;
      for (var i = 0; i < numberOfUsers; i++) {
        if (this.users[i].username === enteredUserName && this.users[i].password === enteredPassword) {
          console.log('Successfully login');
          usecase = 1;
          break;
        }
        if (this.users[i].username === enteredUserName && this.users[i].password !== enteredPassword) {
          console.log('Wrong password');
          alert('Wrong password');
          usecase = 2;
          break;
        }
      }
      // user not found
      if (usecase === 0) {
        console.log('User not found');
        alert('User not found');
      }
      // loggedin succcessfully
      if (usecase === 1) {
        loggedInUser.username = enteredUserName;
        loggedInUser.password = enteredPassword;
        var userIndex;

        for (var i = 0; i < numberOfUsers; i++) {
          if (this.users[i].username === loggedInUser.username) {
            userIndex = i;
            break;
          }
        }
        loggedInUser.name = this.users[userIndex].name;
        loggedInUser.surname = this.users[userIndex].surname;
        loggedInUser.email = this.users[userIndex].email;
        loggedInUser.id = this.users[userIndex].id;
        loggedInUser.userIndex = userIndex;
        loggedInUser.attendance = this.users[userIndex].attendance;

        alert('Successfully logged in. You can now go to profile.');
        logInMessage.message = 'Logged in as ' + loggedInUser.username;
      }

    }

  }
}
