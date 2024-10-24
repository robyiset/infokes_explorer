--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-10-24 07:50:26

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

--
-- TOC entry 4840 (class 1262 OID 17153)
-- Name: infokes_explorer; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE infokes_explorer WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';


ALTER DATABASE infokes_explorer OWNER TO postgres;

\connect infokes_explorer

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4841 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 227 (class 1255 OID 17299)
-- Name: sp_manage_directory(character varying, character varying, character varying, character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_manage_directory(IN mdir character varying, IN mname character varying, IN mtype character varying, IN action character varying, IN target character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Validate inputs
    IF mtype IS NULL THEN
        RAISE EXCEPTION 'Type parameter cannot be NULL';
    ELSIF action IS NULL THEN
        RAISE EXCEPTION 'Action parameter cannot be NULL';
    END IF;

    -- Process based on action type
    IF action = 'COPY' THEN
        IF mtype = 'FOLDER' THEN
            IF (SELECT COUNT(*) FROM tbl_directories WHERE directory = target AND name = mname AND type = mtype) > 0 THEN
                RAISE EXCEPTION 'Cannot copy folder with same directory';
            ELSE
                INSERT INTO tbl_directories (directory, name, type) SELECT target || '\\' || mname, name, type 
                FROM tbl_directories 
                WHERE directory like mdir || '%';

                INSERT INTO tbl_directories (directory, name, type) VALUES (target, mname, mtype);
                RAISE NOTICE 'Copy operation for folder completed successfully';
            END IF;

        ELSIF mtype = 'FILE' THEN
            IF (SELECT COUNT(*) FROM tbl_directories WHERE directory = target AND name = mname AND type = mtype) > 0 THEN
                RAISE EXCEPTION 'Cannot copy file with same directory';
            ELSE
                INSERT INTO tbl_directories (directory, name, type) VALUES (target, mname, mtype);
                RAISE NOTICE 'Copy operation for file completed successfully';
            END IF;
        ELSE
            RAISE EXCEPTION 'Invalid type parameter. Please use "FILE" or "FOLDER".';
        END IF;

    ELSIF action = 'CUT' THEN
        IF mtype = 'FOLDER' THEN
            IF (SELECT COUNT(*) FROM tbl_directories WHERE directory = target AND name = mname AND type = mtype) > 0 THEN
                RAISE EXCEPTION 'Cannot cut folder with same directory';
            ELSE
                UPDATE tbl_directories 
                SET directory = target || '\\' || mname
                WHERE directory like mdir || '%';

                -- Also updating the specific entry
                UPDATE tbl_directories
                SET directory = target
                WHERE directory = mdir AND name = mname;

                RAISE NOTICE 'Cut operation for folder completed successfully';
            END IF;

        ELSIF mtype = 'FILE' THEN
            IF (SELECT COUNT(*) FROM tbl_directories WHERE directory = target AND name = mname AND type = mtype) > 0 THEN
                RAISE EXCEPTION 'Cannot cut file with same directory';
            ELSE
                UPDATE tbl_directories
                SET directory = target
                WHERE directory = mdir AND name = mname;

                RAISE NOTICE 'Cut operation for file completed successfully';
            END IF;
        ELSE
            RAISE EXCEPTION 'Invalid type parameter. Please use "FILE" or "FOLDER".';
        END IF;

    ELSIF action = 'DELETE' THEN
        IF mtype = 'FOLDER' THEN
            IF (SELECT COUNT(*) FROM tbl_directories WHERE directory = mdir AND name = mname AND type = mtype) = 0 THEN
                RAISE EXCEPTION 'An error occurred';
            ELSE
                DELETE FROM tbl_directories WHERE directory LIKE mdir || '%';
                DELETE FROM tbl_directories WHERE directory = mdir AND name = mname;

                RAISE NOTICE 'Delete operation for folder completed successfully';
            END IF;

        ELSIF mtype = 'FILE' THEN
            IF (SELECT COUNT(*) FROM tbl_directories WHERE directory = mdir AND name = mname AND type = mtype) = 0 THEN
                RAISE EXCEPTION 'An error occurred';
            ELSE
                DELETE FROM tbl_directories WHERE directory = mdir AND name = mname;

                RAISE NOTICE 'Delete operation for file completed successfully';
            END IF;

        ELSE
            RAISE EXCEPTION 'Invalid type parameter. Please use "FILE" or "FOLDER".';
        END IF;

    ELSE
        RAISE EXCEPTION 'Invalid action parameter. Please use "COPY", "CUT", or "DELETE".';
    END IF;

END;
$$;


ALTER PROCEDURE public.sp_manage_directory(IN mdir character varying, IN mname character varying, IN mtype character varying, IN action character varying, IN target character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17289)
-- Name: tbl_directories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_directories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    directory character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(6) NOT NULL
);


ALTER TABLE public.tbl_directories OWNER TO postgres;

--
-- TOC entry 4834 (class 0 OID 17289)
-- Dependencies: 215
-- Data for Name: tbl_directories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tbl_directories VALUES ('6c79e7f1-324b-45e3-9688-9218bb6cbed4', '', 'Documents', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('40ffc417-6c35-4324-a13d-3e3f19b2fec7', '', 'Pictures', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('a91d738c-a181-473d-86b2-2255cb3d9977', '', 'Musics', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('cca1fe38-b093-4a1f-999f-494e33251b09', '', 'text.txt', 'FILE');
INSERT INTO public.tbl_directories VALUES ('7ebf0453-968a-4b23-8f33-47e1375c5672', '', 'notes.txt', 'FILE');
INSERT INTO public.tbl_directories VALUES ('efc9612b-2653-4077-b584-5ca9b61c98c7', '', 'catetan.txt', 'FILE');
INSERT INTO public.tbl_directories VALUES ('af49785a-c4f4-462b-9be7-7c43aaf2f7aa', '\Documents', 'TUGAS BESAR.docx', 'FILE');
INSERT INTO public.tbl_directories VALUES ('3d28c924-2256-4fca-98b6-f632a3bc9138', '\Documents', 'SKRIPSI.docx', 'FILE');
INSERT INTO public.tbl_directories VALUES ('6f37d338-8a23-4015-a1c6-7fb0d77f6caf', '\Documents', 'Works', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('3998b549-6621-4fd5-9d59-4f2ad884065c', '\Documents', 'Repositories', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('c37a13a0-3056-48ee-9f6b-34643e6a3fe9', '\Documents\Repositories', 'Github', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('1c259711-666a-481b-b511-c1edb1df8e95', '\Documents\Repositories\Github', 'app_test', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('388c20ec-fcfc-4858-b523-3ffb3c953772', '\Documents\Repositories\Github', 'new_project', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('3b48e147-1837-4413-ac33-e4fa7d38f21c', '\Documents\Repositories', 'Gitlab', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('f1e269e0-f165-4324-abea-78b0ed11eafd', '\Documents\Repositories\Gitlab', 'webapp', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('74716960-d513-4f60-8be4-3f5c3a879a4d', '\Pictures', 'Kenangan', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('cc702fef-3c58-4b23-8b38-f086833a2174', '\Pictures', 'Profil', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('2179615e-0c5d-492b-bd52-6577c3eb3e07', '\Pictures', 'Wallpaper', 'FOLDER');
INSERT INTO public.tbl_directories VALUES ('87759acc-12f0-43b8-b88f-1cfbfdaa0d1a', '\Pictures', 'ig.jpg', 'FILE');
INSERT INTO public.tbl_directories VALUES ('8f2e40d1-c6f2-4f7e-b0e9-1432ed09c275', '\Pictures', 'edit.jpg', 'FILE');
INSERT INTO public.tbl_directories VALUES ('4bfe903d-da82-4ccf-95f8-c7c56c86fb00', '\Musics', 'Repositories', 'FOLDER');


--
-- TOC entry 4690 (class 2606 OID 17296)
-- Name: tbl_directories tbl_directories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_directories
    ADD CONSTRAINT tbl_directories_pkey PRIMARY KEY (id);


-- Completed on 2024-10-24 07:50:26

--
-- PostgreSQL database dump complete
--

