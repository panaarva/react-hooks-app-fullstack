CREATE TABLE public."user"
(
    id           int8        NOT NULL GENERATED ALWAYS AS IDENTITY,
    username     text        NOT NULL,
    userpassword text        NOT NULL,
    email        text        NOT NULL,
    gender       text        NOT NULL,
    bornday      timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT user_pkey PRIMARY KEY (id)
);