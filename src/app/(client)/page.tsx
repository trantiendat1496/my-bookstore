import BookList from '@/components/book/BookList';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import BookFilter from '@/components/book/BookFilter';
import Header from '@/components/common/Header';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Nhà Sách Tiki - Mua Sách Online Giá Tốt Nhất',
    description: 'Khám phá hàng ngàn đầu sách tại Nhà Sách Tiki với giá ưu đãi, freeship từ 49k. Top sách bán chạy và sách mới sưu tập.',
    keywords: 'sách, nhà sách Tiki, sách online, sách giá tốt, sách bán chạy',
    openGraph: {
      title: 'Nhà Sách Tiki - Mua Sách Online Giá Tốt Nhất',
      description: 'Khám phá hàng ngàn đầu sách tại Nhà Sách Tiki với giá ưu đãi, freeship từ 49k.',
      url: 'https://yourdomain.com',
      images: [
        {
          url: 'https://yourdomain.com/images/tiki-logo.png',
          width: 800,
          height: 600,
          alt: 'Logo Nhà Sách Tiki',
        },
      ],
      siteName: 'Tiki Books',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nhà Sách Tiki - Mua Sách Online Giá Tốt Nhất',
      description: 'Khám phá hàng ngàn đầu sách tại Nhà Sách Tiki với giá ưu đãi, freeship từ 49k.',
      images: ['https://yourdomain.com/images/tiki-logo.png'],
    },
  };
};

export default async function Home() {
  const response = await fetch('http://localhost:8888/books?featured=true', { next: { revalidate: 3600 } });
  const featuredBooks = await response.json() || [];

  return (
    <div className="container mx-auto p-4">
      <Header />

      {/* Section Nhà Sách Tiki */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow mt-4">
        <h2 className="text-2xl font-bold text-tiki-red mb-4">Nhà Sách Tiki</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <div>
              <h3 className="font-semibold">Top Sách Bán Chạy</h3>
              <p className="text-gray-600">Tải về 1980 Books Tại Tiki Trading 5★</p>
            </div>
            <div className="w-1/2 ml-4">
              <Image src="/images/1980-books.jpg" alt="Top Sách Bán Chạy" width={200} height={150} className="object-cover rounded" loading="lazy" />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <div>
              <h3 className="font-semibold">Sách Mới Sưu Tập - Giảm Đến...</h3>
              <p className="text-gray-600">Tải về Alpha Books Official 5★</p>
            </div>
            <div className="w-1/2 ml-4">
              <Image src="/images/new-collection.jpg" alt="Sách Mới" width={200} height={150} className="object-cover rounded" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar và Danh sách sản phẩm */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 pr-4 hidden md:block">
          <h3 className="font-bold mb-2">Khám phá theo danh mục</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/category/art" className="hover:text-tiki-red">Art & Photography</Link></li>
            <li><Link href="/category/biography" className="hover:text-tiki-red">Biographies & Memoirs</Link></li>
            <li><Link href="/category/business" className="hover:text-tiki-red">Business & Economics</Link></li>
            <li><Link href="/category/children" className="hover:text-tiki-red">Children's Books</Link></li>
            <li><Link href="/category/education" className="hover:text-tiki-red">Education & Teaching</Link></li>
            <li><Link href="/category/magazines" className="hover:text-tiki-red">Magazines</Link></li>
            <li><Link href="/category/medical" className="hover:text-tiki-red">Medical Books</Link></li>
            <li><Link href="/category/parenting" className="hover:text-tiki-red">Parenting & Relationships</Link></li>
            <li><Link href="/category/reference" className="hover:text-tiki-red">Reference</Link></li>
            <li><Link href="/category/science" className="hover:text-tiki-red">Science, Technology & Social Sciences</Link></li>
            <li><Link href="/category/travel" className="hover:text-tiki-red">Travel & Holiday</Link></li>
            <li><Link href="/category/cookbooks" className="hover:text-tiki-red">Cookbooks, Food & Wine</Link></li>
          </ul>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="w-full md:w-4/5">
          <BookFilter initialBooks={featuredBooks} />
          <BookList initialBooks={featuredBooks} />
        </div>
      </div>
    </div>
  );
}