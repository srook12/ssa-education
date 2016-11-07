package gov.ssa.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import gov.ssa.entity.Prerequisite;
import gov.ssa.dao.iface.IPrerequisiteDao;

@Transactional
@Repository
public class PrerequisiteDao implements IPrerequisiteDao {

	@Autowired
    private HibernateTemplate hibernateTemplate;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Prerequisite> getAllPrerequisites() {
		String hql = "select p.prereq_class_id from Prerequisite p order by p.id";		
		return (List<Prerequisite>) hibernateTemplate.find(hql);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Prerequisite> getPrerequisitesByClass(int id) {
		String hql = "select p.prereq_class_id from Prerequisite p where p.class_id.id = " + id;
		return (List<Prerequisite>) hibernateTemplate.find(hql);
	}
}
