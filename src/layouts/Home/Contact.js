import qrcode from 'assets/qrcode.png';
import qrcodePlaceholder from 'assets/qrcode-placeholder.png';
import { Divider } from 'components/Divider';
import { Link } from 'components/Link';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { useWindowSize } from 'hooks';
import { useState } from 'react';
import { classes, media } from 'utils/style';
import styles from './Contact.module.css';

export const Contact = ({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
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
      <Text className={styles.description} data-visible={visible} as="p">
        Wechat：Asgrief
      </Text>
      <Text className={styles.description} data-visible={visible} as="p">
        QQ Channel: MetaHouseDAO
      </Text>
      <Text className={styles.description} data-visible={visible} as="p">
        Twitter: <Link href="https://discord.gg/M7XU59Xx">@metahouseDAO</Link>
      </Text>
      <Text className={styles.description} data-visible={visible} as="p">
        Discord: <Link href='https://discord.gg/M7XU59Xx'>@M7XU59Xx</Link>
      </Text>
    </div>
  );

  const renderPreview = visible => (
    <div className={styles.preview}>
      <div className={styles.model} data-device="laptop" data-visible={visible}>
        <Text className={styles.description} data-visible={visible} as="p">
          Notion: <Link href='https://granite-steel-641.notion.site/MetaHouse-20eb67e1269e4deca26eddbb1f0902b4'>MetaHouse Whitepaper</Link>
        </Text>
        <div className={classes(styles.image)}>
          <Image reveal alt="The MetaHouse." delay={300} src={qrcode} placeholder={qrcodePlaceholder} />
        </div>
      </div>
    </div>
  );

  return (
    <Section
      className={styles.contact}
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
              {!isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(isMobile) && (
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
