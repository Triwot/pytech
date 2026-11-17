import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { animate, motion, useReducedMotion, type Variants } from 'motion/react';

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.12,
} as const;

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface TrainTextProps {
  text: string;
  as?: HeadingTag;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  duration?: number;
  trigger?: 'mount' | 'inView';
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '105%',
    x: -10,
  },
  visible: {
    opacity: 1,
    y: '0%',
    x: 0,
  },
};

/**
 * Animates a heading or phrase word-by-word in a sequential train ("trencito")
 * with a clean baseline mask while preserving accessible text for screen readers.
 */
export function TrainText({
  text,
  as = 'h2',
  className = '',
  style,
  delay = 0,
  stagger = 0.055,
  duration = 0.5,
  trigger = 'inView',
}: TrainTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={style}>
        {text}
      </StaticTag>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const triggerProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT_CONFIG };

  return (
    <MotionTag
      aria-label={text}
      className={className}
      style={style}
      variants={containerVariants}
      {...triggerProps}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden align-baseline pb-[0.14em] -mb-[0.14em] px-[0.06em] -mx-[0.06em]">
            <motion.span
              aria-hidden="true"
              className="inline-block will-change-transform"
              variants={wordVariants}
              transition={{ duration, ease: EASE_OUT_EXPO }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  trigger?: 'mount' | 'inView';
}

/**
 * Reusable directional fade-and-slide reveal for eyebrows, body copy, and blocks.
 */
export function RevealBlock({
  children,
  className = '',
  delay = 0,
  duration = 0.45,
  y = 14,
  x = 0,
  trigger = 'inView',
}: RevealBlockProps) {
  const triggerProps =
    trigger === 'mount'
      ? {
          initial: { opacity: 0, y, x },
          animate: { opacity: 1, y: 0, x: 0 },
        }
      : {
          initial: { opacity: 0, y, x },
          whileInView: { opacity: 1, y: 0, x: 0 },
          viewport: VIEWPORT_CONFIG,
        };

  return (
    <motion.div
      className={className}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      {...triggerProps}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedMetricValueProps {
  value: string;
  delay?: number;
}

function parseMetricValue(raw: string): {
  prefix: string;
  target: number;
  suffix: string;
} | null {
  const match = raw.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    target: Number.parseInt(match[2], 10),
    suffix: match[3],
  };
}

/**
 * Counts up numeric KPI strings (e.g. "+42", "98%", "6+ años", "< 24 h")
 * in sync with the sequential metric strip entrance.
 */
export function AnimatedMetricValue({ value, delay = 0 }: AnimatedMetricValueProps) {
  const prefersReducedMotion = useReducedMotion();
  const parsed = parseMetricValue(value);
  const [displayValue, setDisplayValue] = useState<string>(() =>
    prefersReducedMotion || !parsed ? value : `${parsed.prefix}0${parsed.suffix}`,
  );

  useEffect(() => {
    if (prefersReducedMotion || !parsed) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, parsed.target, {
      duration: 0.85,
      delay,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        setDisplayValue(`${parsed.prefix}${Math.round(latest)}${parsed.suffix}`);
      },
    });

    return () => controls.stop();
  }, [value, delay, prefersReducedMotion]);

  return <span>{displayValue}</span>;
}
