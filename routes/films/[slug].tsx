import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabaseClient } from "../../communication/database.ts";
import { Film, FilmRole, FilmStaff } from "../../communication/types.ts";
import { PeopleLink } from "../../components/PeopleLink.tsx";
import parseMarkdown from "../../utils/markdown_parse.ts";

interface FilmPage {
  film: Film;
  filmStaff: FilmStaff[];
  filmRoles: FilmRole[];
  synopsis: string;
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
        .select("posterUrls,releaseDate,slug,title")
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

    const { renderedBody } = await parseMarkdown(
      `static/content/synopses/${slug}.md`,
    );

    return ctx.render({
      film: { ...film, releaseDate: new Date(film.releaseDate) },
      filmStaff: filmStaffData ?? [],
      filmRoles: filmRoleData ?? [],
      synopsis: renderedBody,
    });
  },
};

export default function FilmPage({ data }: PageProps<FilmPage>) {
  const { film, filmStaff, filmRoles, synopsis } = data;
  return (
    <>
      <Head>
        <title>
          {film.title}{" "}
          ({film.releaseDate.getFullYear()}) | The Godzilla Cineaste
        </title>
      </Head>
      <div>This is the page for Film with slug: {film.slug}</div>
      <div>
        <img
          height="400"
          width="270"
          src={film.posterUrls.find((p) => p.primary)?.url}
        />
      </div>
      <div class="prose" dangerouslySetInnerHTML={{ __html: synopsis }}>
      </div>
      {filmStaff.length > 0 &&
        (
          <div>
            <p>Staff</p>
            <ul>
              {filmStaff.map((staff) => (
                <li>
                  {staff.role}:{" "}
                  {staff.credits.map((credit) => <PeopleLink {...credit} />)}
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
                <img src={role.avatarUrl} />
                {role.name}: <PeopleLink {...role} />{" "}
                {role.uncredited && "(Uncredited)"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
