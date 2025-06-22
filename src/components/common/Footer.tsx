export default function Footer() {
  return (
    <footer className="py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
          <div>
            <h3 className="font-bold mb-2">Hỗ trợ khách hàng</h3>
            <p>Hotline: 1900-6035</p>
            <p>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
            <p>Các câu hỏi thường gặp</p>
            <p>Gửi yêu cầu hỗ trợ</p>
            <p>Hướng dẫn đặt hàng</p>
            <p>Phương thức vận chuyển</p>
            <p>Chính sách đổi hàng</p>
            <p>Chính sách hàng nhập khẩu</p>
            <p>Hướng dẫn trả hàng</p>
            <p>Hướng dẫn hoàn trả</p>
            <p>hotro@tiki.vn</p>
            <p>security@tiki.vn</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Về Tiki</h3>
            <p>Giới thiệu Tiki</p>
            <p>Tuyển dụng</p>
            <p>Chính sách bảo mật thanh toán</p>
            <p>Chính sách bảo mật thông tin</p>
            <p>Chính sách giải quyết khiếu nại</p>
            <p>Dịch vụ quảng cáo</p>
            <p>Giới thiệu Tiki Xu</p>
            <p>Tích điểm với Tiki</p>
            <p>Bản quyền doanh nghiệp</p>
            <p>Dịch vụ vận chuyển</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Hợp tác và liên kết</h3>
            <p>Quy chế hoạt động Sàn GDTMDT</p>
            <p>Bản quyền tại Tiki</p>
            <p>Chương trình bói</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Phương thức thanh toán</h3>
            <div className="flex flex-wrap gap-2">
              <img src="https://via.placeholder.com/40?text=Visa" alt="Visa" className="h-10" />
              <img src="https://via.placeholder.com/40?text=Mastercard" alt="Mastercard" className="h-10" />
              <img src="https://via.placeholder.com/40?text=ATM" alt="ATM" className="h-10" />
              <img src="https://via.placeholder.com/40?text=momo" alt="momo" className="h-10" />
              <img src="https://via.placeholder.com/40?text=ZaloPay" alt="ZaloPay" className="h-10" />
              <img src="https://via.placeholder.com/40?text=VNPAY" alt="VNPAY" className="h-10" />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Kết nối với chúng tôi</h3>
            <div className="flex gap-2 mb-2">
              <a href="https://facebook.com" target="_blank">
                <img src="https://via.placeholder.com/24?text=FB" alt="Facebook" className="h-6" />
              </a>
              <a href="https://youtube.com" target="_blank">
                <img src="https://via.placeholder.com/24?text=YT" alt="YouTube" className="h-6" />
              </a>
              <a href="https://zalo.me" target="_blank">
                <img src="https://via.placeholder.com/24?text=ZP" alt="Zalo" className="h-6" />
              </a>
            </div>
            <p>Tải ứng dụng</p>
            <div className="flex gap-2 mt-2">
              <a href="https://apps.apple.com" target="_blank">
                <img src="https://via.placeholder.com/100?text=AppStore" alt="App Store" className="h-8" />
              </a>
              <a href="https://play.google.com" target="_blank">
                <img src="https://via.placeholder.com/100?text=GooglePlay" alt="Google Play" className="h-8" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Công ty TNHH Tiki</p>
          <p>Tòa nhà số 52 đường 9, Quận Tân Bình, TP. HCM</p>
          <p>Giấy CNĐKDN: 0309532909 do Sở KHĐT TP. HCM cấp ngày 06/01/2010</p>
        </div>
      </div>
    </footer>
  );
}