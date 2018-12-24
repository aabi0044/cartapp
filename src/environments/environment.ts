// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyDMzPtPG-e55kLhpbVVbvN92Pqe350z8lA",
    authDomain: "cartapp-7e1c2.firebaseapp.com",
    databaseURL: "https://cartapp-7e1c2.firebaseio.com",
    projectId: "cartapp-7e1c2",
    storageBucket: "cartapp-7e1c2.appspot.com",
    messagingSenderId: "28252608675"
  },
  stripeKey: 'YOUR_STRIPE_TEST_KEY',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
