package gov.ssa.service.iface;

import java.util.List;

import gov.ssa.entity.SchoolYear;

public interface ISchoolYearService {
	List<SchoolYear> getAllSchoolYears();
		
	SchoolYear getSchoolYearById(int id);
	
	void addSchoolYear(SchoolYear sy);
	
	void updateSchoolYear(SchoolYear sy);
	
	void deleteSchoolYear(int id);
}
