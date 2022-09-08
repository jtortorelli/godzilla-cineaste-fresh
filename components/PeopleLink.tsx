interface PeopleLinkProps {
  showcased: boolean;
  slug: string;
  displayName: string;
}
export function PeopleLink(props: PeopleLinkProps) {
  const { showcased, slug, displayName } = props;
  return (
    <>
      {showcased ? <a href={`/people/${slug}`}>{displayName}</a> : displayName}
    </>
  );
}
