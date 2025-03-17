package mn.nomin.demo.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import mn.nomin.demo.core.BaseServiceImpl;
import mn.nomin.demo.entities.Lesson;
import mn.nomin.demo.repositories.LessonRepository;
import mn.nomin.demo.services.LessonService;

@Service
public class LessonServiceImpl extends BaseServiceImpl<Lesson> implements LessonService {
    public final LessonRepository lessonRepository;

    public LessonServiceImpl(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @Override
    public JpaRepository<Lesson, Long> getRepo() {
        return lessonRepository;
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public Optional<Lesson> getLessonById(Long id) {
        return lessonRepository.findById(id).stream().filter(course -> course.getId().equals(id)).findFirst();
    }

    public Lesson saveLesson(Lesson lesson) {
        lessonRepository.save(lesson);
        return lesson;
    }

    public void deleteLesson(Long id) {
        Optional<Lesson> course = lessonRepository.findById(id);
        course.ifPresent(lessonRepository::delete);
    }
}
