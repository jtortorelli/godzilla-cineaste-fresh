/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <p class={tw`my-6`}>
        Welcome to The Godzilla Cineaste.
      </p>
      <p>{Deno.env.get("SUPABASE_URL")}</p>
      <p>
        <a href="/films">Films</a>
      </p>
      <p>
        <a href="/people">People</a>
      </p>
    </div>
  );
}
