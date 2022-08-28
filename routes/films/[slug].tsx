/** @jsx h */
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Fragment, h } from "preact";
import { supabaseClient } from "../../communication/database.ts";
import { Film } from "../../communication/types.ts";

interface FilmPage {
  film: Film;
}

export const handler: Handlers<FilmPage> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const { data } = await supabaseClient().from<Film>("Film").select(
      "releaseDate,slug,title",
    ).eq("slug", slug);
    const [film] = data!;
    return ctx.render({
      film: { ...film, releaseDate: new Date(film.releaseDate) },
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
