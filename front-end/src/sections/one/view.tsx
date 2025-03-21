'use client';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useSettingsContext } from 'src/components/settings';

import { Course } from './type';
import SingleCourse from './_components/course';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  const [courses, setCourses] = useState<Course[]>([]);

  const getList = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
          endpoints.course.get_all_course
        }`
      );
      if (res.status === 200 && res.data) {
        setCourses(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <div className="poster">
        <img
          style={{ width: '100%' }}
          src="/assets/home-bg-desktop.jpg"
          srcSet="/assets/home-bg-tablet.jpg 770w,assets/home-bg-mobile.jpg 360w"
          sizes="(max-width: 1000px) 770px, (max-width: 769px) 360px"
          alt=""
        />
        <form className="poster-search-container">
          <label htmlFor="search-input">
            <h3 className="poster-search-title">Ирээдүйгээ гэрэлтүүл</h3>
            <p className="poster-search-alert">
              Бүх сургалтууд 10/29 дуустал 29,900₮ хямдралтай байна
            </p>
            <div className="poster-input-search-container">
              <button type="button" className="poster-icon-btn" aria-label="search-bottom">
                <i className="fas fa-search nav-icon" />
              </button>
              <input
                id="search-input"
                type="text"
                placeholder="Хайх..."
                className="poster-search-input"
              />
            </div>
          </label>
        </form>
      </div>
      <div className="cards-container">
        {courses.length > 0 &&
          courses.map((course) => <SingleCourse key={course.id} course={course} />)}
      </div>
    </Container>
  );
}
