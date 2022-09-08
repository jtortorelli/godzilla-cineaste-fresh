import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabaseClient } from "../../communication/database.ts";
import { Person } from "../../communication/types.ts";

interface PeopleIndex {
  people: Person[];
}

export const handler: Handlers<PeopleIndex> = {
  async GET(_, ctx) {
    const { data } = await supabaseClient().from<Person>("Person").select(
      "displayName,slug",
    )
      .eq("showcased", true)
      .eq("tenant", 1)
      .order("sortName", { ascending: true });
    return ctx.render({ people: data! });
  },
};

export default function PeopleIndex({ data }: PageProps<PeopleIndex>) {
  const { people } = data;
  return (
    <>
      <Head>
        <title>People | The Godzilla Cineaste</title>
      </Head>
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
    </>
  );
}
