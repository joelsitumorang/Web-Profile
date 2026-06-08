# Frappe / Antigravity DocType Blueprint: PT Makmur Bersama Gadai (PT MBG)

Dalam ekosistem **Frappe / Antigravity framework**, skema basis data dikelola melalui berkas definisi **DocType** berformat JSON. Ketika DocType ini diunggah atau disinkronkan, Frappe secara otomatis memigrasikan tabel PostgreSQL dan menyediakan panel antarmuka admin (backoffice) untuk CRUD (Create, Read, Update, Delete).

Berikut adalah rancangan konfigurasi DocType untuk tiga entitas utama web profil PT MBG.

---

## 1. DocType: Pawn Category (Kategori Barang Gadaian)
DocType ini menyimpan data kategori barang yang dapat diagunkan.

- **DocType Name:** `Pawn Category`
- **Naming Rule:** `field:slug` (Menggunakan slug unik untuk SEO ramah mesin pencari)

### Daftar Kolom (Fields)
| Fieldname | Label | Type | Options / Length | Properties |
|:---|:---|:---|:---|:---|
| `category_name` | Nama Kategori | Data | 100 | Unique, Req, In List View |
| `slug` | Slug (URL Friendly) | Data | 100 | Unique, Req, In List View |
| `description` | Deskripsi Utama | Small Text | | Req |
| `estimation_rate` | Tingkat Taksiran | Data | 100 | Req (Contoh: "Hingga 95%") |
| `icon_path` | Ikon (Lucide/SVG) | Data | 255 | Req (Contoh: "gem", "smartphone") |
| `max_loan_duration`| Tenor Maksimal (Hari)| Int | | Default: 120 |
| `is_active` | Aktif | Check | | Default: 1, In List View |

### Template JSON (`pawn_category.json`):
```json
{
  "name": "Pawn Category",
  "doctype": "DocType",
  "module": "MBG Pawn",
  "autoname": "field:slug",
  "engine": "InnoDB",
  "field_order": [
    "category_name",
    "slug",
    "description",
    "estimation_rate",
    "icon_path",
    "max_loan_duration",
    "is_active"
  ],
  "fields": [
    {
      "fieldname": "category_name",
      "fieldtype": "Data",
      "label": "Nama Kategori",
      "reqd": 1,
      "unique": 1
    },
    {
      "fieldname": "slug",
      "fieldtype": "Data",
      "label": "Slug",
      "reqd": 1,
      "unique": 1
    },
    {
      "fieldname": "description",
      "fieldtype": "Small Text",
      "label": "Deskripsi Utama",
      "reqd": 1
    },
    {
      "fieldname": "estimation_rate",
      "fieldtype": "Data",
      "label": "Tingkat Taksiran",
      "reqd": 1
    },
    {
      "fieldname": "icon_path",
      "fieldtype": "Data",
      "label": "Ikon (Lucide/SVG)",
      "reqd": 1
    },
    {
      "fieldname": "max_loan_duration",
      "fieldtype": "Int",
      "label": "Tenor Maksimal (Hari)",
      "default": "120"
    },
    {
      "fieldname": "is_active",
      "fieldtype": "Check",
      "label": "Aktif",
      "default": "1"
    }
  ],
  "permissions": [
    {
      "role": "System Manager",
      "read": 1, "write": 1, "create": 1, "delete": 1
    },
    {
      "role": "Guest",
      "read": 1
    }
  ]
}
```

---

## 2. DocType: Pawn Requirement (Persyaratan Administrasi)
DocType untuk prasyarat dokumen hukum konvensional yang wajib diisi nasabah.

- **DocType Name:** `Pawn Requirement`
- **Naming Rule:** `AUTONAME` (e.g., `REQ-.#####`)

### Daftar Kolom (Fields)
| Fieldname | Label | Type | Options / Length | Properties |
|:---|:---|:---|:---|:---|
| `category` | Kategori Dokumen | Select | Identitas Diri<br>Kelengkapan Unit | Req, In List View |
| `requirement_detail`| Rincian Persyaratan | Small Text | | Req, In List View |
| `is_mandatory` | Wajib Dipenuhi | Check | | Default: 1, In List View |
| `description` | Catatan Tambahan | Text | | |
| `is_active` | Aktif | Check | | Default: 1 |

