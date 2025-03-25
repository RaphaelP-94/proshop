import ProductList from '@/components/shared/header/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

// Make it async so we can use await; Works because it runs on server side
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};
export default Homepage;
