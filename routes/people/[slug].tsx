import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabaseClient } from "../../communication/database.ts";
import { Person } from "../../communication/types.ts";

interface PeoplePage {
  person: Person;
}

export const handler: Handlers<PeoplePage> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const { data } = await supabaseClient().from<Person>("Person").select(
      "displayName,slug",
    ).eq("slug", slug);
    const [person] = data!;
    return ctx.render({ person });
  },
};

export default function PeoplePage({ data }: PageProps<PeoplePage>) {
  const { person } = data;
  return (
    <>
      <Head>
        <title>{person.displayName} | The Godzilla Cineaste</title>
      </Head>
      <div>This is the page for People with slug: {person.slug}</div>
    </>
  );
}
