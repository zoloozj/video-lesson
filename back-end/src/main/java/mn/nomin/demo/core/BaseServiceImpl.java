package mn.nomin.demo.core;

import java.util.List;

public abstract class BaseServiceImpl<T> implements BaseService<T> {

    public T save(T item) {
        return getRepo().save(item);
    }

    public void delete(Long id) {
        getRepo().deleteById(id);
    }

    public T get(Long id) {
        return getRepo().findById(id).orElse(null);
    }

    public List<T> getAll() {
        return getRepo().findAll();
    }

    public void update(T item) {
        getRepo().save(item);
    }
}
