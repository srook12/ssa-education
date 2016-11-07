package gov.ssa.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import gov.ssa.dao.iface.IAcademicDao;
import gov.ssa.entity.StudentClassesTaken;

@Transactional
@Repository
public class AcademicDao implements IAcademicDao {

	@Autowired
    private HibernateTemplate hibernateTemplate;

	@SuppressWarnings("unchecked")
	@Override
	public List<StudentClassesTaken> getAllClassesTaken() {
		String hql = "from StudentClassesTaken sct order by sct.id";
		return (List<StudentClassesTaken>) hibernateTemplate.find(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<StudentClassesTaken> getAllClassesForStudent(int student_id) {
		String hql = "from StudentClassesTaken sct where sct.student_id.id = " + student_id + " order by sct.id";
		return (List<StudentClassesTaken>) hibernateTemplate.find(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<StudentClassesTaken> getClassesForStudentForSemester(int semester_id, int student_id) {
		String hql = "from StudentClassesTaken sct where sct.student_id.id = " + student_id + " and sct.class_list_id.semester.id = " + semester_id + " order by sct.id";
		return (List<StudentClassesTaken>) hibernateTemplate.find(hql);
	}

	@Override
	public StudentClassesTaken getStudentClassesTakenById(int id) {
		String hql = "from StudentClassesTaken sct where sct.id = " + id;
		return (StudentClassesTaken) hibernateTemplate.find(hql).get(0);
	}

	@Override
	public void addClassTaken(StudentClassesTaken sct) {
		hibernateTemplate.save(sct);
	}

	@Override
	public void updateClassTaken(StudentClassesTaken sct) {
		hibernateTemplate.update(sct);
	}

	@Override
	public void deleteClassTaken(int id) {
		hibernateTemplate.delete(getStudentClassesTakenById(id));
	}

}
