package mn.nomin.demo.core;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaseService<T> {

    JpaRepository<T, Long> getRepo();
    public T save(T item);
    void delete(Long id);
    T get(Long id);
    List<T> getAll();
    void update(T item);
}
