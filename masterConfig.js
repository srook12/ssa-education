appMod
appMod
.config(['$routeProvider', function($routeProvider) {

		$routeProvider
		.when('/', {
			templateUrl: 'home.html'

			
		}).when('/classes/class', {
			templateUrl: 'allclasses.html',
			controller: 'AppCtrl',
			controllerAs: 'ctrl'
			
			
		}).when('/classes/class/:classId', {
			templateUrl: 'classById.html',
			controller: 'AppCtrl',
			controllerAs: 'ctrl'
			
			
		}) .when('/classes/class_by_department/:deptId', {
			templateUrl: 'classesByDept.html',
			controller: 'AppCtrl',
			controllerAs: 'ctrl'

			
		}).when('/departments/department', {
			templateUrl: 'alldepts.html',
			controller: 'AppCtrl',
			controllerAs: 'ctrl'

		
		}).when('/about', {
			templateUrl: 'about.html'

		})
		.otherwise({redirectTo: '/'});

	}]); // end config