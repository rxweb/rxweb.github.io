app.controller("issueCtrl", ["$scope", "$http", "$filter", "$routeParams", "$sce", "$compile", function issueCtrl($scope, $http, $filter, $routeParams, $sce, $compile) {
    var converter = new showdown.Converter();
    $scope.initIssue = function () {
        var t =setTimeout(function(){
            $http({
                method: 'GET',  
                url: '/Templates/Issue.html',
            }).then(function successCallback(response) {
                debugger
                $scope.openIssues = [];
                $scope.closeIssues = [];
                $scope.tabName = "open";
                $scope.openIssue();
                var linkFn = $compile(response.data);
                var content = linkFn($scope);
                $("#issue").html(content);
            });
        },1000)
    };

    $scope.openIssue = function () {
        var contentChildrens = $("#_content").children();
        var headingElement = contentChildrens[0];
        $scope.tabName = "open";
        var url = 'https://api.github.com/repos/rxweb/rxweb/issues?state=open';
        url += '&labels=validator:' + headingElement.innerHTML;
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response) {
            $scope.openIssues = []
            response = response.data;
            for (var i = 0; i < response.length; i++) {
                var item = {}
                item.comments_url = response[i]['comments_url'];
                item.title = response[i]['title'];
                item.number = response[i]['number'];
                item.html_url = response[i]['html_url'];
                item.body = $sce.trustAsHtml(converter.makeHtml(response[i]['body']));
                item.id = response[i]['id'];
                item.user = {};
                item.user.login = response[i]['user']['login'];
                item.user.html_url = response[i]['user']['html_url'];
                item.created_at = response[i]['created_at'];
                item.dayAgo = moment(response[i]['created_at']).fromNow();
                item.comments = {};
                item.isOpen = false;
                $scope.openIssues.push(item);
            }

        }, function errorCallback(response) {
        });
    };

    $scope.closeIssue = function () {
        $scope.tabName = "close";
        var contentChildrens = $("#_content").children();
        var headingElement = contentChildrens[0];
        var url = 'https://api.github.com/repos/rxweb/rxweb/issues?state=closed';
        url += '&labels=validator:' + headingElement.innerHTML;
        $http({
            method: 'GET',
            url: url,
        }).then(function successCallback(response) {
            $scope.closeIssues = []
            response = response.data;

            for (var i = 0; i < response.length; i++) {
                var item = {}
                item.comments_url = response[i]['comments_url'];
                item.title = response[i]['title'];
                item.number = response[i]['number'];
                item.html_url = response[i]['html_url'];
                item.body = $sce.trustAsHtml(converter.makeHtml(response[i]['body']));
                item.id = response[i]['id'];
                item.user = {};
                item.user.login = response[i]['user']['login'];
                item.user.html_url = response[i]['user']['html_url'];
                item.created_at = response[i]['created_at'];
                item.dayAgo = moment(response[i]['created_at']).fromNow();
                item.comments = {};
                item.isOpen = false;
                $scope.closeIssues.push(item);
            }
        }, function errorCallback(response) {
        });
    };

    $scope.viewComments = function (url, index, isOpen) {
        if (isOpen) {
            if (!$scope.openIssues[index]['isOpen']) {
                $http({
                    method: 'GET',
                    url: url + "?client_id=a385a7486c35aa963216&client_secret=31e3c13354c3658471123d49181041eda80ece61",
                }).then(function successCallback(response) {
                    $scope.openComments = []
                    response = response.data;
                    for (var i = 0; i < response.length; i++) {
                        var item = {}
                        item.user = {};
                        item.user.login = response[i]['user']['login'];
                        item.user.html_url = response[i]['user']['html_url'];
                        item.user.avatar_url = response[i]['user']['avatar_url'];
                        item.body = $sce.trustAsHtml(converter.makeHtml(response[i]['body']));
                        item.created_at = response[i]['created_at'];
                        item.dayAgo = moment(response[i]['created_at']).fromNow();
                        $scope.openComments.push(item);
                    }
                    $scope.openIssues[index]['comments'] = $scope.openComments;
                    $scope.openIssues[index]['isOpen'] = !$scope.openIssues[index]['isOpen'];
                }, function errorCallback(response) {
                });
            }
            else {
                $scope.openIssues[index]['isOpen'] = !$scope.openIssues[index]['isOpen'];
            }
        } else {
            if (!$scope.closeIssues[index]['isOpen']) {
                $http({
                    method: 'GET',
                    url: url + "?client_id=a385a7486c35aa963216&client_secret=31e3c13354c3658471123d49181041eda80ece61",
                }).then(function successCallback(response) {
                    $scope.closeComments = []
                    response = response.data;
                    for (var i = 0; i < response.length; i++) {
                        var item = {}
                        item.user = {};
                        item.user.login = response[i]['user']['login'];
                        item.user.html_url = response[i]['user']['html_url'];
                        item.user.avatar_url = response[i]['user']['avatar_url'];
                        item.body = $sce.trustAsHtml(converter.makeHtml(response[i]['body']));
                        item.created_at = response[i]['created_at'];
                        item.dayAgo = moment(response[i]['created_at']).fromNow();
                        $scope.closeComments.push(item);
                    }
                    $scope.closeIssues[index]['comments'] = $scope.openComments;
                    $scope.closeIssues[index]['isOpen'] = !$scope.closeIssues[index]['isOpen'];
                }, function errorCallback(response) {
                });
            }
            else {
                $scope.openIssues[index]['isOpen'] = !$scope.openIssues[index]['isOpen'];
            }
        }
        event.preventDefault();
    };
    //$scope.signIn = function () {
    //    $http({
    //        method: 'GET',
    //        url: "/GitHub/AuthorizeGitHub",
    //    }).then(function successCallback(response) {
    //    }, function errorCallback(response) {
    //    });
    //}

    $scope.comment = function () {
        $http({
            method: 'POST',
            url: "/Comments/PostComment",
        }).then(function successCallback(response) {
            debugger
        }, function errorCallback(response) {
            debugger
        });
    }
}]);

