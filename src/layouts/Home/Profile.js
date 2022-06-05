import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import styles from './Profile.module.css';

const ProfileText = ({ visible }) => (
  <Fragment>
    <div className={styles.column}>
      <Heading className={styles.title} data-visible={visible} level={4}>
        <div aria-hidden className={styles.index}>
          <span className={styles.indexNumber} data-visible={visible}>
            Open Source
          </span>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
        </div>
      </Heading>
      <Text className={styles.description} data-visible={visible} size="l" as="p">
        MetaHouse design and hardware resources will be open and freely published on the web for everyone to use.
      </Text>
    </div>
    <div className={styles.column}>
      <Heading className={styles.title} data-visible={visible} level={4}>
        <div aria-hidden className={styles.index}>
          <span className={styles.indexNumber} data-visible={visible}>
            Sustainability
          </span>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
        </div>
      </Heading>
      <Text className={styles.description} data-visible={visible} size="l" as="p">
        On-demand, local production, reducing waste from garment production as well as shipping.
      </Text>
    </div>
    <div className={styles.column}>
      <Heading className={styles.title} data-visible={visible} level={4}>
        <div aria-hidden className={styles.index}>
          <span className={styles.indexNumber} data-visible={visible}>
            Decentralization
          </span>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
        </div>
      </Heading>
      <Text className={styles.description} data-visible={visible} size="l" as="p">
        MetaHouse believe that decentralization makes the world a better place and more beneficial for every MetaHouse participant.
      </Text>
    </div>
    <div className={styles.column}>
      <Heading className={styles.title} data-visible={visible} level={4}>
        <div aria-hidden className={styles.index}>
          <span className={styles.indexNumber} data-visible={visible}>
            Composability
          </span>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
        </div>
      </Heading>
      <Text className={styles.description} data-visible={visible} size="l" as="p">
        All designs and hardware are combinable for easy interfacing with other hardware facilities.
      </Text>
    </div>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <>
            <div className={styles.content}>
              <ProfileText visible={visible} />
            </div>
          </>
        )}
      </Transition>
    </Section>
  );
};
