package gov.ssa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gov.ssa.dao.iface.IAcademicDao;
import gov.ssa.entity.StudentClassesTaken;
import gov.ssa.service.iface.IAcademicService;

@Service
public class AcademicService implements IAcademicService {
	@Autowired
	private IAcademicDao acDao;
	
	@Override
	public List<StudentClassesTaken> getAllClassesTaken() {
		return acDao.getAllClassesTaken();
	}

	@Override
	public List<StudentClassesTaken> getAllClassesForStudent(int student_id) {
		return acDao.getAllClassesForStudent(student_id);
	}

	@Override
	public List<StudentClassesTaken> getClassesForStudentForSemester(int semester_id, int student_id) {
		return acDao.getClassesForStudentForSemester(semester_id, student_id);
	}

	@Override
	public StudentClassesTaken getStudentClassesTakenById(int id) {
		return acDao.getStudentClassesTakenById(id);
	}

	@Override
	public void addClassTaken(StudentClassesTaken sct) {
		acDao.addClassTaken(sct);
	}

	@Override
	public void updateClassTaken(StudentClassesTaken sct) {
		acDao.updateClassTaken(sct);
	}

	@Override
	public void deleteClassTaken(int id) {
		acDao.deleteClassTaken(id);
	}

}
