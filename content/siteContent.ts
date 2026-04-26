export type VisualAsset = {
  src: string;
  alt: string;
};

export type StoryStep = {
  id: string;
  title: string;
  description: string;
  stat: string;
  image?: VisualAsset;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type CtaLink = {
  label: string;
  description: string;
  href?: string;
};

export type SiteContent = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    image: VisualAsset;
  };
  problem: {
    title: string;
    description: string;
  };
  process: {
    title: string;
  };
  processSteps: ProcessStep[];
  story: {
    title: string;
    description: string;
  };
  storySteps: StoryStep[];
  results: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    links: CtaLink[];
  };
};

export const siteContent: SiteContent = {
  hero: {
    kicker: "Data-story topic",
    title: "Signals In Motion",
    subtitle:
      "A lean scrollytelling scaffold about how transit reliability shapes a city morning, ready for later sticky visuals and scroll-driven state.",
    image: {
      src: "/images/data-wave.svg",
      alt: "Abstract data streams flowing across a transit map.",
    },
  },
  problem: {
    title: "Commuters experience delays as isolated moments, even though the data shows a larger chain reaction.",
    description:
      "This project frames service reliability as a sequence of connected decisions. The first phase focuses only on clean structure, typed content, and a static export-friendly foundation.",
  },
  process: {
    title: "Each phase narrows the work into a spec-backed slice.",
  },
  processSteps: [
    {
      id: "spec",
      title: "Read the specs first",
      description: "The assignment docs define structure, behavior, accessibility, testing, and deployment before code is added.",
    },
    {
      id: "scaffold",
      title: "Build only the needed scaffold",
      description: "This setup uses App Router, CSS Modules, and typed local content objects without extra runtime complexity.",
    },
    {
      id: "validate",
      title: "Validate before moving phases",
      description: "Lint, tests, and static export output act as the gate before more visual or interaction work lands.",
    },
  ],
  story: {
    title: "Three initial steps outline the story arc.",
    description:
      "The current homepage previews the narrative sections and leaves room for the sticky visual behavior that will arrive in a later phase.",
  },
  storySteps: [
    {
      id: "step-1",
      title: "Rush hour starts with invisible delays",
      description:
        "A single signal slowdown looks minor on its own, but it quietly forces later trains to bunch up before riders see the first crowded platform.",
      stat: "06:42",
      image: {
        src: "/images/data-wave.svg",
        alt: "A stylized chart showing a small delay spreading across multiple routes.",
      },
    },
    {
      id: "step-2",
      title: "Small disruptions cascade across the corridor",
      description:
        "Once a corridor slips below its expected cadence, every platform update becomes less trustworthy and rider decisions become more reactive.",
      stat: "+18%",
      image: {
        src: "/images/data-wave.svg",
        alt: "A corridor diagram with expanding interruption markers.",
      },
    },
    {
      id: "step-3",
      title: "Reliable signals change commuter behavior",
      description:
        "When riders trust the underlying system, they spread out more evenly, platform stress drops, and the same infrastructure produces a smoother trip.",
      stat: "3 outcomes",
    },
  ],
  results: {
    title: "Phase 0 establishes the foundation without skipping future constraints.",
    description:
      "The project now has a typed content layer, reusable components, semantic structure, responsive styles, and export-safe routing that can support richer scrollytelling later.",
  },
  cta: {
    title: "Finish the narrative after the later phases add interactions and deployment details.",
    links: [
      {
        label: "Repository",
        description: "Add the final repository URL once the project is ready for submission.",
      },
      {
        label: "Live site",
        description: "Add the GitHub Pages URL during the deployment phase.",
      },
    ],
  },
};
