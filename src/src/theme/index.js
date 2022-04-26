import { KeyState } from "../constants";

const COLORS = {
  ERROR: "#640E27",
  WHITE: "#FFFFFF",
  SUCCESS: "#207567",
  WARNING: "#FFBA01",
  GRAY: "#4F4F4F",
  BLACK: "#000000",
  LIGHT_GRAY: "#D2D2D2",
  DARK_GRAY: "#2A2A2A",
  TRANSPARENT: "transparent",
};

export const ThemeType = {
  DARK: "DARK",
  LIGHT: "LIGHT",
};

const Theme = {
  [ThemeType.DARK]: {
    GLOBAL: {
      BACKGROUND: COLORS.BLACK,
    },
    TITLE_BAR: {
      BACKGROUND: COLORS.BLACK,
      TEXT: COLORS.WHITE,
      BORDER: COLORS.DARK_GRAY,
    },
    SIDE_BAR: {
      BACKGROUND: COLORS.BLACK,
      TEXT: COLORS.WHITE,
      FOOTER: {
        TEXT: COLORS.LIGHT_GRAY,
        BORDER: COLORS.GRAY,
      },
    },
    BACKDROP: {
      BACKGROUND: COLORS.BLACK,
    },
    SCREEN: {
      BACKGROUND: COLORS.BLACK,
    },
    LABEL: {
      TEXT: COLORS.WHITE,
    },
    INPUT: {
      BORDER: COLORS.DARK_GRAY,
      TEXT: COLORS.WHITE,
      BACKGROUND: COLORS.TRANSPARENT,
    },
    ERROR: {
      BACKGROUND: COLORS.ERROR,
      TEXT: COLORS.WHITE,
    },
    NUMBER_PICKER: {
      TEXT: COLORS.WHITE,
      BUTTON: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.GRAY,
      },
    },
    BUTTON: {
      DEFAULT: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.GRAY,
      },
      SUCCESS: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.SUCCESS,
      },
      ERROR: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.ERROR,
      },
      SPINNER: COLORS.WHITE,
    },
    KEYS: {
      BACKGROUND: {
        [KeyState.ABSENT]: COLORS.ERROR,
        [KeyState.MISPLACED]: COLORS.WARNING,
        [KeyState.PLACED]: COLORS.SUCCESS,
        [KeyState.UNVERIFIED]: COLORS.BLACK,
      },
      TEXT: {
        [KeyState.ABSENT]: COLORS.WHITE,
        [KeyState.MISPLACED]: COLORS.WHITE,
        [KeyState.PLACED]: COLORS.WHITE,
        [KeyState.UNVERIFIED]: COLORS.WHITE,
      },
      BORDER: {
        [KeyState.ABSENT]: COLORS.ERROR,
        [KeyState.MISPLACED]: COLORS.WARNING,
        [KeyState.PLACED]: COLORS.SUCCESS,
        [KeyState.UNVERIFIED]: COLORS.GRAY,
      },
    },
    MODAL: {
      BACKGROUND: COLORS.DARK_GRAY,
      TEXT: COLORS.WHITE,
    },
    CHART: {
      BACKGROUND: {
        [KeyState.ABSENT]: COLORS.ERROR,
        [KeyState.MISPLACED]: COLORS.WARNING,
        [KeyState.PLACED]: COLORS.SUCCESS,
      },
      TEXT: COLORS.WHITE,
    },
    TOAST: {
      PROGRESS: {
        SUCCESS: COLORS.SUCCESS,
        ERROR: COLORS.ERROR,
      },
    },
    LOADER: {
      SPINNER: COLORS.WHITE,
      BACKGROUND: COLORS.BLACK,
      TEXT: COLORS.WHITE,
    },
    TOGGLE_BUTTON: COLORS.WHITE,
  },
  [ThemeType.LIGHT]: {
    GLOBAL: {
      BACKGROUND: COLORS.WHITE,
    },
    TITLE_BAR: {
      BACKGROUND: COLORS.WHITE,
      TEXT: COLORS.BLACK,
      BORDER: COLORS.DARK_GRAY,
    },
    SIDE_BAR: {
      BACKGROUND: COLORS.WHITE,
      TEXT: COLORS.BLACK,
      FOOTER: {
        TEXT: COLORS.DARK_GRAY,
        BORDER: COLORS.GRAY,
      },
    },
    BACKDROP: {
      BACKGROUND: COLORS.WHITE,
    },
    SCREEN: {
      BACKGROUND: COLORS.WHITE,
    },
    LABEL: {
      TEXT: COLORS.BLACK,
    },
    INPUT: {
      BORDER: COLORS.DARK_GRAY,
      TEXT: COLORS.BLACK,
      BACKGROUND: COLORS.TRANSPARENT,
    },
    ERROR: {
      BACKGROUND: COLORS.ERROR,
      TEXT: COLORS.BLACK,
    },
    NUMBER_PICKER: {
      TEXT: COLORS.BLACK,
      BUTTON: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.BLACK,
      },
    },
    BUTTON: {
      DEFAULT: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.BLACK,
      },
      SUCCESS: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.SUCCESS,
      },
      ERROR: {
        TEXT: COLORS.WHITE,
        BACKGROUND: COLORS.ERROR,
      },
      SPINNER: COLORS.WHITE,
    },
    KEYS: {
      BACKGROUND: {
        [KeyState.ABSENT]: COLORS.ERROR,
        [KeyState.MISPLACED]: COLORS.WARNING,
        [KeyState.PLACED]: COLORS.SUCCESS,
        [KeyState.UNVERIFIED]: COLORS.WHITE,
      },
      TEXT: {
        [KeyState.ABSENT]: COLORS.WHITE,
        [KeyState.MISPLACED]: COLORS.WHITE,
        [KeyState.PLACED]: COLORS.WHITE,
        [KeyState.UNVERIFIED]: COLORS.BLACK,
      },
      BORDER: {
        [KeyState.ABSENT]: COLORS.ERROR,
        [KeyState.MISPLACED]: COLORS.WARNING,
        [KeyState.PLACED]: COLORS.SUCCESS,
        [KeyState.UNVERIFIED]: COLORS.GRAY,
      },
    },
    MODAL: {
      BACKGROUND: COLORS.WHITE,
      TEXT: COLORS.BLACK,
    },
    CHART: {
      BACKGROUND: {
        [KeyState.ABSENT]: COLORS.ERROR,
        [KeyState.MISPLACED]: COLORS.WARNING,
        [KeyState.PLACED]: COLORS.SUCCESS,
      },
      TEXT: COLORS.WHITE,
    },
    TOAST: {
      PROGRESS: {
        SUCCESS: COLORS.SUCCESS,
        ERROR: COLORS.ERROR,
      },
    },
    LOADER: {
      SPINNER: COLORS.BLACK,
      BACKGROUND: COLORS.WHITE,
      TEXT: COLORS.BLACK,
    },
    TOGGLE_BUTTON: COLORS.GRAY,
  },
};

export default Theme;
