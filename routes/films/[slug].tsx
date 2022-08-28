/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function FilmPage(props: PageProps) {
  return <div>This is the page for Film with slug: {props.params.slug}</div>;
}
