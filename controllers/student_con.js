appMod

 .controller("StudentCtrl", ['$http','$routeParams', '$location', function($http,$routeParams,$location) {
		var self = this;
			self.studentId = $routeParams.studentId;

		$http.get('http://localhost:8080/students/student')
			.then(function(resp){
				self.students = resp.data;
				console.log(resp.data)
			},function(err) {

			});
		
		$http.get('http://localhost:8080/students/student/' + self.studentId)
			.then(function(resp){
				self.student = resp.data;
				console.log(resp.data)
			},function(err) {

			});
			
			  
	}])
	