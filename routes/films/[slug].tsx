/** @jsx h */
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Fragment, h } from "preact";
import { supabaseClient } from "../../communication/database.ts";
import { Film, FilmRole, FilmStaff } from "../../communication/types.ts";

interface FilmPage {
  film: Film;
  filmStaff: FilmStaff[];
  filmRoles: FilmRole[];
}

export const handler: Handlers<FilmPage> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const sc = supabaseClient();

    const [
      { data: filmData },
      { data: filmStaffData },
      { data: filmRoleData },
    ] = await Promise.all([
      sc
        .from<Film>("Film")
        .select("releaseDate,slug,title")
        .eq("slug", slug),
      sc
        .from<FilmStaff>("FilmStaff")
        .select("*")
        .eq("filmSlug", slug),
      sc
        .from<FilmRole>("FilmRole")
        .select("*")
        .eq("filmSlug", slug),
    ]);

    const film = (filmData ?? [])[0];

    return ctx.render({
      film: { ...film, releaseDate: new Date(film.releaseDate) },
      filmStaff: filmStaffData ?? [],
      filmRoles: filmRoleData ?? [],
    });
  },
};

export default function FilmPage({ data }: PageProps<FilmPage>) {
  const { film, filmStaff, filmRoles } = data;
  return (
    <Fragment>
      <Head>
        <title>
          {film.title}{" "}
          ({film.releaseDate.getFullYear()}) | The Godzilla Cineaste
        </title>
      </Head>
      <div>This is the page for Film with slug: {film.slug}</div>
      {filmStaff.length > 0 &&
        (
          <div>
            <p>Staff</p>
            <ul>
              {filmStaff.map((staff) => (
                <li>
                  {staff.role}:{" "}
                  {staff.credits.map((c) => c.displayName).join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}
      {filmRoles.length > 0 && (
        <div>
          <p>Cast</p>
          <ul>
            {filmRoles.map((role) => (
              <li>
                {role.name}: {role.displayName}{" "}
                {role.uncredited && "(Uncredited)"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
}
