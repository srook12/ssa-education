package gov.ssa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gov.ssa.dao.iface.IMajorDao;
import gov.ssa.entity.Major;
import gov.ssa.service.iface.IMajorService;

@Service
public class MajorService implements IMajorService {
	@Autowired
	private IMajorDao majorDao;	
	
	@Override
	public List<Major> getAllMajors() {
		return majorDao.getAllMajors();
	}

	@Override
	public Major getMajorById(int majorId) {
		return majorDao.getMajorById(majorId);
	}

	@Override
	public void addMajor(Major major) {
		majorDao.addMajor(major);
	}

	@Override
	public void updateMajor(Major major) {
		majorDao.updateMajor(major);
	}

	@Override
	public void deleteMajor(int majorId) {
		majorDao.deleteMajor(majorId);
	}

}
