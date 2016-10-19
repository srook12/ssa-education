appMod
	.controller("PortalCtrl", ['$http', '$routeParams', '$location', function($http, $routeParams, $location) {
		var self = this;
		self.id = $routeParams.studentId;

		if(self.id != undefined) {
			$http.get('http://localhost:8080/students/student/' + self.id)
				.then(function(student_data) {
					self.student = student_data.data;

					$http.get('http://localhost:8080/school_years/semesters_since/' + self.student.first_semester.id)
						.then(function(semester_data) {
							self.semesters = semester_data.data;

							self.transcript = [];
							$http.get('http://localhost:8080/academics/student/' + self.id)
								.then(function(classes_taken_data) {
									self.classes_taken = classes_taken_data.data;

									self.semester_array = [];
									for(var idx = 0; idx < self.semesters.length; idx++) {										
										self.semester_array[self.semesters[idx].semester] = [];
									}
									
									for(var idx = 0; idx < self.classes_taken.length; idx++) {
										var course_name = self.classes_taken[idx].class_list_id.class_id.department_id.code +
											" " + self.classes_taken[idx].class_list_id.class_id.num;

										self.semester_array[self.classes_taken[idx].class_list_id.semester.semester].push(
											{
												"crn": self.classes_taken[idx].class_list_id.crn,
												"course": course_name,
												"name": self.classes_taken[idx].class_list_id.class_id.name,
												"section": self.classes_taken[idx].class_list_id.sect,
												"credits": self.classes_taken[idx].class_list_id.class_id.credits,
												"grade": self.classes_taken[idx].grade
											}					
										);
									}


									for(var idx = 0; idx < self.semesters.length; idx++) {
										var gpaStats = calculateGpa(self.semester_array[self.semesters[idx].semester]);

										self.transcript.push(
											{
												"semester": self.semesters[idx].semester,
												"courses": self.semester_array[self.semesters[idx].semester],
												"sem_gpa": gpaStats["sem_gpa"],
												"sem_points": gpaStats["sem_points"],
												"sem_credits": gpaStats["sem_credits"]
											}

										);
									}

									console.log(self.transcript);	
									
									self.calculate_total_points = function() {
										return calculateCummulativeGpa(self.semester_array, self.semesters)["total_points"];
									}

									self.calculate_total_credits = function() {
										return calculateCummulativeGpa(self.semester_array, self.semesters)["total_credits"];
									}

									self.calculate_cummulative_gpa = function() {
										return calculateCummulativeGpa(self.semester_array, self.semesters)["cummulative_gpa"];
									}								
								});
						});
				});

				
		}
	}]); // end controller

	function calculateGpa(courses) {
		var total_credits = 0;
		var total_points = 0;

		var gpaInfo = [];

		for(var idx = 0; idx < courses.length; idx++) {
			var credits = courses[idx].credits;
			var grade = courses[idx].grade;
			var grade_value;
			total_credits += credits;

			if(grade == "A") { grade_value = 4; }
			else if(grade == "B") { grade_value = 3; }
			else if(grade == "C") { grade_value = 2; }
			else if(grade == "D") { grade_value = 1; }
			else if(grade == "F") { grade_value = 0; }

			total_points += (grade_value * credits);
		}

		var gpa;

		if(total_credits != 0) {
			gpa = total_points / total_credits;
		} else {
			gpa = 0;
		}

		gpaInfo["sem_points"] = total_points;
		gpaInfo["sem_credits"] = total_credits;
		gpaInfo["sem_gpa"] = gpa.toFixed(2);

		//return gpa.toFixed(2);
		return gpaInfo;
	}

	function calculateCummulativeGpa(all_courses, semesters) {
		var total_credits = 0;
		var total_points = 0;

		var gpa_stats;
		var cummulative_gpa;
		var cummulative_gpa_stats = [];

		console.log(semesters);
		for(var idx = 0; idx < semesters.length - 1; idx++) {
			gpa_stats = calculateGpa(all_courses[semesters[idx].semester]);
			total_credits += gpa_stats["sem_credits"];
			total_points += gpa_stats["sem_points"];
		}

		if(total_credits != 0) {
			cummulative_gpa = total_points / total_credits;
		} else {
			cummulative_gpa = 0;
		}

		cummulative_gpa_stats["cummulative_gpa"] = cummulative_gpa.toFixed(2);
		cummulative_gpa_stats["total_points"] = total_points;
		cummulative_gpa_stats["total_credits"] = total_credits;

		console.log(cummulative_gpa_stats);

		return cummulative_gpa_stats;
	}

		function generateTranscriptV1(classes_taken) {
			transcriptV1 = [];

			for(var idx = 0; idx < classes_taken.length; idx++) {
				var curr_semester = classes_taken[idx].class_list_id.semester.semester;

				var classes_semester = [];

				while(idx < classes_taken.length && (curr_semester == 
					classes_taken[idx].class_list_id.semester.semester)) 
				{


					var course_name = classes_taken[idx].class_list_id.class_id.department_id.code +
										" " + classes_taken[idx].class_list_id.class_id.num;
					classes_semester.push(
						{
							"crn": classes_taken[idx].class_list_id.crn,
							"course": course_name,
							"name": classes_taken[idx].class_list_id.class_id.name,
							"section": classes_taken[idx].class_list_id.sect,
							"credits": classes_taken[idx].class_list_id.class_id.credits,
							"grade": classes_taken[idx].grade
						});

					if((idx+1) < classes_taken.length && (curr_semester == classes_taken[idx+1].class_list_id.semester.semester)) {	
						idx++;
					} else {
						break;
					}
				}

				transcriptV1.push(
					{
						"semester": curr_semester,
						"courses": classes_semester										
					}
				);


			}

			console.log(transcriptV1);
			return transcriptV1;
		}

		function generateFinalTranscript(semesters, transcriptV1) {
			var transcriptV2 = [];

			for(var idx = 0; idx < semesters.length; idx++) {
				var curr_semester = semesters[idx].semester;
				transcriptV2.push(semesterPresent(transcriptV1, curr_semester));
			}			

			return transcriptV2;
		}

		function semesterPresent(transcript, semester) {
			for(var idx = 0; idx < transcript.length; idx++) {
				if(semester == transcript[idx].semester) {
					return transcript[idx];
				}				
			}

			return {"semester": semester};
		}

		// $http.get('http://localhost:8080/students/student')
		// 	.then(function(resp){
		// 		self.students = resp.data;
		// 	},function(err) {

		// 	});

		// if(self.id != undefined) {
		// 	$http.get('http://localhost:8080/students/student/'+self.id)
		// 		.then(function(resp){
		// 			self.student = resp.data;

		// 			$http.get("http://localhost:8080/school_years/school_year")
		// 				.then(function(resp) {
		// 					self.semesters = resp.data;	
		// 					self.semesters.selected = self.student.first_semester.id;		
		// 				}, function(err) {
					
		// 				});

		// 			$http.get("http://localhost:8080/majors/major")
		// 				.then(function(resp) {
		// 					self.majors = resp.data;

		// 					if(self.student.major_id == null) {
		// 						self.student.major_id = self.majors[0];
		// 					}

		// 					self.majors.selected = self.student.major_id.id;
		// 				}, function(err) {
						
		// 				});

		// 			},function(err) {

		// 		});

		// }

		// self.clear = function(student) {
		// 	student.first_name = "";
		// 	student.last_name = "";
		// 	student.first_semester = "";
		// 	student.gpa = "";
		// };

		// self.addupdStudent = function(func, id, first_name, last_name, first_semester, gpa, major_id) {
		// 	var student = {};
		// 	student.id = id;
		// 	student.first_name = first_name;
		// 	student.last_name = last_name;
		// 	student.first_semester = self.semesters[first_semester-1];
		// 	student.gpa = gpa;
		// 	student.major_id = self.majors[major_id - 1];
			
		// 	var method = func == 'add' ? 'POST' : 'PUT';
		// 	$http({
		// 			method: method,
		// 			url: 'http://localhost:8080/students/student', 
		// 			data: student
		// 		})
		// 		.then(function(resp){
		// 			console.log('SUCCESS:', resp);
		// 			$location.path('/student');
		// 		},function(err) {
		// 			console.log('FAILURE:', err);
		// 		});
		// };

		// self.addStudent = function(id, first_name, last_name, first_semester, gpa, major_id) {
		// 	self.addupdStudent('add', id, first_name, last_name, first_semester.selected, gpa, major_id.selected);
		// };

		// self.updateStudent = function(id, first_name, last_name, first_semester, gpa, major_id) {
		// 	console.log("Update student with id=", id, " first_name=", first_name, " last_name=", last_name, 
		// 	" first_semester=", first_semester.selected, " gpa=", gpa, " major_id=", major_id.selected);
		// 	self.addupdStudent('upd', id, first_name, last_name, first_semester.selected, gpa, major_id.selected);
		// };

		// self.deleteStudent = function(id) {
		// 	$http.delete('http://localhost:8080/students/student/'+id)
		// 		.then(function(resp){
		// 			console.log("SUCCESS: ", resp);
		// 			$location.path('/student');
		// 		},function(err) {
		// 			console.log('FAILURE:', err);
		// 		});

		// };

		// self.get_first_semester = function(first_semester) {
		// 	if(first_semester == null) {
		// 		return "N/A";
		// 	} else {
		// 		return first_semester.semester;
		// 	}
		// }

		// self.get_major_description = function(major_id) {
		// 	if(major_id == null) {
		// 		return "General Studies";
		// 	} else {
		// 		return major_id.name;
		// 	}
		// }

		// self.format_gpa = function(gpa) {
		// 	return gpa.toFixed(2);
		// }

		
			
		

	
	

;// end all 