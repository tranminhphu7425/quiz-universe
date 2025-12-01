CREATE TABLE KHACHHANG (
MaKH CHAR(10) PRIMARY KEY NOT NULL,
TenKH VARCHAR(100) NOT NULL,
DiaChi VARCHAR(255) NOT NULL,
SoDienThoai VARCHAR(15) NOT NULL,
Email VARCHAR(100) NOT NULL CHECK (Email LIKE '%@%.%')
);

CREATE TABLE PHONG (
    MaPhong CHAR(10) PRIMARY KEY NOT NULL,
    LoaiPhong VARCHAR(50) NOT NULL,
    GiaPhong DECIMAL(10, 2) NOT NULL CHECK (GiaPhong >= 0),
    TrangThai VARCHAR(20) DEFAULT 'Available' CONSTRAINT nn_trangthai_phong NOT NULL,
     	CHECK (TrangThai IN ('Available', 'Booked', 'Under Maintenance'))
);


CREATE TABLE DICHVU (
    MaDichVu CHAR(10) PRIMARY KEY NOT NULL,
    TenDichVu VARCHAR(100) NOT NULL,
    GiaDichVu DECIMAL(10, 2) NOT NULL CHECK (GiaDichVu >= 0),
    MoTa VARCHAR(200)
);


CREATE TABLE DATPHONG (
    MaDatPhong CHAR(10) PRIMARY KEY NOT NULL,
    MaKH CHAR(10) NOT NULL,
    MaPhong CHAR(10) NOT NULL,
    NgayDat DATE NOT NULL,
    NgayTra DATE NOT NULL,
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH),
    FOREIGN KEY (MaPhong) REFERENCES PHONG(MaPhong)
);




CREATE TABLE HOADON (
    MaHoaDon CHAR(10) PRIMARY KEY NOT NULL,
    MaKH CHAR(10) NOT NULL,
    NgayLap DATE NOT NULL,
    TongTien DECIMAL(10, 2) NOT NULL CHECK (TongTien >= 0),
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH)
);


CREATE TABLE THANHTOAN (
    MaThanhToan CHAR(10) PRIMARY KEY NOT NULL,
    MaHoaDon CHAR(10) NOT NULL,
    SoTien DECIMAL(10, 2) NOT NULL CHECK (SoTien >= 0),
    NgayThanhToan DATE NOT NULL,
    FOREIGN KEY (MaHoaDon) REFERENCES HOADON(MaHoaDon)
);


CREATE TABLE KHUYENMAI (
    MaKM CHAR(10) PRIMARY KEY NOT NULL,
    TenKM VARCHAR(100) NOT NULL,
    PhanTram DECIMAL(5, 2) NOT NULL 
        CHECK (PhanTram BETWEEN 0 AND 100),
    NgayBatDau DATE NOT NULL,
    NgayKetThuc DATE NOT NULL
);


CREATE TABLE DATPHONG_DICHVU (
    MaDatPhong CHAR(10) NOT NULL,
    MaDichVu CHAR(10) NOT NULL,
    SoLuong INT NOT NULL CHECK (SoLuong > 0),
    PRIMARY KEY (MaDatPhong, MaDichVu),
    FOREIGN KEY (MaDatPhong) REFERENCES DATPHONG(MaDatPhong),
    FOREIGN KEY (MaDichVu) REFERENCES DICHVU(MaDichVu)
);


CREATE TABLE HOADON_KHUYENMAI (
    MaHoaDon CHAR(10) NOT NULL,
    MaKM CHAR(10) NOT NULL,
    PRIMARY KEY (MaHoaDon, MaKM),
    FOREIGN KEY (MaHoaDon) REFERENCES HOADON(MaHoaDon),
    FOREIGN KEY (MaKM) REFERENCES KHUYENMAI(MaKM)
);


INSERT INTO KHACHHANG (MaKH, TenKH, DiaChi, SoDienThoai, Email) VALUES ('KH001', 'Nguyen Van A', '123 Nguyen Trai, Hanoi', '0912345678', 'nguyenvana@gmail.com');
INSERT INTO KHACHHANG (MaKH, TenKH, DiaChi, SoDienThoai, Email) VALUES ('KH002', 'Tran Thi B', '456 Le Duan, Hanoi', '0987654321', 'tranthib@yahoo.com');
INSERT INTO KHACHHANG (MaKH, TenKH, DiaChi, SoDienThoai, Email) VALUES ('KH003', 'Le Thi C', '789 Hai Ba Trung, Hanoi', '0922334455', 'lethic@gmail.com');
INSERT INTO KHACHHANG (MaKH, TenKH, DiaChi, SoDienThoai, Email) VALUES ('KH004', 'Pham Minh D', '321 Thanh Xuan, Hanoi', '0933445566', 'phamminhd@outlook.com');
INSERT INTO KHACHHANG (MaKH, TenKH, DiaChi, SoDienThoai, Email) VALUES ('KH005', 'Nguyen Thi E', '654 Bach Mai, Hanoi', '0944556677', 'nguyenthie@hotmail.com');


INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P001', 'Single', 500000, 'Available');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P002', 'Double', 750000, 'Booked');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P003', 'Suite', 1200000, 'Available');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P004', 'Single', 550000, 'Under Maintenance');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P005', 'Double', 800000, 'Available');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P006', 'Suite', 1300000, 'Booked');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P007', 'Single', 600000, 'Available');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P008', 'Double', 700000, 'Under Maintenance');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P009', 'Suite', 1100000, 'Available');
INSERT INTO PHONG (MaPhong, LoaiPhong, GiaPhong, TrangThai) VALUES ('P010', 'Single', 520000, 'Booked');

INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV001', 'Massage', 200000, 'Massage thu gian');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV002', 'Internet', 100000, 'Dich vu internet toc do cao');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV003', 'Bua sang', 150000, 'Bua sang buffet tai khach san');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV004', 'Dich vu giat la', 50000, 'Giat va la ui quan ao');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV005', 'Dich vu dua don', 300000, 'Dich vu dua don san bay');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV006', 'Dich vu phong', 700000, 'Dich vu phuc vu do an tai phong');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV007', 'Ho boi', 200000, 'Su dung ho boi trong khuon vien');  
INSERT INTO DICHVU (MaDichVu, TenDichVu, GiaDichVu, MoTa) VALUES ('DV008', 'Xe dap', 150000, 'Cho thue xe dap trong khu vuc');  


INSERT INTO DATPHONG (MaDatPhong, MaKH, MaPhong, NgayDat, NgayTra) VALUES ('DP001', 'KH001', 'P001', '2024-11-01', '2024-11-03');
INSERT INTO DATPHONG (MaDatPhong, MaKH, MaPhong, NgayDat, NgayTra) VALUES ('DP002', 'KH002', 'P002', '2024-11-05', '2024-11-07');
INSERT INTO DATPHONG (MaDatPhong, MaKH, MaPhong, NgayDat, NgayTra) VALUES ('DP003', 'KH003', 'P003', '2024-11-10', '2024-11-12');
INSERT INTO DATPHONG (MaDatPhong, MaKH, MaPhong, NgayDat, NgayTra) VALUES ('DP004', 'KH004', 'P004', '2024-11-02', '2024-11-04');
INSERT INTO DATPHONG (MaDatPhong, MaKH, MaPhong, NgayDat, NgayTra) VALUES ('DP005', 'KH005', 'P005', '2024-11-06', '2024-11-08');


INSERT INTO HOADON (MaHoaDon, MaKH, NgayLap, TongTien) VALUES ('HD001', 'KH001', '2024-11-03', 1200000);
INSERT INTO HOADON (MaHoaDon, MaKH, NgayLap, TongTien) VALUES ('HD002', 'KH002', '2024-11-07', 1440000);
INSERT INTO HOADON (MaHoaDon, MaKH, NgayLap, TongTien) VALUES ('HD003', 'KH003', '2024-11-12', 2160000);
INSERT INTO HOADON (MaHoaDon, MaKH, NgayLap, TongTien) VALUES ('HD004', 'KH004', '2024-11-04', 1035000);
INSERT INTO HOADON (MaHoaDon, MaKH, NgayLap, TongTien) VALUES ('HD005', 'KH005', '2024-11-08', 1520000);
 


INSERT INTO THANHTOAN (MaThanhToan, MaHoaDon, SoTien, NgayThanhToan) VALUES ('TT001', 'HD001', 1200000, '2024-11-03');
INSERT INTO THANHTOAN (MaThanhToan, MaHoaDon, SoTien, NgayThanhToan) VALUES ('TT002', 'HD002', 1440000, '2024-11-07');
INSERT INTO THANHTOAN (MaThanhToan, MaHoaDon, SoTien, NgayThanhToan) VALUES ('TT003', 'HD003', 2160000, '2024-11-12');
INSERT INTO THANHTOAN (MaThanhToan, MaHoaDon, SoTien, NgayThanhToan) VALUES ('TT004', 'HD004', 1035000, '2024-11-04');
INSERT INTO THANHTOAN (MaThanhToan, MaHoaDon, SoTien, NgayThanhToan) VALUES ('TT005', 'HD005', 1520000, '2024-11-08');


INSERT INTO KHUYENMAI (MaKM, TenKM, PhanTram, NgayBatDau, NgayKetThuc) VALUES ('KM001', 'Khuyen Mai Sinh Nhat', 10, '2024-01-01', '2024-12-31');
INSERT INTO KHUYENMAI (MaKM, TenKM, PhanTram, NgayBatDau, NgayKetThuc) VALUES ('KM002', 'Khuyen Mai Cuoi Nam', 20, '2024-12-01', '2024-12-31');
INSERT INTO KHUYENMAI (MaKM, TenKM, PhanTram, NgayBatDau, NgayKetThuc) VALUES ('KM003', 'Khuyen Mai Tet', 15, '2024-01-10', '2024-01-20');

INSERT INTO DATPHONG_DICHVU (MaDatPhong, MaDichVu, SoLuong) VALUES ('DP001', 'DV001', 1);
INSERT INTO DATPHONG_DICHVU (MaDatPhong, MaDichVu, SoLuong) VALUES ('DP002', 'DV002', 1);
INSERT INTO DATPHONG_DICHVU (MaDatPhong, MaDichVu, SoLuong) VALUES ('DP003', 'DV003', 2);
INSERT INTO DATPHONG_DICHVU (MaDatPhong, MaDichVu, SoLuong) VALUES ('DP004', 'DV004', 1);
INSERT INTO DATPHONG_DICHVU (MaDatPhong, MaDichVu, SoLuong) VALUES ('DP005', 'DV005', 1);


INSERT INTO HOADON_KHUYENMAI (MaHoaDon, MaKM) VALUES ('HD002', 'KM001');
INSERT INTO HOADON_KHUYENMAI (MaHoaDon, MaKM) VALUES ('HD003', 'KM002');
INSERT INTO HOADON_KHUYENMAI (MaHoaDon, MaKM) VALUES ('HD004', 'KM001');
INSERT INTO HOADON_KHUYENMAI (MaHoaDon, MaKM) VALUES ('HD005', 'KM002');

