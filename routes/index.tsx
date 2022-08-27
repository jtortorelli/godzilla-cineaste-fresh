/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <p class={tw`my-6`}>
        Welcome to The Godzilla Cineaste.
      </p>
    </div>
  );
}
