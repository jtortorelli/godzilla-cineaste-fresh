/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function PeoplePage(props: PageProps) {
  return <div>This is the page for People with slug: {props.params.slug}</div>;
}
