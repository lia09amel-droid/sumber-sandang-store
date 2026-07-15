# Google Sheets Sinkronisasi - Dokumentasi Lengkap

## Pendahuluan

Fitur sinkronisasi keuangan otomatis menghubungkan semua transaksi e-commerce langsung ke Google Sheets Anda, memudahkan tracking keuangan dan laporan real-time.

## Setup Google Sheets API

### 1. Buat Google Cloud Project

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru: "Sumber Sandang Store"
3. Enable Google Sheets API:
   - Pilih project
   - Go to APIs & Services > Library
   - Search "Google Sheets API"
   - Click Enable

### 2. Buat Service Account

1. Di APIs & Services > Credentials
2. Create Credentials > Service Account
3. Fill form:
   - Service account name: `sumber-sandang-api`
   - Click Create and Continue
4. Grant role: Editor
5. Click Continue dan Done

### 3. Generate JSON Key

1. Buka Service Account yang dibuat
2. Go to Keys tab
3. Add Key > Create new key > JSON
4. File JSON akan ter-download
5. Copy isi JSON ke file backend `.env`:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
GOOGLE_PROJECT_ID=your-project-id
```

### 4. Setup Google Sheet

1. Buat Google Sheet baru di Google Drive
2. Rename ke "Sumber Sandang - Laporan Keuangan"
3. Copy Sheet ID dari URL:
   - URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
4. Share dengan service account email (Editor access)
5. Copy SHEET_ID ke `.env`:

```env
GOOGLE_SHEET_ID=your-sheet-id-here
```

## Struktur Google Sheets

### Sheet 1: Penjualan (Sales)

Kolom:
- A: Tanggal Transaksi
- B: No. Order
- C: Nama Pelanggan
- D: Email Pelanggan
- E: Item (qty x product)
- F: Subtotal
- G: Tax
- H: Ongkos Kirim
- I: Diskon
- J: Total
- K: Status Pembayaran
- L: Metode Pembayaran
- M: Catatan

### Sheet 2: Keuangan (Financial)

Kolom:
- A: Tanggal
- B: Tipe (Income/Expense)
- C: Kategori (Sales/Cost/Marketing/Other)
- D: Deskripsi
- E: Amount
- F: Sumber (Order ID atau Manual)
- G: Status Sinkronisasi

### Sheet 3: Stok (Stock)

Kolom:
- A: Tanggal
- B: Produk
- C: Kategori
- D: Tipe (In/Out/Adjustment)
- E: Qty
- F: Stok Sebelum
- G: Stok Sesudah
- H: Alasan/Catatan

### Sheet 4: Laporan (Report)

Kolom:
- A: Tanggal
- B: Total Penjualan
- C: Total Pengeluaran
- D: Laba Kotor
- E: Laba Bersih
- F: Arus Kas
- G: Total Stok (value)

## Fitur Sinkronisasi

### 1. Automatic Sync

Setiap transaksi baru akan otomatis tercatat ke Google Sheets:

```typescript
// Trigger saat order berhasil dibuat
onOrderSuccess() {
  syncToGoogleSheets(order);
}
```

### 2. Manual Sync

Admin dapat memicu sinkronisasi manual:

```
Dashboard > Keuangan > Sinkronisasi > Sync Sekarang
```

### 3. Schedule Sync

Sinkronisasi otomatis setiap hari pada jam tertentu:

```env
SYNC_SCHEDULE=0 0 * * * # Setiap jam 12 malam
```

## API Endpoints Sinkronisasi

### Get Sync Status

```
GET /api/admin/sync/status
```

Response:
```json
{
  "lastSync": "2024-01-15T10:30:00Z",
  "totalRecords": 150,
  "syncStatus": "success",
  "message": "Last sync successful"
}
```

### Trigger Manual Sync

```
POST /api/admin/sync/trigger
```

Body:
```json
{
  "type": "sales" // sales, stock, financial, all
}
```

### Get Sync History

```
GET /api/admin/sync/history?limit=20&page=1
```

Response:
```json
{
  "records": [
    {
      "id": "sync-123",
      "type": "sales",
      "status": "success",
      "recordCount": 5,
      "timestamp": "2024-01-15T10:30:00Z",
      "message": "5 records synced successfully"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156
  }
}
```

### Get Sync Errors

```
GET /api/admin/sync/errors
```

Response:
```json
{
  "errors": [
    {
      "id": "error-123",
      "type": "sales",
      "orderId": "order-456",
      "message": "Sheet quota exceeded",
      "timestamp": "2024-01-15T09:30:00Z"
    }
  ]
}
```

## Troubleshooting

### Sync Error: Authentication Failed

```
Error: Invalid service account credentials
```

**Solusi:**
- Verifikasi GOOGLE_SERVICE_ACCOUNT_EMAIL di .env
- Verifikasi GOOGLE_PRIVATE_KEY format (dengan \\n)
- Regenerate JSON key dari Google Cloud

### Sync Error: Sheet Not Found

```
Error: Spreadsheet ID not found
```

**Solusi:**
- Copy SHEET_ID dengan benar dari URL
- Verifikasi sheet sudah di-share dengan service account
- Check permission (Editor access diperlukan)

### Sync Error: Quota Exceeded

```
Error: Quota exceeded for quota metric 'Write requests'
```

**Solusi:**
- Implementasi batching untuk multiple records
- Increase interval antara sync
- Check quota di Google Cloud Console

### Data tidak ter-sync

**Debug:**
1. Check API logs: `tail -f logs/api.log | grep sync`
2. Check sync status: `GET /api/admin/sync/status`
3. Check sync history: `GET /api/admin/sync/history`
4. Trigger manual sync dan lihat error

## Export Data

### Export ke Excel

```
GET /api/admin/export/excel?period=monthly&month=01&year=2024
```

File akan di-generate dengan format:
- sumber-sandang-report-2024-01.xlsx
- Sheet: Sales, Financial, Stock, Report

### Export ke PDF

```
GET /api/admin/export/pdf?period=monthly&month=01&year=2024
```

File akan di-generate dengan format:
- sumber-sandang-report-2024-01.pdf
- Formatted report dengan chart

## Dashboard Keuangan

Akses di: `/admin/dashboard/financial`

Menampilkan:
- Total Revenue (real-time dari Google Sheets)
- Total Expense
- Net Profit
- Gross Profit
- Cash Flow Chart
- Monthly Comparison
- Top Selling Categories
- Export Options

## Backup Data

Setiap sync otomatis backup data:
- Local backup: `/backend/backups/sheets-{timestamp}.json`
- Cloud backup (optional): Google Drive

Restore dari backup:
```
POST /api/admin/backup/restore?id=backup-123
```

## Best Practices

1. **Review data regularly** - Check sync status setiap hari
2. **Backup important data** - Download backup secara berkala
3. **Monitor quota** - Check Google API quota usage
4. **Test integration** - Test sync dengan test order
5. **Document changes** - Catat perubahan sheet structure
6. **Security** - Jangan share API keys, gunakan service account

## Support

Untuk pertanyaan atau issue:
- Check logs: `logs/sync.log`
- Contact developer
- Check [Google Sheets API Docs](https://developers.google.com/sheets/api)
