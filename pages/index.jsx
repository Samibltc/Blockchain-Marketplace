import Head from 'next/head'
import { getProducts } from '@/services/blockchain'
import { Category, Collection } from '@/components'

export default function Home({ productsData }) {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Category />
      <Collection products={productsData} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const productsData = await getProducts()

  return {
    props: {
      productsData: JSON.parse(JSON.stringify(productsData)),
    },
  }
}
