appMod
	.controller("classCtrl", ['$http','$routeParams', function($http,$routeParams) {
		var self = this;
		self.classId = $routeParams.classId;
		self.deptId = $routeParams.deptId;

		$http.get('http://localhost:8080/classes/class')
			.then(function(resp){
				self.classes = resp.data;
				console.log(resp.data)
			},function(err) {
console.log("there was an error")
			});
		
		$http.get('http://localhost:8080/classes/class_by_department/' + self.deptId)
			.then(function(resp){
				self.classbydept = resp.data;
				console.log(resp.data)
			},function(err) {

			});
			
		$http.get('http://localhost:8080/classes/class/' + self.classId)
			.then(function(resp){
				self.singleClass = resp.data;
				console.log(resp.data)
			},function(err) {

			});
	 

	}])
	