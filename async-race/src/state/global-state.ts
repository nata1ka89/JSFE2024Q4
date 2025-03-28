interface AppState {
  currentView: 'garage' | 'winners';
}

export const appState: AppState = {
  currentView: 'garage',
};

export const setAppState = (newState: Partial<AppState>): void => {
  Object.assign(appState, newState);
};
