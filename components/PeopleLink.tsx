/** @jsx h */
import { Fragment, h } from "preact";

interface PeopleLinkProps {
  showcased: boolean;
  slug: string;
  displayName: string;
}
export function PeopleLink(props: PeopleLinkProps) {
  const { showcased, slug, displayName } = props;
  return (
    <Fragment>
      {showcased ? <a href={`/people/${slug}`}>{displayName}</a> : displayName}
    </Fragment>
  );
}
