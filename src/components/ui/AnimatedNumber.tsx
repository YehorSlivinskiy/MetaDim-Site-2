"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

export default function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  delay = 0,
}: AnimatedNumberProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <span ref={ref} suppressHydrationWarning>
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={2.2}
          delay={delay}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator=","
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}
