-- PostgreSQL Database Schema for PT Makmur Bersama Gadai (PT MBG)
-- Architecture style: Clean, indexed, and normalized for static-to-semi-dynamic web profile data.

-- 1. Pawn Categories Table (Kategori Barang Gadaian)
CREATE TABLE IF NOT EXISTS pawn_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    estimation_rate VARCHAR(100) NOT NULL, -- e.g., "Taksiran hingga 95% dari nilai pasar"
    icon_path VARCHAR(255) NOT NULL,       -- Path file SVG/PNG atau nama ikon Lucide
    max_loan_duration INT DEFAULT 120,     -- Durasi pinjaman standar dalam hari (contoh: 120 hari)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pawn_categories_slug ON pawn_categories(slug);
CREATE INDEX idx_pawn_categories_active ON pawn_categories(is_active);

-- 2. Pawn Requirements Table (Persyaratan Administrasi & Kelengkapan)
CREATE TABLE IF NOT EXISTS pawn_requirements (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,        -- e.g., "Identitas Diri", "Kelengkapan Unit Emas", "Kelengkapan Unit Elektronik"
    requirement_detail TEXT NOT NULL,       -- e.g., "Kartu Tanda Penduduk (KTP) asli yang masih berlaku"
    is_mandatory BOOLEAN DEFAULT TRUE,      -- TRUE untuk wajib, FALSE untuk opsional pendukung
    description TEXT,                       -- Catatan tambahan atau penjelasan kegunaan syarat
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pawn_requirements_category ON pawn_requirements(category);
CREATE INDEX idx_pawn_requirements_active ON pawn_requirements(is_active);

-- 3. Branch Locations Table (Lokasi Kantor Cabang di Jawa Timur)
CREATE TABLE IF NOT EXISTS branch_locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,      -- e.g., "Cabang Surabaya - Kertajaya"
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,            -- e.g., "Surabaya", "Malang", "Sidoarjo"
    whatsapp_number VARCHAR(20) NOT NULL,   -- WhatsApp API format (misal: "628123456789")
    map_coordinate VARCHAR(100),            -- Latitude & Longitude (e.g., "-7.2756, 112.7583")
    map_link TEXT,                          -- URL Google Maps shareable
    operating_hours VARCHAR(150) NOT NULL DEFAULT 'Senin - Sabtu: 08:00 - 16:00',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_branch_locations_city ON branch_locations(city);
CREATE INDEX idx_branch_locations_active ON branch_locations(is_active);

-- Trigger to update timestamp automatically for PostgreSQL
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pawn_categories_modtime BEFORE UPDATE ON pawn_categories FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_pawn_requirements_modtime BEFORE UPDATE ON pawn_requirements FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_branch_locations_modtime BEFORE UPDATE ON branch_locations FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
