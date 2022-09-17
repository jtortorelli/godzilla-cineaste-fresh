import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { formatInTimeZone } from "date-fns-tz";
import { supabaseClient } from "../../communication/database.ts";
import {
  FilmKaijuRole,
  FilmRole,
  FilmStaff,
  FilmView,
} from "../../communication/types.ts";
import { PeopleLink } from "../../components/PeopleLink.tsx";
import parseMarkdown from "../../utils/markdown_parse.ts";

interface FilmPage {
  film: FilmView;
  filmStaff: FilmStaff[];
  filmRoles: FilmRole[];
  filmKaijuRoles: FilmKaijuRole[];
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
      { data: filmKaijuRoleData },
    ] = await Promise.all([
      sc
        .from<FilmView>("FilmView")
        .select(
          "aliases,originalTitle,originalWork,posterUrls,releaseDate,runtime,seriesInfo,slug,studios,title",
        )
        .eq("slug", slug),
      sc
        .from<FilmStaff>("FilmStaff")
        .select("*")
        .eq("filmSlug", slug),
      sc
        .from<FilmRole>("FilmRole")
        .select("*")
        .eq("filmSlug", slug),
      sc
        .from<FilmKaijuRole>("FilmKaijuRole")
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
      filmKaijuRoles: filmKaijuRoleData ?? [],
      synopsis: renderedBody,
    });
  },
};

export default function FilmPage({ data }: PageProps<FilmPage>) {
  const { film, filmStaff, filmRoles, filmKaijuRoles, synopsis } = data;
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
        Release Date: {formatInTimeZone(film.releaseDate, "UTC", "d MMM yyyy")}
      </div>
      <div>
        Runtime: {film.runtime}m
      </div>
      <div>
        Produced by: {film.studios.map((studio) => studio)}
      </div>
      <div>
        Aliases:{" "}
        {film.aliases.map((alias) => <div>{alias.title} ({alias.context})
        </div>)}
      </div>
      {film.originalTitle && (
        <div>
          Original Title: {film.originalTitle.original}/{film.originalTitle
            .transliteration}/{film
            .originalTitle.translation}
        </div>
      )}
      {film.originalWork && (
        <div>
          Based on the {film.originalWork.format.toLowerCase()}{" "}
          {film.originalWork.title} by{" "}
          {film.originalWork.authors.map((author) => (
            <PeopleLink {...author} />
          ))}
        </div>
      )}
      {film.seriesInfo && (
        <>
          <div>
            Series name: {film.seriesInfo.seriesName}
          </div>
          <div>
            Series entry no: {film.seriesInfo.entryNumber}
          </div>
          {film.seriesInfo.followedBy && (
            <div>
              Followed by:{" "}
              <a href={`/films/${film.seriesInfo.followedBy.slug}`}>
                {film.seriesInfo.followedBy.title}{" "}
                ({new Date(film.seriesInfo.followedBy.releaseDate)
                  .getFullYear()})
              </a>
            </div>
          )}
          {film.seriesInfo.precededBy && (
            <div>
              Preceded by:{" "}
              <a href={`/films/${film.seriesInfo.precededBy.slug}`}>
                {film.seriesInfo.precededBy.title}{" "}
                ({new Date(film.seriesInfo.precededBy.releaseDate)
                  .getFullYear()})
              </a>
            </div>
          )}
        </>
      )}
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
      {filmKaijuRoles.length > 0 && (
        <div>
          <p>Kaiju</p>
          <ul>
            {filmKaijuRoles.map((role) => (
              <li>
                <img src={role.avatarUrl} />
                {role.kaijuDisplayName}
                {role.credits.map((credit) => (
                  <>
                    <PeopleLink {...credit} /> {credit.qualifiers.join()}
                    {credit.uncredited && "(Uncredited)"}
                  </>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
