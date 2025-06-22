import Link from 'next/link';
import Image from 'next/image';


export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-blue-600">
      <Image src="/images/tiki.png" alt="Tiki Logo" width={100} height={40} />
      Tốt & Nhanh
    </Link>
  );
}