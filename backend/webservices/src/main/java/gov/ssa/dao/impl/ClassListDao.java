package gov.ssa.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import gov.ssa.dao.iface.IClassListDao;
import gov.ssa.entity.ClassList;

@Transactional
@Repository
public class ClassListDao implements IClassListDao {

	@Autowired
    private HibernateTemplate hibernateTemplate;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ClassList> getClassList() {
		String hql = "from ClassList cl order by cl.id";
		return (List<ClassList>) hibernateTemplate.find(hql);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ClassList> getClassesBySemester(int semester) {
		String hql = "from ClassList cl where cl.semester = " + semester + " order by cl.id";
		return (List<ClassList>) hibernateTemplate.find(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClassList> getClassListByDepartment(int semester, int id) {
		String hql = "from ClassList cl where cl.class_id.department_id.id = " + id + " and cl.semester = " + semester + " order by cl.id";;
		return (List<ClassList>) hibernateTemplate.find(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClassList> getSectionsOfClass(int semester, int id) {
		String hql = "from ClassList cl where class_id = " + id + " and cl.semester = " + semester + " order by cl.id";;
		return (List<ClassList>) hibernateTemplate.find(hql);
	}

	@Override
	public ClassList getClassListById(int id) {
		String hql = "from ClassList cl where id = " + id;
		return (ClassList) hibernateTemplate.find(hql).get(0);
	}

	@Override
	public void addClassList(ClassList cl) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateClassList(ClassList cl) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteClassList(int id) {
		// TODO Auto-generated method stub
		
	}	
}
