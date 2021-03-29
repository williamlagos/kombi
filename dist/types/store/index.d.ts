declare const configureStore: (preloadedState: any) => import("redux").Store<{}, import("redux").Action<any>> & {
    dispatch: {};
};
export { configureStore };
