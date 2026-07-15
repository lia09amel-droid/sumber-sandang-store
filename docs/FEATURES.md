# Fitur Sumber Sandang Store

## 🏪 Website Toko

### Homepage
- Hero banner dengan call-to-action
- Banner promo & diskon
- Produk terbaru
- Produk terlaris
- Kategori produk
- Testimoni pelanggan
- Newsletter subscription
- Footer lengkap

### Katalog Produk
- Grid view produk modern
- Foto produk berkualitas tinggi
- Informasi produk lengkap
- Filter produk (kategori, ukuran, warna, harga)
- Pencarian real-time
- Sort by (trending, terbaru, harga)
- Pagination

### Keranjang Belanja
- Tambah/kurangi jumlah produk
- Hapus produk
- Pilih ukuran & warna
- Subtotal otomatis
- Estimasi ongkos kirim
- Voucher/kode promo
- Total pembayaran real-time

### Checkout
- Form data pelanggan
- Pilihan alamat pengiriman
- Pilihan ekspedisi (JNE, J&T, Pos Indonesia)
- Opsi asuransi pengiriman
- Pilihan metode pembayaran:
  - Transfer bank
  - E-wallet (GCash, OVO, Dana)
  - QRIS
  - Cicilan
- Ringkasan pesanan
- Upload bukti pembayaran

## 👨‍💼 Dashboard Admin

### Kelola Produk
- Tambah produk baru
- Edit produk
- Hapus produk
- Upload foto produk
- Manage varian (ukuran, warna)
- Set harga & diskon
- Bulk actions

### Kelola Kategori
- CRUD kategori
- Upload icon/image kategori
- Organize kategori

### Manajemen Stok
- Lihat stok real-time
- Terima stok barang
- Adjustment stok
- Stok opname
- Set minimum stok alert
- History perubahan stok
- Export stok report

### Kelola Pelanggan
- List pelanggan
- Filter & search pelanggan
- Lihat riwayat pembelian
- Edit data pelanggan

### Kelola Pesanan
- List semua pesanan
- Filter berdasarkan status
- Update status pesanan
- Print invoice
- Print packing label
- Bulk status update
- Export pesanan

### Kelola Promo
- Buat voucher/kode promo
- Set jenis promo (percentage/fixed)
- Set periode promo
- Limit usage per kode
- Lihat statistik promo

### Dashboard Utama
- Overview penjualan harian
- Total revenue
- Total orders
- Total customers
- Total products
- Stok alert
- Order pending

### Laporan & Analytics
- Grafik penjualan (harian, mingguan, bulanan, tahunan)
- Top selling products
- Top categories
- Customer acquisition
- Revenue trend
- Export laporan (PDF, Excel)

## 💰 Sinkronisasi Keuangan

### Dashboard Keuangan
- Real-time revenue tracking
- Total income
- Total expense
- Net profit
- Gross profit
- Cash flow status

### Pencatatan Transaksi
- Setiap order otomatis tercatat sebagai pemasukan
- Input pengeluaran manual
- Kategorisasi transaksi
- Attach dokumen

### Laporan Keuangan
- Laporan harian (pendapatan, pengeluaran, laba)
- Laporan mingguan/bulanan/tahunan
- Breakdown by kategori
- Comparison dengan periode sebelumnya
- Trend analysis

### Google Sheets Sync
- **Automatic Sync** setiap transaksi berhasil
- Sync manual on-demand
- Real-time update ke sheet
- Multiple sheet support:
  - Sheet Penjualan
  - Sheet Keuangan
  - Sheet Stok
  - Sheet Laporan

### Sync Status & History
- Lihat status sync (success/failed)
- Riwayat sync dengan timestamp
- Retry failed sync
- Manual re-sync option

### Reconciliation
- Bank reconciliation
- Payment reconciliation
- Identify discrepancies
- Mark as reconciled

### Export & Report
- Export ke Excel (multiple sheet format)
- Export ke PDF (formatted report)
- Schedule export otomatis
- Email report

## 🎨 UI/UX Features

- Pink Smooth color scheme
- Dark mode & Light mode toggle
- Glassmorphism design
- Smooth animations
- Responsive design (mobile-first)
- Loading states
- Error handling
- Toast notifications
- Modal dialogs
- Skeleton loading

## 📱 Responsiveness

- Mobile (320px - 640px)
- Tablet (641px - 1024px)
- Desktop (1025px+)
- Touch-friendly buttons
- Mobile-optimized navigation

## ⚡ Performance

- Image optimization
- Code splitting
- Lazy loading
- Caching strategy
- SEO optimized
- Accessibility (WCAG 2.1)

## 🔐 Keamanan

- JWT Authentication
- Password hashing (bcryptjs)
- Role-based access control
- CORS enabled
- Rate limiting
- SQL injection prevention
- XSS protection
- HTTPS enforced

## 🔌 Integrasi

### Payment Gateway
- Stripe
- Midtrans
- iPaymu

### Shipping
- Rajaongkir API
- Real-time shipping cost

### Communication
- WhatsApp API (order confirmation)
- Email notifications
- SMS notifications

### Analytics
- Google Analytics
- Hotjar (heatmap)
