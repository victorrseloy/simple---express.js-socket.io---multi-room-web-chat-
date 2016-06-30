var app =  angular.module("myApp",[]);

app.controller("channelsController", function ($http, $scope) {

    $scope.newChannelName = "";
    $scope.chatMessages = ""

    $scope.load =   function load() {
        $http.get("/channel").success(function (data, status, headers, config) {
            $scope.channels = data;
        }).error(function (data, status, headers, config) {
            console.log("error retrieving channels")
        });
    };

    $scope.newChannel = function () {
        console.log($scope.newChannelName);
        $http.post("/channel",{title:$scope.newChannelName}).success(function (data, status, headers, config) {
            $scope.load();
            $scope.newChannelName = "";
        });
    };

    $scope.deleteChannel = function(id) {

        $http.delete("/channel/"+id).success(function (data, status, headers, config) {
            $scope.load();
        });
    };
    


    /*******init****************/
    $scope.load();
    /*******init****************/



    $scope.currentChannel = "";
    $scope.msg = "";
    $scope.currentChannelName = "";

    $scope.changeChannel = function (channel) {
        $http.get("/message/"+channel._id).success(function (data, status, headers, config) {
            chat.leave($scope.currentChannel);
            $scope.currentChannel = channel._id;
            $scope.currentChannelName = channel.title;
            chat.join($scope.currentChannel);
            $scope.chatMessages = data
            $('#chat').scrollTop($('#chat')[0].scrollHeight);
        });
    };

    $scope.sendMsg = function () {
        console.log($scope.channel+ " - " + $scope.msg );
        var obj = {"channelId":$scope.currentChannel,"message":$scope.msg};
        chat.sendMsg($scope.currentChannel,$scope.msg);
        $scope.msg = "";

    }

});

