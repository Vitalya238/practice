--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Postgres.app)
-- Dumped by pg_dump version 14.12 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: meetups; Type: TABLE; Schema: public; Owner: vitalya
--

CREATE TABLE public.meetups (
    meetup_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    tags text[],
    event_time timestamp with time zone NOT NULL,
    location character varying(255) NOT NULL
);


ALTER TABLE public.meetups OWNER TO vitalya;

--
-- Name: meetups_meetup_id_seq; Type: SEQUENCE; Schema: public; Owner: vitalya
--

CREATE SEQUENCE public.meetups_meetup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meetups_meetup_id_seq OWNER TO vitalya;

--
-- Name: meetups_meetup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vitalya
--

ALTER SEQUENCE public.meetups_meetup_id_seq OWNED BY public.meetups.meetup_id;


--
-- Name: user_meetups; Type: TABLE; Schema: public; Owner: vitalya
--

CREATE TABLE public.user_meetups (
    id integer NOT NULL,
    userid integer NOT NULL,
    meetupid integer NOT NULL
);


ALTER TABLE public.user_meetups OWNER TO vitalya;

--
-- Name: user_meetups_id_seq; Type: SEQUENCE; Schema: public; Owner: vitalya
--

CREATE SEQUENCE public.user_meetups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_meetups_id_seq OWNER TO vitalya;

--
-- Name: user_meetups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vitalya
--

ALTER SEQUENCE public.user_meetups_id_seq OWNED BY public.user_meetups.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: vitalya
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying,
    refresh_token character varying(255)
);


ALTER TABLE public.users OWNER TO vitalya;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: vitalya
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO vitalya;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vitalya
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: meetups meetup_id; Type: DEFAULT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.meetups ALTER COLUMN meetup_id SET DEFAULT nextval('public.meetups_meetup_id_seq'::regclass);


--
-- Name: user_meetups id; Type: DEFAULT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.user_meetups ALTER COLUMN id SET DEFAULT nextval('public.user_meetups_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: meetups_meetup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vitalya
--

SELECT pg_catalog.setval('public.meetups_meetup_id_seq', 8, true);


--
-- Name: user_meetups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vitalya
--

SELECT pg_catalog.setval('public.user_meetups_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vitalya
--

SELECT pg_catalog.setval('public.users_id_seq', 34, true);


--
-- Name: meetups meetups_pkey; Type: CONSTRAINT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_pkey PRIMARY KEY (meetup_id);


--
-- Name: user_meetups user_meetups_pkey; Type: CONSTRAINT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.user_meetups
    ADD CONSTRAINT user_meetups_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: user_meetups user_meetups_meetupid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.user_meetups
    ADD CONSTRAINT user_meetups_meetupid_fkey FOREIGN KEY (meetupid) REFERENCES public.meetups(meetup_id);


--
-- Name: user_meetups user_meetups_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vitalya
--

ALTER TABLE ONLY public.user_meetups
    ADD CONSTRAINT user_meetups_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

