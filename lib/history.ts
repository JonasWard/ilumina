let navigatedInApp = false;

export const markInAppNavigation = () => {
  navigatedInApp = true;
};

export const canGoBackInApp = () => navigatedInApp;
