import { Metadata } from 'next';
import Image from 'next/image';
import AddToCartButton from '@/components/book/AddToCartButton';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetch(`http://localhost:8888/books/${params.id}`, { next: { revalidate: 3600 } });
  const book = await response.json();
  return {
    title: `${book?.name || 'Chi tiết sách'} - Nhà Sách Tiki`,
    description: book?.description || 'Chi tiết sản phẩm sách tại Nhà Sách Tiki',
    keywords: `${book?.name || 'sách'}, nhà sách Tiki, sách online, chi tiết sách`,
    openGraph: {
      title: `${book?.name || 'Chi tiết sách'} - Nhà Sách Tiki`,
      description: book?.description || 'Chi tiết sản phẩm sách tại Nhà Sách Tiki',
      // url: `https://yourdomain.com/book/${params.id}`,
      images: [
        {
          url: book?.images[0]?.thumbnail_url || 'https://yourdomain.com/images/placeholder.jpg',
          width: 800,
          height: 600,
          alt: book?.name || 'Hình ảnh sách',
        },
      ],
      siteName: 'Tiki Books',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book?.name || 'Chi tiết sách'} - Nhà Sách Tiki`,
      description: book?.description || 'Chi tiết sản phẩm sách tại Nhà Sách Tiki',
      images: [book?.images[0]?.thumbnail_url || 'https://yourdomain.com/images/placeholder.jpg'],
    },
  };
}

export async function generateStaticParams() {
  const response = await fetch('http://localhost:8888/books', { next: { revalidate: 3600 } });
  const books = await response.json() || [];
  return books.map((book: { id: number }) => ({
    id: book.id.toString(),
  }));
}

export default async function BookDetails({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:8888/books/${params.id}`, { next: { revalidate: 3600 } });
  const book = await response.json();

  if (!book) return <div className="text-center p-4">Không tìm thấy sách</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={book.images[0]?.thumbnail_url || '/images/placeholder.jpg'}
          alt={book.name}
          width={300}
          height={400}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg"
          loading="lazy"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{book.name}</h1>
          <p className="text-gray-600 mt-2">Giá: {book?.price}đ</p>
          <p className="mt-4" dangerouslySetInnerHTML={{ __html: book.description }}/>
          <AddToCartButton bookId={book.id} bookName={book.name} bookPrice={book.price} />
        </div>
      </div>
    </div>
  );
}