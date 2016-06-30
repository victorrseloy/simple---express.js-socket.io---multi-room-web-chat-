function Chat(){

    var socket = io.connect('http://localhost:5000');

    // socket.on('connect', function (data) {
    //     socket.emit('join', 'Hello World from client');
    // });


    socket.on("message",function(data){
        var appElement = document.querySelector('[ng-controller=channelsController]');
        var $scope = angular.element(appElement).scope();
        $scope.$apply(function() {

            var obj = {"channelId":$scope.channel,"message":data};
            if(!$scope.chatMessages.push){
                $scope.chatMessages = new Array();

            }

            $scope.chatMessages.push(obj);
        });
    })

    this.sendMsg = function(channel,message){
        socket.emit("message",{"message":message,"channelId":channel})
    };

    this.join = function(channel){
        socket.emit("join",{"channelId":channel})
    };

    this.leave = function(channel){
        socket.emit("leave",{"channelId":channel})
    };


}

var chat = new Chat();

