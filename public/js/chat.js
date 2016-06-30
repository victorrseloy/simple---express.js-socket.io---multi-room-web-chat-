function Chat(){

    var socket = io.connect();

    // socket.on('connect', function (data) {
    //     socket.emit('join', 'Hello World from client');
    // });


    socket.on("message",function(data){
        var appElement = document.querySelector('[ng-controller=channelsController]');
        var $scope = angular.element(appElement).scope();
        $scope.$apply(function() {

            var obj = {"channelId":$scope.channel,"message":data.message,"author":data.author};
            if(!$scope.chatMessages.push){
                $scope.chatMessages = new Array();

            }

            $scope.chatMessages.push(obj);
        });
    })

    this.sendMsg = function(channel,message,user){
        socket.emit("message",{"message":message,"channelId":channel,"author":user});
    };

    this.join = function(channel){
        socket.emit("join",{"channelId":channel})
    };

    this.leave = function(channel){
        socket.emit("leave",{"channelId":channel})
    };


}

var chat = new Chat();

