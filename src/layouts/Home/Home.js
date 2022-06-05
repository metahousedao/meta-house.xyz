
import sprTexture from 'assets/metahouse-m1.jpg';
import sprTexturePlaceholder from 'assets/metahouse-m1-placeholder.jpg';
import sliceTexture from 'assets/metahouse.jpg';
import sliceTexturePlaceholder from 'assets/metahouse-placeholder.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Contact } from 'layouts/Home/Contact';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Architects', 'Designers', 'Collaborators', 'Community', 'Ownership'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const about = useRef();
  const vision = useRef();
  const value = useRef();
  const contact = useRef();

  useEffect(() => {
    const sections = [intro, about, vision, value, contact];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="MetaHouse"
        description="MetaHouse's vision is to create a world where everyone can live in design housing. Everyone will be able to live in a decent home with free access to practical architectural designs and prefabricated modular combinations at cost. We want everyone in the world to be able to get rid of the heavy mortgage and live a meaningful and easy life."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="about"
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        index={1}
        title="Designing the future of house"
        description="MetaHouse is a free open-source house building solution provider, a collaboration of talented architects, designers, and collaborators to create modern living spaces with a contemporary feel. Through aesthetic and rich designs, houses are made into prefabricated, composable modules that allow people anywhere in the world to create a usable, reliable, and aesthetically pleasing home through simple combinations."
        buttonLink="https://s.meta-house.xyz/Vxl94Q"
        model={{
          srcSet: [sprTexture],
          placeholder: sprTexturePlaceholder,
        }}
      />
      <ProjectSummary
        id="vision"
        alternate
        sectionRef={vision}
        visible={visibleSections.includes(vision.current)}
        index={2}
        title="Living a meaningful and easy life"
        description="MetaHouse's vision is to create a world where everyone can live in design housing. Everyone will be able to live in a decent home with free access to practical architectural designs and prefabricated modular combinations at cost. We want everyone in the world to be able to get rid of the heavy mortgage and live a meaningful and easy life."
        buttonLink="https://s.meta-house.xyz/Vxl94Q"
        model={{
          srcSet: [sliceTexture],
          placeholder: sliceTexturePlaceholder,
        }}
      />
      <Profile
        id="value"
        sectionRef={value}
        visible={visibleSections.includes(value.current)}
        index={3}
      />
      <Contact
        id="contact"
        sectionRef={contact}
        visible={visibleSections.includes(contact.current)}
        index={4}
      />
      <Footer />
    </div>
  );
};
