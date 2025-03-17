'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

interface Props {
  id: string;
}

export default function CourseDetailPage({ id }: Props) {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <main>
        <h1>Sales Training: Practical Sales Techniques {id}</h1>
        <div className="main-bottom">
          <div className="video-container">
            <video controls>
              <source src="#" />
            </video>
            <div className="description-btn-ul">
              <button className="description-li-btn li-active">Сургалтын талаар</button>
              <button className="description-li-btn">Багшийн талаар</button>
            </div>
            <div className="description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda vitae, vero et
                ipsam id, esse sequi natus quo nesciunt impedit soluta. Laudantium voluptatibus
                aperiam sit nisi ipsam fuga dolorum sunt! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Delectus perferendis quasi, animi aperiam libero ipsa neque
                deleniti voluptatem laboriosam enim illo nam ratione cum consectetur fugit placeat
                quo corporis aliquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Illum voluptate quos qui veritatis et explicabo voluptas ipsum, eveniet facere porro
                amet quibusdam quasi temporibus aliquid rerum eos ex. Excepturi, suscipit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quisquam, amet perspiciatis
                nesciunt, quaerat modi quas sint veniam maiores facere architecto esse, voluptatum
                sit explicabo quod dolorem itaque! Sunt, voluptate laudantium.
              </p>
            </div>
          </div>
          <section className="content-container">
            <h2 className="content-title">Агуулга</h2>
            <a href="" className="content-list-btn content-active">
              <i className="far fa-play-circle"></i>
              <p className="lesson-title">1. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">2. Хичээлийн танилцуулга</p>
              <p className="lesson-time">15:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">3. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">4. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">5. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">6. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">7. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
            <a href="" className="content-list-btn">
              <i className="fas fa-lock"></i>
              <p className="lesson-title">8. Хичээлийн танилцуулга</p>
              <p className="lesson-time">5:03</p>
            </a>
          </section>
        </div>
      </main>
    </Container>
  );
}
