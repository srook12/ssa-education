appMod

	.controller("CLCtrl", ['$http', '$routeParams', '$location', function($http, $routeParams, $location) {
		var self = this;
		//console.log($routeParams);
		self.id = $routeParams.majorId;

		$http.get('http://localhost:8080/class_list')
			.then(function(resp){
				self.class_list = resp.data;
				console.log(self.class_list);

				self.print_days = function(mon, tues, wed, thurs, fri, sat, onl) {
					var day_string = "";
					if(mon  == true) {day_string += "M";}
					if(tues == true) {day_string += "T";}
					if(wed  == true) {day_string += "W";}
					if(thurs== true) {day_string += "R";}
					if(fri  == true) {day_string += "F";}
					if(sat  == true) {day_string += "S";}
					if(onl  == true) {day_string += "Online";}

					return day_string;
				}

				self.parse_time = function(begin, end) {
					if(begin != null) {
						var b = new Date("December 12, 1981 " + begin);
						var e = new Date("December 12, 1981 " + end);
						return formatAMPM(b) + " - " + formatAMPM(e);
					}
				}

			},function(err) {

			});

		if(self.id != undefined) {
			$http.get('http://localhost:8080/majors/major/'+self.id)
				.then(function(resp){
					self.major = resp.data;
				},function(err) {

				});

			$http.get('http://localhost:8080/majors/list_major_classes/' + self.id)
				.then(function(resp) {
					self.class_major = resp.data;
				},function(err){
					
				})
		}

		self.clear = function(major) {
			major.name = "";
			major.req_credits = ""
			major.description = "";
		};

		self.addupdMajor = function(func, id, name, req_credits, description) {
			var major = {};
			major.id = id;
			major.name = name;
			major.req_credits = req_credits;
			major.description = description;
			
			var method = func == 'add' ? 'POST' : 'PUT';
			$http({
					method: method,
					url: 'http://localhost:8080/majors/major', 
					data: major
				})
				.then(function(resp){
					console.log('SUCCESS:', resp);
					$location.path('/major');
				},function(err) {
					console.log('FAILURE:', err);
				});
		};

		self.addMajor = function(id, name, req_credits, description) {
			self.addupdMajor('add', id, name, req_credits, description);
		};

		self.updateMajor = function(id, name, req_credits, description) {
			self.addupdMajor('upd', id, name, req_credits, description);
		};

		self.deleteMajor = function(id) {
			$http.delete('http://localhost:8080/majors/major/'+id)
				.then(function(resp){
					console.log("SUCCESS: ", resp);
					$location.path('/major');
				},function(err) {
					console.log('FAILURE:', resp);
				});

		};

	}]) // end controller
	



function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

