import { MAIN_CONTENT_ID } from "../PageLayout.constants";

export const focusMainContent = () =>
  document.getElementById(MAIN_CONTENT_ID)?.focus({ preventScroll: true });
