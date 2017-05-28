var app = angular.module('SoilApp', [
'ngRoute',
'ngMaterial',
'soil.controllers.datalist',
'soil.services.data',
'soil.controllers.sidebar',
'soil.controllers.adddialog',
'soil.directives.datalistitem',
'soil.directives.datalist',
'soil.factories.sensors',
"soil.directives.sensorlist"
]);
