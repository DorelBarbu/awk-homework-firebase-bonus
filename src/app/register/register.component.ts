import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  users: any[];
  constructor(private db: AngularFireDatabase) {
    db.createPushId
    db.list('/users')
      .valueChanges().subscribe(users => {
        this.users = users;
        console.log(this.users);
      });
  }


  ngOnInit() {
  }

  private _register(): void {

    var enteredUserName = (document.getElementById('userRegisterText') as HTMLInputElement).value;
    var enteredPassword = (document.getElementById('passwordRegisterText') as HTMLInputElement).value;
    var enteredName = (document.getElementById('nameRegisterText') as HTMLInputElement).value;
    var enteredSurname = (document.getElementById('surnameRegisterText') as HTMLInputElement).value;
    var enteredEmail = (document.getElementById('emailRegisterText') as HTMLInputElement).value;
    var enteredID = (document.getElementById('idRegisterText') as HTMLInputElement).value;
    var newUser: {
      username: string,
      password: string,
      name: string,
      surname: string,
      email: string,
      id: string,
      attendance: string[]
    } = {
        username: enteredUserName,
        password: enteredPassword,
        name: enteredName,
        surname: enteredSurname,
        email: enteredEmail,
        id: enteredID,
        attendance: []
      };
    console.log(newUser);
    var numberOfUsers = this.users.length;

    var foundUsername = 0;
    for (var i = 0; i < numberOfUsers; i++) {
      if (this.users[i].username === newUser.username) {
        foundUsername = 1;
        break;
      }
    }
    if (foundUsername === 0) {
      alert('Registration succcessful');
      this.users.push(newUser);
      this.db.list('/users').push(newUser);
    } else {
      alert('Username already exists');
    }

    
  }

}
