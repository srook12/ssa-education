appMod
	.controller("instrCtrl", ['$http','$routeParams', function($http,$routeParams) {
		var self = this;
		self.instructorId = $routeParams.instructorId;


		$http.get('http://localhost:8080/instructors/instructor')
			.then(function(resp){
				self.instructors = resp.data;
				console.log(resp.data)
			},function(err) {

			});
		
		$http.get('http://localhost:8080/instructors/instructor/' + self.instructorId)
			.then(function(resp){
				self.instructor = resp.data;
				console.log(resp.data)
			},function(err) {

			});
			
		
	 

	}])
	