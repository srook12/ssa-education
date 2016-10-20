package gov.ssa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import gov.ssa.entity.Prerequisite;
import gov.ssa.service.iface.IPrerequisiteService;

@CrossOrigin
@Controller
public class PrerequisiteController {
	
	@Autowired
	private IPrerequisiteService prereqService;
	
	@RequestMapping(value= "/prereqs/prereq", method = RequestMethod.GET)
    public ResponseEntity<List<Prerequisite>> getAllPrerequisites() {
        return new ResponseEntity<List<Prerequisite>>(prereqService.getAllPrerequisites(), HttpStatus.OK);
    }
	
	@RequestMapping(value="/prereqs/prereq/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Prerequisite>> getPrerequisitesByClass(@PathVariable("id") Integer id) {
		return new ResponseEntity<List<Prerequisite>>(prereqService.getPrerequisitesByClass(id), HttpStatus.OK);
	}	
}
