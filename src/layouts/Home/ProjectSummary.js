import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { useWindowSize } from 'hooks';
import { useState } from 'react';
import { classes, media } from 'utils/style';
import styles from './ProjectSummary.module.css';

export const ProjectSummary = ({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const indexText = index < 10 ? `0${index}` : index;

  const renderDetails = visible => (
    <div className={styles.details}>
      <div aria-hidden className={styles.index}>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={!visible}
          collapseDelay={1000}
        />
        <span className={styles.indexNumber} data-visible={visible}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={styles.title}
        data-visible={visible}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className={styles.description} data-visible={visible} as="p">
        {description}
      </Text>
      <div className={styles.button} data-visible={visible}>
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const renderPreview = visible => (
    <div className={styles.preview}>
      <div className={styles.model} data-device="laptop" data-visible={visible}>
        <div className={classes(styles.image)}>
          <Image reveal alt="The MetaHouse." delay={300} {...model} />
        </div>
      </div>
    </div>
  );

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {visible => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
};
