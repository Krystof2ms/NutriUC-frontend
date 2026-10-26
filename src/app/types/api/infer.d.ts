export type JsonBody<R> = R extends {
  content: { 'application/json': infer B };
}
  ? B
  : never;

export type ResponseMap<Op> = Op extends { responses: infer R }
  ? {
      [C in keyof R]: JsonBody<R[C]>;
    }
  : never;

type ErrorResponseMap<R> = {
  [C in keyof R as `${C & (string | number)}` extends `2${string}` ? never : C]: JsonBody<R[C]>;
};
