# ionic-inview
Simple ionic/angular directive to detect if an element is inside a scroll view.

#install
* Add ionicInView as module dependence
```angular.module('starter', ['ionicInView'])```

* Add in-view directive on target element. It optionally received an function callback, that may recept an special $status variable (in/out).
```
<ion-item in-view="onViewChange(playlist,$status)" ng-repeat="playlist in playlists" href="#/app/playlists/{{playlist.id}}">
```

* Two css classes will be added to the element: inview-out / inview-in.
