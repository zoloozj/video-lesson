package mn.nomin.demo.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import mn.nomin.demo.core.BaseServiceImpl;
import mn.nomin.demo.dtos.LessonDto;
import mn.nomin.demo.entities.Course;
import mn.nomin.demo.entities.Lesson;
import mn.nomin.demo.repositories.CourseRepository;
import mn.nomin.demo.repositories.LessonRepository;
import mn.nomin.demo.services.LessonService;

@Service
public class LessonServiceImpl extends BaseServiceImpl<Lesson> implements LessonService {
    public final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    public LessonServiceImpl(LessonRepository lessonRepository, CourseRepository courseRepository) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
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

    public List<LessonDto> getLessonsByCourseId(Long courseId) {
        return lessonRepository.findByCourseId(courseId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private LessonDto convertToDTO(Lesson lesson) {

        LessonDto lessonDTO = new LessonDto();
        lessonDTO.setId(lesson.getId());
        lessonDTO.setName(lesson.getName());
        lessonDTO.setVideoUrl(lesson.getVideoUrl());
        lessonDTO.setUserEmail(lesson.getUserEmail());
        lessonDTO.setLessonOrder(lesson.getLessonOrder());
        lessonDTO.setIsFree(lesson.getIsFree());
        lessonDTO.setCourseId(lesson.getCourseId());
        // Fetch the course name using the courseId
        Optional<Course> course = courseRepository.findById(lesson.getCourseId());
        course.ifPresent(c -> lessonDTO.setCourseName(c.getName()));
        return lessonDTO;
    }
}
