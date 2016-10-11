package gov.ssa.service.iface;

import java.util.List;

import gov.ssa.entity.Major;

public interface IMajorService {
	List<Major> getAllMajors();
		
	Major getMajorById(int majorId);
	
	void addMajor(Major major);
	
	void updateMajor(Major major);
	
	void deleteMajor(int majorId);
}
