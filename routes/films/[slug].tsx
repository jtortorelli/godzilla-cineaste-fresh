/** @jsx h */
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Fragment, h } from "preact";
import { supabaseClient } from "../../communication/database.ts";
import { Film, FilmRole } from "../../communication/types.ts";

interface FilmPage {
  film: Film;
  filmRoles: FilmRole[];
}

export const handler: Handlers<FilmPage> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const sc = supabaseClient();

    const [{ data: filmData }, { data: filmRolesData }] = await Promise.all([
      sc
        .from<Film>("Film")
        .select("releaseDate,slug,title")
        .eq("slug", slug),
      sc
        .from("FilmRoles")
        .select("*")
        .eq("filmSlug", slug),
    ]);

    const [film] = filmData!;

    return ctx.render({
      film: { ...film, releaseDate: new Date(film.releaseDate) },
      filmRoles: filmRolesData!,
    });
  },
};

export default function FilmPage({ data }: PageProps<FilmPage>) {
  const { film } = data;
  return (
    <Fragment>
      <Head>
        <title>
          {film.title}{" "}
          ({film.releaseDate.getFullYear()}) | The Godzilla Cineaste
        </title>
      </Head>
      <div>This is the page for Film with slug: {film.slug}</div>
    </Fragment>
  );
}
