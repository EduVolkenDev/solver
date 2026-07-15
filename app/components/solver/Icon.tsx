type IconName =
  | "arrow"
  | "briefcase"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "compass"
  | "door"
  | "globe"
  | "mail"
  | "menu"
  | "message"
  | "pin"
  | "shield"
  | "spark"
  | "student"
  | "train"
  | "user";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h13m-6-6 6 6-6 6" />,
  briefcase: <><rect x="3" y="6.5" width="18" height="13" rx="2" /><path d="M8 6.5V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12h18M10 12v2h4v-2" /></>,
  calendar: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M7 2.5v4M17 2.5v4M3 9h18M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 17h.01M12 17h.01" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
  door: <><path d="M5 21h14M7 21V4.5L17 3v18M12 12h.01" /><path d="M17 7h2v14" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9S9.8 5.4 12 3Z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.7-.8L4 20l1.8-3.4A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
  shield: <path d="M12 3 19 6v5c0 4.8-3 8.1-7 10-4-1.9-7-5.2-7-10V6l7-3Z" />,
  spark: <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />,
  student: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 11.2V16c2.8 2.4 7.2 2.4 10 0v-4.8M21 10v5" /></>,
  train: <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M8 21h8M9 18l-2 3M15 18l2 3M8 8h8M8 13h.01M16 13h.01" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21c.5-4 2.8-6 7-6s6.5 2 7 6" /></>,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        {paths[name]}
      </g>
    </svg>
  );
}

export type { IconName };
