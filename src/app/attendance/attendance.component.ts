import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { loggedInUser } from '../../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  users: any[];
  data = [];
  laboratories: any[];
  courses: any[];
  constructor(private db: AngularFireDatabase) {
    db.list('/users')
      .valueChanges().subscribe(users => {
        this.users = users;
        console.log(this.users);
      });
    db.object('/users').snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      this.data = data;
      return data;
    }).subscribe(item => console.log(item.$key));
    db.list('/laboratories')
      .valueChanges().subscribe(laboratories => {
        this.laboratories = laboratories;
        console.log(this.laboratories);
      });
    db.list('/courses')
      .valueChanges().subscribe(courses => {
        this.courses = courses;
        console.log(this.courses);
      });
  }

  ngOnInit() {
  }

  private _show(): void {
    if (loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      console.log('Username logged in');
    }
    console.log('Keys');

    /*Retrieve the Firebase $key to update the user */
    var usernameKey;
    for (var key in this.data) {
      //console.log(key, this.data[key]);
      if (this.data[key].username === loggedInUser.username) {
        usernameKey = key;
        break;
      }
    }
    console.log('The user key is: ' + usernameKey);
    //Search laboratories from the user group
    console.log('Avialable labs:');
    var numberOfLaboratories = this.laboratories.length;
    for (var i = 0; i < numberOfLaboratories; i++) {
      var numberOfGroups = this.laboratories[i].groups.length;
      for (var j = 0; j < numberOfGroups; j++) {
        if (this.laboratories[i].groups[j] === this.data[usernameKey].id) {
          console.log(this.laboratories[i].name);
          var option = document.createElement("option");
          option.setAttribute("value", "Lab " + this.laboratories[i].name);
          option.innerHTML = this.laboratories[i].name;
          document.getElementById("Laboratories").appendChild(option);
        }
      }
    }

    console.log('Avialable courses:');
    var numberOfCourses = this.courses.length;
    for (var i = 0; i < numberOfCourses; i++) {
      var numberOfGroups = this.courses[i].groups.length;
      for (var j = 0; j < numberOfGroups; j++) {
        if (this.courses[i].groups[j] === this.data[usernameKey].id) {
          console.log(this.courses[i].name);
          var option = document.createElement("option");
          option.setAttribute("value", "Curs " + this.courses[i].name);
          option.innerHTML = this.courses[i].name;
          document.getElementById("Courses").appendChild(option);

        }
      }
    }
  }

  private _attendLab(): void {
    if (loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      var selectedLab = (document.getElementById("Laboratories") as HTMLInputElement).value;
      /*Retrieve the Firebase $key to update the user */
      var usernameKey;
      for (var key in this.data) {
        if (this.data[key].username === loggedInUser.username) {
          usernameKey = key;
          break;
        }
      }
      var newAttendance = this.data[key].attendance;
      newAttendance.push(selectedLab);
      console.log(newAttendance);
      loggedInUser.attendance = newAttendance;
      this.db.object('/users/' + usernameKey).update({
        attendance: newAttendance
      });
      alert('Succesfully attended. Check profile page');
    }
  }

  private _attendCourse(): void {
    if (loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      var selectedCourse = (document.getElementById("Courses") as HTMLInputElement).value;
      //console.log('Selected course is: ' + selectedCourse);
      var usernameKey;
      for (var key in this.data) {
        if (this.data[key].username === loggedInUser.username) {
          usernameKey = key;
          break;
        }
      }
      var newAttendance = this.data[key].attendance;
      newAttendance.push(selectedCourse);
      console.log(newAttendance);
      loggedInUser.attendance = newAttendance;
      this.db.object('/users/' + usernameKey).update({
        attendance: newAttendance
      });
      alert('Succesfully attended. Check profile page');
    }
  }
}
