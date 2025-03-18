package mn.nomin.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.nomin.demo.dtos.LessonDto;
import mn.nomin.demo.entities.Lesson;
import mn.nomin.demo.services.impl.LessonServiceImpl;

@RequestMapping("/lesson")
@RestController
public class LessonController {
    private final LessonServiceImpl lessonServiceImpl;

    public LessonController(LessonServiceImpl lessonServiceImpl) {
        this.lessonServiceImpl = lessonServiceImpl;
    }

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonServiceImpl.getAllLessons();
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<LessonDto>> getLessonsByCourseId(@PathVariable Long courseId) {
        List<LessonDto> lessons = lessonServiceImpl.getLessonsByCourseId(courseId);
        if (lessons.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(lessons);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        Optional<Lesson> lesson = lessonServiceImpl.getLessonById(id);
        return lesson.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lesson createLesson(@RequestBody Lesson lesson) {
        return lessonServiceImpl.saveLesson(lesson);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson lessonDetails) {
        Optional<Lesson> lessonOptional = lessonServiceImpl.getLessonById(id);
        if (lessonOptional.isPresent()) {
            Lesson lesson = lessonOptional.get();
            lesson.setName(lessonDetails.getName());
            lesson.setVideoUrl(lessonDetails.getVideoUrl());
            lesson.setUserEmail(lessonDetails.getUserEmail());
            lesson.setOrder(lessonDetails.getLessonOrder());
            lesson.setIsFree(lessonDetails.getIsFree());
            lesson.setCourseId(lessonDetails.getCourseId());
            return ResponseEntity.ok(lessonServiceImpl.saveLesson(lesson));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        Optional<Lesson> lesson = lessonServiceImpl.getLessonById(id);
        if (lesson.isPresent()) {
            lessonServiceImpl.deleteLesson(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
