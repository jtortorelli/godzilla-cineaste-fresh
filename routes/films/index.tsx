/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { supabaseClient } from "../../communication/database.ts";
import { Film } from "../../communication/types.ts";

interface FilmsIndex {
  films: Film[];
}

export const handler: Handlers<FilmsIndex> = {
  async GET(_, ctx) {
    const { data } = await supabaseClient().from<Film>("Film").select(
      "slug,title",
    ).limit(10);
    return ctx.render({ films: data! });
  },
};

export default function FilmsIndex({ data }: PageProps<FilmsIndex>) {
  const { films } = data;
  return (
    <div>
      <p>This is the films page</p>
      <ul>
        {films.map((f) => (
          <li>
            <a href={`/films/${f.slug}`}>{f.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
