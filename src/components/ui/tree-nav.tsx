"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/components/ui/tree-nav-utils/use-typewriter";

export interface TreeNavItem {
  label: string;
  href: string;
  /** Small pill after the label, e.g. "New". */
  badge?: string;
  /** Icon component if present */
  icon?: React.ComponentType<{ className?: string }>;
  /** Opens in a new tab. */
  external?: boolean;
}

type LinkComponent =
  | "a"
  | React.ComponentType<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; to?: string }
    >;

export interface TreeNavProps {
  items: TreeNavItem[];
  /** href of the current page; the marker and background rest on this row. */
  activeHref?: string;
  /** Slide the marker and background to the hovered row and spring back on leave. */
  followHover?: boolean;
  /** Element used for links, e.g. React Router Link. Defaults to a plain anchor. */
  linkComponent?: LinkComponent;
  onSelect?: (
    item: TreeNavItem,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
  className?: string;
}

const ROW_H = 36;
const MARKER = 7;
/** Horizontal centre of the rail inside the 24px gutter. */
const RAIL_X = 12;

const GLIDE = { type: "spring", visualDuration: 0.22, bounce: 0 } as const;
const FADE = { duration: 0.12, ease: "easeOut" } as const;

export function TreeNav({
  items,
  activeHref,
  followHover = true,
  linkComponent: Link = "a",
  onSelect,
  className,
}: TreeNavProps) {
  const listRef = React.useRef<HTMLUListElement>(null);
  const rowRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const centersRef = React.useRef<number[]>([]);
  const hoveredRef = React.useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const activeIndex = items.findIndex((item) => item.href === activeHref);
  
  const reducedRef = React.useRef(reduced);
  const activeRef = React.useRef(activeIndex);
  React.useLayoutEffect(() => {
    reducedRef.current = reduced;
    activeRef.current = activeIndex;
  });

  const [end, setEnd] = React.useState(0);
  const [measured, setMeasured] = React.useState(false);

  const centerY = useMotionValue(0);
  const visibility = useMotionValue(0);
  const pillY = useTransform(centerY, (v) => v - ROW_H / 2);
  const markerY = useTransform(centerY, (v) => v - MARKER / 2);
  const accentScale = useTransform(centerY, (v) =>
    end > 0 ? Math.min(1, v / end) : 0,
  );

  const moveTo = React.useCallback(
    (index: number | null, immediate = false) => {
      const centers = centersRef.current;
      if (index === null || index < 0 || index >= centers.length) {
        animate(visibility, 0, FADE);
        return;
      }
      const target = centers[index];
      const jump = immediate || reducedRef.current || visibility.get() < 0.05;
      if (jump) centerY.jump(target);
      else animate(centerY, target, GLIDE);
      animate(visibility, 1, FADE);
    },
    [centerY, visibility],
  );

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const next = rowRefs.current
        .slice(0, items.length)
        .map((el) => (el ? el.offsetTop + el.offsetHeight / 2 : 0));
      centersRef.current = next;
      setEnd(next.length > 0 ? next[next.length - 1] : 0);
      setMeasured(true);
      moveTo(hoveredRef.current ?? activeRef.current, true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [items.length, moveTo]);

  React.useEffect(() => {
    if (hoveredRef.current === null) moveTo(activeIndex);
  }, [activeIndex, moveTo]);

  const enter = (index: number) => {
    if (!followHover) return;
    hoveredRef.current = index;
    moveTo(index);
  };
  const leave = () => {
    if (!followHover) return;
    hoveredRef.current = null;
    moveTo(activeRef.current);
  };

  return (
    <ul
      ref={listRef}
      className={cn("relative flex flex-col gap-1 ps-7", className)}
      onPointerLeave={leave}
    >
      {/* Cyber Tree rail with neon emerald/teal gradient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 start-0 w-6"
      >
        {/* Subtle background rail line */}
        <span
          className="absolute top-0 w-px bg-white/10"
          style={{ insetInlineStart: RAIL_X - 0.5, height: end }}
        />
        {/* Terminal dot */}
        <span
          className="absolute size-1.5 rounded-full bg-[#65F58A]/40"
          style={{ insetInlineStart: RAIL_X - 2.5, top: end - 2 }}
        />
        {/* Active glowing accent line */}
        <motion.span
          className="absolute top-0 w-px origin-top bg-gradient-to-b from-[#65F58A] to-[#35E6B5] will-change-transform shadow-[0_0_8px_rgba(101,245,138,0.7)]"
          style={{
            insetInlineStart: RAIL_X - 0.5,
            height: end,
            scaleY: accentScale,
            opacity: visibility,
          }}
        />
        {/* Active diamond marker */}
        <motion.span
          className="absolute top-0 rounded-[1px] bg-gradient-to-r from-[#65F58A] to-[#35E6B5] will-change-transform shadow-[0_0_10px_rgba(101,245,138,0.9)]"
          style={{
            insetInlineStart: RAIL_X - MARKER / 2,
            width: MARKER,
            height: MARKER,
            y: markerY,
            rotate: 45,
            opacity: visibility,
          }}
        />
      </span>

      {/* Shared Frosted Glass Active/Hover Pill */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute end-0 start-6 top-0 rounded-xl bg-white/[0.08] backdrop-blur-md border border-[#65F58A]/30 shadow-[0_0_20px_rgba(101,245,138,0.18)] will-change-transform"
        style={{ height: ROW_H, y: pillY, opacity: visibility }}
      />

      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const Icon = item.icon;
        const linkProps: Record<string, any> = {
          target: item.external ? "_blank" : undefined,
          rel: item.external ? "noreferrer" : undefined,
          "aria-current": isActive ? "page" : undefined,
          onClick: onSelect ? (event: React.MouseEvent<HTMLAnchorElement>) => onSelect(item, event) : undefined,
          onFocus: () => enter(index),
          onBlur: leave,
          className: cn(
            "flex h-9 items-center gap-2.5 rounded-xl px-3 text-xs font-mono antialiased transition-all duration-150 ease-out select-none",
            isActive && !measured && "bg-white/[0.08] border border-[#65F58A]/30 text-white font-bold",
            isActive
              ? "font-bold text-[#65F58A] drop-shadow-[0_0_8px_rgba(101,245,138,0.4)]"
              : "font-medium text-slate-300 hover:text-white"
          ),
        };

        if (typeof Link === "string" || Link === "a") {
          linkProps.href = item.href;
        } else {
          linkProps.to = item.href;
        }

        return (
          <li
            key={item.href}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className="relative"
            onPointerEnter={() => enter(index)}
          >
            <Link {...(linkProps as any)}>
              {Icon && (
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors flex-shrink-0",
                    isActive ? "text-[#65F58A]" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
              )}
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="inline-flex h-[18px] shrink-0 items-center rounded-md bg-[#65F58A]/15 px-1.5 text-[10px] font-mono font-bold leading-none text-[#65F58A] border border-[#65F58A]/30 ml-auto shadow-[0_0_8px_rgba(101,245,138,0.2)]">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default TreeNav;
