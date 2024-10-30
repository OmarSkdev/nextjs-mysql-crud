import axios from 'axios';
import { Layout } from '../components/Layout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProductCard } from '@/components/ProductCard';

function HomePage({products}) {
  //console.log(products);
  const renderProducts = () => {

    if (products.length === 0) return <h1 className='text-center text-2xl font-bold'>No productos</h1>
    return products.map((product) => ( 
      <ProductCard key={product.id} product={product} />        
    ));
  };
  
  return (
    <Layout>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
        {renderProducts()}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  //console.log(context);
  const { data: products} = await axios.get("http://localhost:3000/api/products");
  //console.log(res.data);
  
  return {
    props: {
      products,
    },
  };
  
}

export default HomePage;