### Template JSON (`pawn_requirement.json`):
```json
{
  "name": "Pawn Requirement",
  "doctype": "DocType",
  "module": "MBG Pawn",
  "autoname": "hash",
  "engine": "InnoDB",
  "field_order": [
    "category",
    "requirement_detail",
    "is_mandatory",
    "description",
    "is_active"
  ],
  "fields": [
    {
      "fieldname": "category",
      "fieldtype": "Select",
      "label": "Kategori Dokumen",
      "options": "Identitas Diri\nKelengkapan Unit\nDokumen Tambahan",
      "reqd": 1
    },
    {
      "fieldname": "requirement_detail",
      "fieldtype": "Small Text",
      "label": "Rincian Persyaratan",
      "reqd": 1
    },
    {
      "fieldname": "is_mandatory",
      "fieldtype": "Check",
      "label": "Wajib Dipenuhi",
      "default": "1"
    },
    {
      "fieldname": "description",
      "fieldtype": "Text",
      "label": "Catatan Tambahan"
    },
    {
      "fieldname": "is_active",
      "fieldtype": "Check",
      "label": "Aktif",
      "default": "1"
    }
  ],
  "permissions": [
    {
      "role": "System Manager",
      "read": 1, "write": 1, "create": 1, "delete": 1
    },
    {
      "role": "Guest",
      "read": 1
    }
  ]
}
```

---

## 3. DocType: Branch Location (Lokasi Cabang Jawa Timur)
DocType untuk memetakan kantor cabang fisik PT MBG yang aktif di Jawa Timur.

- **DocType Name:** `Branch Location`
- **Naming Rule:** `field:branch_name` (Menggunakan nama cabang unik)

### Daftar Kolom (Fields)
| Fieldname | Label | Type | Options / Length | Properties |
|:---|:---|:---|:---|:---|
| `branch_name` | Nama Cabang | Data | 100 | Req, In List View, Unique |
| `address` | Alamat Lengkap | Text | | Req |
| `city` | Kota/Kabupaten | Select | Surabaya<br>Malang<br>Sidoarjo<br>Jember | Req, In List View |
| `whatsapp_number` | No. WhatsApp Cabang | Data | 20 | Req (Format: "628xxx") |
| `map_coordinate` | Koordinat Maps | Data | 100 | Contoh: "-7.2756, 112.7583" |
| `map_link` | Google Maps Link | Small Text | | URL Google Maps Share |
| `operating_hours` | Jam Operasional | Data | 150 | Default: "Senin - Sabtu: 08:00 - 16:00" |
| `is_active` | Aktif | Check | | Default: 1 |

### Template JSON (`branch_location.json`):
```json
{
  "name": "Branch Location",
  "doctype": "DocType",
  "module": "MBG Pawn",
  "autoname": "field:branch_name",
  "engine": "InnoDB",
  "field_order": [
    "branch_name",
    "address",
    "city",
    "whatsapp_number",
    "map_coordinate",
    "map_link",
    "operating_hours",
    "is_active"
  ],
  "fields": [
    {
      "fieldname": "branch_name",
      "fieldtype": "Data",
      "label": "Nama Cabang",
      "reqd": 1,
      "unique": 1
    },
    {
      "fieldname": "address",
      "fieldtype": "Text",
      "label": "Alamat Lengkap",
      "reqd": 1
    },
    {
      "fieldname": "city",
      "fieldtype": "Select",
      "label": "Kota/Kabupaten",
      "options": "Surabaya\nMalang\nSidoarjo\nJember",
      "reqd": 1
    },
    {
      "fieldname": "whatsapp_number",
      "fieldtype": "Data",
      "label": "No. WhatsApp Cabang",
      "reqd": 1
    },
    {
      "fieldname": "map_coordinate",
      "fieldtype": "Data",
      "label": "Koordinat Maps"
    },
    {
      "fieldname": "map_link",
      "fieldtype": "Small Text",
      "label": "Google Maps Link"
    },
    {
      "fieldname": "operating_hours",
      "fieldtype": "Data",
      "label": "Jam Operasional",
      "default": "Senin - Sabtu: 08:00 - 16:00",
      "reqd": 1
    },
    {
      "fieldname": "is_active",
      "fieldtype": "Check",
      "label": "Aktif",
      "default": "1"
    }
  ],
  "permissions": [
    {
      "role": "System Manager",
      "read": 1, "write": 1, "create": 1, "delete": 1
    },
    {
      "role": "Guest",
      "read": 1
    }
  ]
}
```
