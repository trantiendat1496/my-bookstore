import Link from 'next/link';

export default function UserIcons() {
  return (
    <div className="flex space-x-4">
      <Link href="/">
        <span className="text-gray-600 hover:text-blue-600">Trang chủ</span>
      </Link>
      <Link href="/account">
        <span className="text-gray-600 hover:text-blue-600">Tài khoản</span>
      </Link>
      <Link href="/carts">
        <span className="text-gray-600 hover:text-blue-600">Giỏ hàng</span>
      </Link>
    </div>
  );
}