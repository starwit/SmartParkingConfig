package de.starwit.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import de.starwit.persistence.entity.PointEntity;

/**
 * Point Repository class
 */
public interface PointRepository extends CustomRepository<PointEntity, Long> {

    @Query("SELECT e FROM PointEntity e WHERE NOT EXISTS (SELECT r FROM e.polygon r)")
    public List<PointEntity> findAllWithoutPolygon();

    @Query("SELECT e FROM PointEntity e WHERE NOT EXISTS (SELECT r FROM e.polygon r WHERE r.id <> ?1)")
    public List<PointEntity> findAllWithoutOtherPolygon(Long id);
}
