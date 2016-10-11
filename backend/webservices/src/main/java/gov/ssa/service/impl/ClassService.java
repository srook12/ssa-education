package gov.ssa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gov.ssa.dao.iface.IClassDao;
import gov.ssa.entity.Class;
import gov.ssa.service.iface.IClassService;

@Service
public class ClassService implements IClassService {
	@Autowired
	private IClassDao classDao;
	
	@Override
	public List<Class> getAllClasses() {
		return classDao.getAllClasses();
	}

	@Override
	public List<Class> getClassesByDepartment(int id) {
		return classDao.getClassesByDepartment(id);
	}
	
	@Override
	public Class getClassById(int id) {
		return classDao.getClassById(id);
	}

	@Override
	public void addClass(Class _class) {
		classDao.addClass(_class);
	}

	@Override
	public void updateClass(Class _class) {
		classDao.updateClass(_class);		
	}

	@Override
	public void deleteClass(int id) {
		classDao.deleteClass(id);		
	}
}
