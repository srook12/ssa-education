
appMod

.controller("MajorCtrl", ['$http','$routeParams', '$location', function($http,$routeParams,$location) {
       var self = this;
       self.majorId = $routeParams.majorId;
       

       $http.get('http://localhost:8080/majors/major')
           .then(function(resp){
               self.majors = resp.data;
               console.log(resp.data)
           },function(err) {

           });
       
	    $http.get('http://localhost:8080/majors/major/' + self.majorId)
           .then(function(resp){
               self.major = resp.data;
               console.log(resp.data)
           },function(err) {

           });
           
       $http.get('http://localhost:8080/majors/list_major_classes/' + self.majorId)
           .then(function(resp){
               self.classesByMajor = resp.data;
               console.log(resp.data)
           },function(err) {

           });
   

   }])