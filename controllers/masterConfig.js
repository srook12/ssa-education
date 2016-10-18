appMod
.config(['$routeProvider', function($routeProvider) {

		$routeProvider
		.when('/', {
			templateUrl: 'home.html'

		//Class configs	
		}).when('/classes/class', {
			templateUrl: 'allclasses.html',
			controller: 'classCtrl',
			controllerAs: 'ctrl'
			
			
		}).when('/classes/class/:classId', {
			templateUrl: 'classById.html',
			controller: 'classCtrl',
			controllerAs: 'ctrl'
			
			
		}) .when('/classes/class_by_department/:deptId', {
			templateUrl: 'classesByDept.html',
			controller: 'classCtrl',
			controllerAs: 'ctrl'

	//Department configs		
		}).when('/departments/department', {
			templateUrl: 'alldepts.html',
			controller: 'deptCtrl',
			controllerAs: 'ctrl'
    
	//Instructor configs
	    }).when('/instructors/instructor', {
			templateUrl: 'allinstructors.html',
			controller: 'instrCtrl',
			controllerAs: 'ctrl'
			
	    }).when('/instructors/instructor/:instructorId', {
			templateUrl: 'singleInstructor.html',
			controller: 'instrCtrl',
			controllerAs: 'ctrl'
			
		//Major configs	
		}).when('/majors/major', {
			templateUrl: 'allmajors.html',
			controller: 'MajorCtrl',
			controllerAs: 'ctrl'
			
				
	    }).when('/majors/list_major_classes/:majorId', {
			templateUrl: 'classByMajor.html',
			controller: 'MajorCtrl',
			controllerAs: 'ctrl'
			
		//Student configs	
        }).when('/students/student', {
			templateUrl: 'allStudents.html',
			controller: 'StudentCtrl',
			controllerAs: 'ctrl'
			
		}).when('/students/student/:studentId', {
			templateUrl: 'singleStudent.html',
			controller: 'StudentCtrl',
			controllerAs: 'ctrl'
				
		}).when('/about', {
			templateUrl: 'about.html'

		})
		.otherwise({redirectTo: '/'});

	}]); // end config