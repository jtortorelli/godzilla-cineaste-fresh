import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Godzilla Cineaste</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-black tracking-wider uppercase">
          Welcome to The Godzilla Cineaste.
        </h1>
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
