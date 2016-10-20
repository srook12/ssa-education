package gov.ssa.service.iface;

import java.util.List;

import gov.ssa.entity.Prerequisite;

public interface IPrerequisiteService {
	List<Prerequisite> getAllPrerequisites();
	
	List<Prerequisite> getPrerequisitesByClass(int id);
}
