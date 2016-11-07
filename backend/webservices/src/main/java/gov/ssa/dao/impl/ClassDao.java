package gov.ssa.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import gov.ssa.dao.iface.IClassDao;
import gov.ssa.entity.Class;

@Transactional
@Repository
public class ClassDao implements IClassDao {

	@Autowired
    private HibernateTemplate hibernateTemplate;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Class> getAllClasses() {
		String hql = "from Class c order by c.id";		
		return (List<Class>) hibernateTemplate.find(hql);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Class> getClassesByDepartment(int id) {
		String hql = "from Class c where c.department_id=" + id + " order by c.id";
		return (List<Class>) hibernateTemplate.find(hql);
	}

	@Override
	public Class getClassById(int id) {
		String hql = "from Class where id = " + id;
		return (Class) hibernateTemplate.find(hql).get(0);
	}

	@Override
	public void addClass(Class _class) {
		hibernateTemplate.save(new Class(_class.getDepartment_id(),
				                         _class.getNum(),
				                         _class.getName(),
				                         _class.getCredits(),
				                         _class.getDescription()));
	}

	@Override
	public void updateClass(Class _class) {
		hibernateTemplate.update(_class);		
	}

	@Override
	public void deleteClass(int id) {
		hibernateTemplate.delete(getClassById(id));
	}
}
