appMod

	.controller("LoginCtrl", ['$http', '$routeParams', '$location', function($http, $routeParams, $location) {
		var self = this;
		//console.log($routeParams);

		
		self.submit = function() {
			console.log(self.username, self.password);
			var account = {};
			account.username = self.username;
			account.password = self.password;

			$http({
				method: "POST",
				url: "http://localhost:8080/accounts/login",
				data: account
			}).then(function(resp){
				//console.log("SUCCESS:", resp);
				console.log(resp.data);
				console.log(!resp.data)
			}, function(err){
				console.log("FAILURE:", err);
			})
		}

	}]) // end controller
	

;// end all 