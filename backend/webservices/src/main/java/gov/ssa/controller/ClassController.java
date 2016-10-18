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

import gov.ssa.entity.Class;
import gov.ssa.service.iface.IClassService;

@CrossOrigin
@Controller
public class ClassController {
	@Autowired
	private IClassService classService;
	
	@RequestMapping(value="/classes/class", method = RequestMethod.GET)
    public ResponseEntity<List<Class>> getAllClasses() {
        return new ResponseEntity<List<Class>>(classService.getAllClasses(), HttpStatus.OK);
    }
	
	@RequestMapping(value="/classes/class_by_department/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Class>> getClassesByDepartment(@PathVariable("id") Integer id) {
		return new ResponseEntity<List<Class>>(classService.getClassesByDepartment(id), HttpStatus.OK);
	}
	
	//Returns 1 Class based on class id
	@RequestMapping(value="/classes/class/{id}", method = RequestMethod.GET)
	public ResponseEntity<Class> getClassById(@PathVariable("id") Integer id) {
		return new ResponseEntity<Class>(classService.getClassById(id), HttpStatus.OK);
	}
	//**Add** a class - needed for registration purposes
	@RequestMapping(value="/classes/class", method = RequestMethod.POST)
	public ResponseEntity<Void> addClass(@RequestBody Class _class) {
		classService.addClass(_class);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	//**Update** a class - possibly needed for registration puroses
	@RequestMapping(value="/classes/class", method = RequestMethod.PUT)
	public ResponseEntity<Void> updateClass(@RequestBody Class _class) {
		classService.updateClass(_class);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	//Delete a class 
	@RequestMapping(value="/classes/class/{id}", method = RequestMethod.DELETE) 
	public ResponseEntity<Void> deleteClass(@PathVariable("id") Integer id) {
		classService.deleteClass(id);
		return new ResponseEntity<Void>(HttpStatus.OK);	
	}
}
