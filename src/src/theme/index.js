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
    TITLE_BAR: {
      BACKGROUND: COLORS.BLACK,
      TEXT: COLORS.WHITE,
      BORDER: COLORS.DARK_GRAY,
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
      TEXT: COLORS.WHITE,
      BACKGROUND: COLORS.GRAY,
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
  },
  [ThemeType.LIGHT]: {
    TITLE_BAR: {
      BACKGROUND: COLORS.WHITE,
      TEXT: COLORS.BLACK,
    },
    BACKDROP: {
      BACKGROUND: "",
    },
    SCREEN: {
      BACKGROUND: COLORS.WHITE,
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
    },
  },
};

export default Theme;
