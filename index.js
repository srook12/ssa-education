angular.module("AppMod", ["ngRoute"])
	.controller("AppCtrl", ['$http','$routeParams', function($http,$routeParams) {
		var self = this;
		self.id = $routeParams.studentId;

		$http.get('http://localhost:8080/classes/class')
			.then(function(resp){
				self.classes = resp.data;
				console.log(resp.data)
			},function(err) {

			});
		
	  /*   
		$http.get('http://localhost:8080/student/'+self.id)
			.then(function(resp){
				self.student = resp.data;
			},function(err) { 

			
		});*/
		self.update = function(){
			$http.put('http://localhost:8080/student')
			.then(function(resp){
				self.student = resp.data;
			},function(err) {

			});
		}
			
		self.add = function(firstName, lastName, sat, gpa, majorid) {
			
			var stud = {};
		
			stud.first_name = firstName;
			stud.last_name = lastName;
			stud.sat = sat;
			stud.gpa = gpa;
			stud.majorid = majorid;
			console.log(stud);
			
			$http.post('http://localhost:8080/student', stud)
				.then(function(resp){
					console.log('SUCCESS:', resp);
									
				},function(err) {
					console.log('FAILURE:', err);
				});
		};

		
		self.update = function(form, id, firstName, lastName, sat, gpa, majorid) {
		
		if(form.$valid) {
			var stud = {};
		
		    stud.id = id;
 			stud.first_name = firstName;
			stud.last_name = lastName;
			stud.sat = sat;
			stud.gpa = gpa;
			stud.majorid = majorid;
			console.log(stud);
			
			$http.put('http://localhost:8080/student', stud)
				.then(function(resp){
					console.log('SUCCESS:', resp);
							
				},function(err) {
					console.log('FAILURE:', err);
				});
		}
		
		};
		
		self.delete = function(){
			 console.log(self.id)
			$http.delete('http://localhost:8080/student/' + self.id)
			.then(function(resp){
				self.student = resp.data;
			},function(err) {

			});
		}
			
			/* $("button").click(function(){
		  
		             
		
		    $("img").addClass("spin"); */

	}])
	.config(['$routeProvider', function($routeProvider) {

		$routeProvider
		.when('/', {
			templateUrl: 'home.html'

		}).when('/classes/class', {
			templateUrl: 'allclasses.html',
			controller: 'AppCtrl',
			controllerAs: 'ctrl'
			
		})/* .when('/student/:studentId', {
			templateUrl: 'studentdetail.html',
			controller: 'AppCtrl',
			controllerAs: 'ctrl' 

		})*/.when('/about', {
			templateUrl: 'about.html'

		})
		.otherwise({redirectTo: '/'});

	}]); // end config