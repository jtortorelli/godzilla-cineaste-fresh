/** @jsx h */
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Fragment, h } from "preact";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>The Godzilla Cineaste</title>
      </Head>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <p class={tw`my-6`}>
          Welcome to The Godzilla Cineaste.
        </p>
        <p>
          <a href="/films">Films</a>
        </p>
        <p>
          <a href="/people">People</a>
        </p>
      </div>
    </Fragment>
  );
}
