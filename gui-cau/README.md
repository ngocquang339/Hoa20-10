# Gửi Hoa — 20.10

Thiệp hoạt hình chúc 20/10 bằng React + Vite, thuần frontend, không cần backend. Chín cảnh tự chạy ngay khi mở, tổng thời lượng 114 giây, rồi tự lặp lại. Không cần nhấn nút hoặc cuộn trang.

## Chạy tại máy

```sh
npm install
npm run dev
```

## Build để đưa lên hosting tĩnh

```sh
npm run build
```

Upload thư mục `dist` lên hosting tĩnh. `npm run preview` để xem bản build.

## Cá nhân hóa

- Sửa mảng `scenes` trong `src.jsx` để thay lời chúc và thời lượng `duration` của từng cảnh.
- `style.css` điều khiển màu sắc, đôi mắt neon, hoa SVG và hiệu ứng.
- Đôi mắt vuông tự chớp, nháy và cười; nền có cánh hoa, sao băng, ánh sáng, hoa đung đưa, bướm, trái tim bay và pháo hoa. Lá thư tự hiện thành một cảnh trong chuỗi.
- Nhạc nằm tại `public/nhac-nen.mp3`. Nút Bật nhạc / Tắt nhạc ở góc màn hình phát nhạc lặp lại với âm lượng 45%. Người xem cần nhấn một lần để bật nhạc; chuỗi hoạt cảnh vẫn tự chạy độc lập. Tắt rồi bật lại sẽ tiếp tục từ vị trí đang nghe.
- Escape tạm dừng / tiếp tục nếu cần. Khi chuyển tab, thời gian và hoạt ảnh được tạm dừng cùng nhau.
- Chế độ giảm chuyển động giảm các chuyển động nền lớn, vẫn giữ mắt chớp và hạt bay theo yêu cầu. Font Google có font hệ thống dự phòng.

Các minh họa được vẽ bằng SVG/CSS, lấy cảm hứng từ ảnh tham khảo, không sử dụng ảnh chụp màn hình làm nền.

- Cảnh ảnh xuất hiện sau 4 cảnh đầu (giây 39–61). Bốn ảnh nằm trong public/photos; sửa mảng memories trong src.jsx để đổi lời chúc. Máy tính hiển thị một hàng 4 ảnh; điện thoại hiển thị lưới 2 hàng × 2 ảnh, không cần vuốt ngang. Màn hình thấp có thể cuộn dọc để đọc hết nội dung.
