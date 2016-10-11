package gov.ssa.dao.iface;

import java.util.List;

import gov.ssa.entity.Class;

public interface IClassDao {
	List<Class> getAllClasses();
	
	List<Class> getClassesByDepartment(int id);
	
	Class getClassById(int id);
	
	void addClass(Class _class);
	
	void updateClass(Class _class);
	
	void deleteClass(int id);
}
