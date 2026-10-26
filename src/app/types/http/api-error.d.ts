export type ApiError<E extends object> = {
  [C in keyof E]: {
    code: C;
    body: E[C];
  };
}[keyof E];
