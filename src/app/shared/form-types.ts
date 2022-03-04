type FormValue<T> = T | {value:T; disabled: boolean};

export type FormModel<M> = {
  [A in keyof M]: FormModel<M[A]> | FormValue<M[A]> | [ FormValue<M[A]>, any?, any?]
}
