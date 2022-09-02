/** @jsx h */
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Fragment, h } from "preact";
import { supabaseClient } from "../../communication/database.ts";
import { Film, FilmStaff } from "../../communication/types.ts";

interface FilmPage {
  film: Film;
  filmStaff: FilmStaff[];
}

export const handler: Handlers<FilmPage> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const sc = supabaseClient();

    const [{ data: filmData }, { data: filmStaffData }] = await Promise.all([
      sc
        .from<Film>("Film")
        .select("releaseDate,slug,title")
        .eq("slug", slug),
      sc
        .from("FilmStaff")
        .select("*")
        .eq("filmSlug", slug),
    ]);

    const film = (filmData ?? [])[0];

    return ctx.render({
      film: { ...film, releaseDate: new Date(film.releaseDate) },
      filmStaff: filmStaffData ?? [],
    });
  },
};

export default function FilmPage({ data }: PageProps<FilmPage>) {
  const { film, filmStaff } = data;
  return (
    <Fragment>
      <Head>
        <title>
          {film.title}{" "}
          ({film.releaseDate.getFullYear()}) | The Godzilla Cineaste
        </title>
      </Head>
      <div>This is the page for Film with slug: {film.slug}</div>
      <div>
        <p>Staff</p>
        <ul>
          {filmStaff.map((staff) => (
            <li>
              {staff.role}: {staff.credits.map((c) => c.displayName).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
