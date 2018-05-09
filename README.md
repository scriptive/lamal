# Lamal

## Angular

- `ng serve --host 192.168.0.10`
- `ng serve --host 0.0.0.0`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

ng g c song --module app

## Firebase

- `firebase deploy`
- `firebase serve`


https://itnext.io/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32

## NPM

npm install angularfire2 firebase --save

```javascript
var sourceText = document.getElementById('sourceText'); sourceText.value=sourceText.value.replace(/\n\s*\n/g, '\n\n').trim().replace(/\d+\s/g,'').trim();
var sourceText = document.getElementById('sourceText'); sourceText.value=sourceText.value.replace(/\n\s*\n/g, '\n\n').replace(/\d+\s/g,'$1').replace(/\n\s/g,'\n\n');
var sourceText = document.getElementById('sourceText'); sourceText.value=sourceText.value.replace(/\n\s+/g,'1');
var sourceText = document.getElementById('sourceText'); sourceText.value=sourceText.value.replace(/\n\s*\n/g, '\n\n').replace(/\d+\s/g,'').replace(/\n\s+/g,'\n\n').trim();
var sourceText = document.getElementById('sourceText');
sourceText.value=sourceText.value.replace(/\n\s*\n/g, '\n\n');


/\s+/g


var sourceText = document.getElementById('sourceText');
sourceText.value=sourceText.value.replace(/\n\s*\n/g, '\n\n').replace(/\n\s+/g,'\n').replace(/\d+\s+/g,'\n').trim();

var sourceText = document.getElementById('sourceText'), sourceText.value=sourceText.value.replace(/^[A-Z].*\n?/gm, '').replace(/\n\s*\n/g, '\n\n').replace(/\n\s+/g,'\n').replace(/\d+\s+/g,'\n').trim();




```
 0 {

 }
'\n\s'

