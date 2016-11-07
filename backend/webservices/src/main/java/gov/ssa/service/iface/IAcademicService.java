package gov.ssa.service.iface;

import java.util.List;

import gov.ssa.entity.StudentClassesTaken;

public interface IAcademicService {
	List<StudentClassesTaken> getAllClassesTaken();
	
	List<StudentClassesTaken> getAllClassesForStudent(int student_id);
	
	List<StudentClassesTaken> getClassesForStudentForSemester(int semester_id, int student_id);
	
	StudentClassesTaken getStudentClassesTakenById(int id);
	
	void addClassTaken(StudentClassesTaken sct);
	
	void updateClassTaken(StudentClassesTaken sct);
	
	void deleteClassTaken(int id);
}
