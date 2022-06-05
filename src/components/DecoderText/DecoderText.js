import { VisuallyHidden } from 'components/VisuallyHidden';
import { useReducedMotion, useSpring } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import { delay } from 'utils/delay';
import { classes } from 'utils/style';
import styles from './DecoderText.module.css';

// prettier-ignore
const glyphs = [
  '安', '风', '八', '沉', '俄',
  '得', '雨', '月', '塘', '顷',
  '广', '不', '秋', '唇', '风',
  '厦', '动', '高', '焦', '定',
  '千', '安', '风', '口', '云',
  '万', '如', '怒', '燥', '墨',
  '间', '山', '号', '呼', '色',
  '大', '何', '卷', '不', '秋',
  '庇', '时', '我', '得', '天',
  '天', '眼', '屋', '归', '漠',
  '下', '前', '上', '来', '向',
  '寒', '突', '三', '倚', '昏',
  '士', '兀', '重', '杖', '黑',
  '俱', '见', '茅', '自', '夜',
  '欢', '此', '江', '叹', '沾',
  '颜', '屋', '郊', '息', '湿',
];

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

function shuffle(content, output, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: CharType.Glyph, value: glyphs[rand] };
    }

    return { type: CharType.Glyph, value: output[index].value };
  });
}

export const DecoderText = memo(
  ({ text, start = true, delay: startDelay = 0, className, ...rest }) => {
    const output = useRef([{ type: CharType.Glyph, value: '' }]);
    const container = useRef();
    const reduceMotion = useReducedMotion();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

    useEffect(() => {
      const containerInstance = container.current;
      const content = text.split('');
      let animation;

      const renderOutput = () => {
        const characterMap = output.current.map(item => {
          return `<span class="${styles[item.type]}">${item.value}</span>`;
        });

        containerInstance.innerHTML = characterMap.join('');
      };

      const unsubscribeSpring = decoderSpring.onChange(value => {
        output.current = shuffle(content, output.current, value);
        renderOutput();
      });

      const startSpring = async () => {
        await delay(startDelay);
        decoderSpring.set(content.length);
      };

      if (start && !animation && !reduceMotion) {
        startSpring();
      }

      if (reduceMotion) {
        output.current = content.map((value, index) => ({
          type: CharType.Value,
          value: content[index],
        }));
        renderOutput();
      }

      return () => {
        unsubscribeSpring?.();
      };
    }, [decoderSpring, reduceMotion, start, startDelay, text]);

    return (
      <span className={classes(styles.text, className)} {...rest}>
        <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
        <span aria-hidden className={styles.content} ref={container} />
      </span>
    );
  }
);
