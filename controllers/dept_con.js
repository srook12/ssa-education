appMod

 .controller("deptCtrl", ['$http','$routeParams', '$location', function($http,$routeParams,$location) {
		var self = this;
			self.deptId = $routeParams.deptId;

		$http.get('http://localhost:8080/departments/department')
			.then(function(resp){
				self.depts = resp.data;
				console.log(resp.data)
			},function(err) {

			});
		
		$http.get('http://localhost:8080/departments/department/' + self.deptId)
			.then(function(resp){
				self.classes = resp.data;
				console.log(resp.data)
			},function(err) {

			});
			
			  
	}])
	