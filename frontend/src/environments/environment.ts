// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  serverport: 4200,
  production: false,
  adminmail: ['lhomme.thomas@pm.me', 'guillaume.rouyer@assemblee-virtuelle.org', 'Pierre@bouvier-muller.fr', 'romain.guitet@afaup.org ', 'pierre@bouvier-muller.fr','simon.louvet.zen@gmail.com'],
  serverUrl: 'http://localhost:3000/',
  frontUrl: 'http://localhost:4200/',
  adresseUrl: 'https://api-adresse.data.gouv.fr/search/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
