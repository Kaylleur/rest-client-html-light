app.controller('MainController',
['$scope','$http','$sanitize',function($scope,$http,$sanitize){

    $scope.nameMethod = 'GET '; //used to display  -> default
    $scope.methods =['GET','HEAD','POST','PUT','DELETE','TRACE','OPTIONS','CONNECT','PATCH'];
    $scope.contentType = ["JSON","XML","text/plain"];
    $scope.histories = [];
    $scope.request ={};
    $scope.request.method = 'GET';
    $scope.request.headers = [{}];
    $scope.preview = false;
    $scope.btnPreview = 'Preview';

    $scope.updateMethod = function(method){
        $scope.nameMethod = method + ' ';
        $scope.request.method = method;
    };

    $scope.addHeader = function(){
        $scope.request.headers.push({});
    };

    $scope.removeHeader = function(index){
        $scope.request.headers.splice(index,1);
    };

    $scope.showPreview = function(){
        $scope.preview = !$scope.preview;
        $scope.btnPreview = $scope.btnPreview == 'Preview' ? 'Text' : 'Preview';
    };

    $scope.controlBody = function(withToast){
        var body = $scope.request.data;
        var res = null;
        if(body) {
            switch ($scope.request.contentType) {
                case "JSON" :
                    res = validator.isJSON(body);
                    break;
                case "XML" :
                    res = validateXML(body);
                    break;
                case "text/plain":
                    break;
            }
        }else $scope.bodyClass= "";
        //display
        if(res){
            $scope.bodyClass= "has-success";
            if(withToast)toastr.success('Your body is valid.');
        }else if(res === false) {
            $scope.bodyClass= "has-error";
            if(withToast)toastr.error('Body not valid !')
        }
        return res;
    };

    $scope.beautifyBody = function(){
        if($scope.controlBody(false)){
            switch ($scope.request.contentType) {
                case "JSON" :
                    $scope.request.data = beautifyJSON($scope.request.data);
                    break;
                case 'XML':
                    $scope.request.data = beautifyXML($scope.request.data)
                    break;
            }
        }else{
            toastr.error('Your body is invalid can\'t beautify.');
        }
    };

    $scope.send = function(){
        $scope.histories.push(clone($scope.request));
        try {
            $http($scope.request)
                .then(function(response){
                    //success
                    $scope.statusClass = 'label-success';
                    $scope.response = response;
                },function(err){
                    //error
                    $scope.statusClass = err.status < 500 ? 'label-warning' : 'label-danger';
                    $scope.response = err;
                    console.error(err);
                })
        }catch(err){
            toastr.error('Error on the request !');
            console.log(err);
        }

    };

    $scope.beautifyResponse = function(response){
        var contentType = response.headers()['content-type'].split(';');

        if(contentType.indexOf('application/json')!=-1)$scope.response.data = beautifyJSON(JSON.stringify(response.data));
        else if(contentType.indexOf('application/xml')!=-1)$scope.response.data = beautifyXML(response.data);
        else toastr.info('Cannot detect type of response.');
    };

}]);