app.config(['$routeProvider', 'tempConfig', '$locationProvider', function ($routeProvider, tempConfig, $locationProvider) {
    $routeProvider.when(tempConfig.hashurl.issue, {
        controller: tempConfig.controllers.issueCtrl,
        templateUrl: tempConfig.getTemplate("Issue/Issue")
        })
}]);