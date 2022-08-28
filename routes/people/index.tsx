/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { supabaseClient } from "../../communication/database.ts";
import { People } from "../../communication/types.ts";

interface PeopleIndex {
  people: People[];
}

export const handler: Handlers<PeopleIndex> = {
  async GET(_, ctx) {
    const { data } = await supabaseClient().from<People>("Person").select(
      "displayName,slug",
    ).limit(10);
    return ctx.render({ people: data! });
  },
};

export default function PeopleIndex({ data }: PageProps<PeopleIndex>) {
  const { people } = data;
  return (
    <div>
      <p>This is the people page</p>
      <ul>
        {people.map((p) => (
          <li>
            <a href={`/people/${p.slug}`}>{p.displayName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
