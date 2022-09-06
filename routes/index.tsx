/** @jsx h */
/** @jsxFrag Fragment */
import { Head } from "$fresh/runtime.ts";
import { Fragment, h } from "preact";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Godzilla Cineaste</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-6">
          Welcome to The Godzilla Cineaste.
        </p>
        <p>
          <a href="/films">Films</a>
        </p>
        <p>
          <a href="/people">People</a>
        </p>
      </div>
    </>
  );
}
