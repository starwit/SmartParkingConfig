package de.starwit.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.starwit.persistence.entity.PolygonEntity;
import de.starwit.persistence.repository.PointRepository;
import de.starwit.persistence.repository.PolygonRepository;

/**
 * 
 * Polygon Service class
 *
 */
@Service
public class PolygonService implements ServiceInterface<PolygonEntity, PolygonRepository> {

    @Autowired
    private PolygonRepository polygonRepository;

    @Autowired
    private PointRepository pointRepository;

    @Override
    public PolygonRepository getRepository() {
        return polygonRepository;
    }

    public PolygonEntity saveAndFlush(PolygonEntity polygonEntity) {
        return polygonRepository.saveAndFlush(polygonEntity);
    }

    public void deleteAll(Set<PolygonEntity> entities) {
        for (PolygonEntity polygonEntity : entities) {
            pointRepository.deleteAll(polygonEntity.getPoint());
        }
        polygonRepository.deleteAll(entities);
    }
}
