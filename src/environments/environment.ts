// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export let environment = {
  production: false,
  users: [
            {
                "username": "test",
                "password": "test",
                "name": "Mihai",
                "surname": "Stan",
                "email": "stan.mihaioctavian@gmail.com",
                "id": "322AA",
                "attendance" : ["112", "300"]
            },
            {
                "username": "test1",
                "password": "test1",
                "name": "Ion",
                "surname": "Vasile",
                "email": "ion.vasile@gmail.com",
                "id": "322AB",
                "attendance" : []
            }  
  ],
  laboratories: [
                    {
                        "name": "AWJ",
                        "dates": [
                                    {
                                        "day": "Monday",
                                        "hour": 1300
                                    },
                                    {
                                        "day": "Friday",
                                        "hour": 1800
                                    }
                        ],
                        "groups": ["322AB", "322AC"],
                        "id": "111"
                    }, 
                    {
                        "name": "BD",
                        "dates": [
                                    {
                                        "day": "Monday",
                                        "hour": 1100
                                    },
                                    {
                                        "day": "Friday",
                                        "hour": 1000
                                    }
                        ],
                        "groups": ["322AA"],
                        "id": "112"
                    }
  ],
  courses: [
                    {
                        "name": "AWJ",
                        "dates": [
                                    {
                                        "day": "Monday",
                                        "hour": 1300
                                    },
                                    {
                                        "day": "Friday",
                                        "hour": 1800
                                    }
                        ],
                        "groups": ["322AB", "322AC"],
                        "id": "113"
                    }, 
                    {
                        "name": "BD",
                        "dates": [
                                    {
                                        "day": "Monday",
                                        "hour": 1100
                                    },
                                    {
                                        "day": "Friday",
                                        "hour": 1000
                                    }
                        ],
                        "groups": ["322AA"],
                        "id": "114"
                    }
  ],
  firebase: {
    apiKey: "AIzaSyAlI0OzdzjqP-Fp2NqtpNysWcE-kY7EoRg",
    authDomain: "homework-awj-dorel-barbu-331aa.firebaseapp.com",
    databaseURL: "https://homework-awj-dorel-barbu-331aa.firebaseio.com",
    projectId: "homework-awj-dorel-barbu-331aa",
    storageBucket: "homework-awj-dorel-barbu-331aa.appspot.com",
    messagingSenderId: "512556741534"
  }
};

// Holds the current logged in user
export let loggedInUser = {
    username: null,
    password: null,
    name: null,
    surname: null,
    email: null,
    id: null,
    userIndex: null,
    attendance: []
};

export let logInMessage = {
    message: 'Not logged in'
}