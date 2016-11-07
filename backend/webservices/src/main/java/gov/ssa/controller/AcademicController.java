package gov.ssa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import gov.ssa.entity.StudentClassesTaken;
import gov.ssa.service.iface.IAcademicService;

@CrossOrigin
@Controller
public class AcademicController {
	
	@Autowired
	private IAcademicService acService;
	
	@RequestMapping(value= "/academics", method = RequestMethod.GET)
    public ResponseEntity<List<StudentClassesTaken>> getAllClassesTaken() {
        return new ResponseEntity<List<StudentClassesTaken>>(acService.getAllClassesTaken(), HttpStatus.OK);
    }
	
	@RequestMapping(value="/academics/student/{student_id}", method = RequestMethod.GET)
	public ResponseEntity<List<StudentClassesTaken>> getAllClassesForStudent(@PathVariable("student_id") Integer student_id) {
		return new ResponseEntity<List<StudentClassesTaken>>(acService.getAllClassesForStudent(student_id), HttpStatus.OK);
	}
	
	@RequestMapping(value= "/academics/student_semester/{semester}/{student_id}", method = RequestMethod.GET)
    public ResponseEntity<List<StudentClassesTaken>> getClassesForStudentForSemester(
    		@PathVariable("semester") Integer semester,
    		@PathVariable("student_id") Integer student_id) {
        return new ResponseEntity<List<StudentClassesTaken>>(
        		acService.getClassesForStudentForSemester(semester, student_id), HttpStatus.OK);
    }
	
	@RequestMapping(value="/academics/{id}", method = RequestMethod.GET)
	public ResponseEntity<StudentClassesTaken> getStudentClassesTakenById(@PathVariable("id") Integer id) {
		return new ResponseEntity<StudentClassesTaken>(acService.getStudentClassesTakenById(id), HttpStatus.OK);
	}
	
	@RequestMapping(value="/academics", method = RequestMethod.POST)
	public ResponseEntity<Void> addClassTaken(@RequestBody StudentClassesTaken sct) {
		acService.addClassTaken(sct);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/academics", method = RequestMethod.PUT)
	public ResponseEntity<Void> updateClassTaken(@RequestBody StudentClassesTaken sct) {
		acService.updateClassTaken(sct);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/academics/{id}", method = RequestMethod.DELETE) 
	public ResponseEntity<Void> deleteClassList(@PathVariable("id") Integer id) {
		acService.deleteClassTaken(id);
		return new ResponseEntity<Void>(HttpStatus.OK);	
	}
}
