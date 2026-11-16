import CollectionPage from '../collection/[slug]/page';

export default function ShopPage() {
  return <CollectionPage params={{ slug: 'all' }} />;
}
