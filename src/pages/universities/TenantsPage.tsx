// Auto-generated
import { useNavigate } from "react-router-dom";

interface Tenant {
  id: string;
  name: string;
  description: string;
  logo?: string;
}

const TENANTS: Tenant[] = [
  {
    id: "hcmus",
    name: "Đại học Khoa học Tự nhiên",
    description: "Ngân hàng trắc nghiệm cho HCMUS",
    logo: "/tenant-assets/hcmus-logo.png",
  },
  {
    id: "hust",
    name: "Đại học Bách Khoa Hà Nội",
    description: "Ngân hàng trắc nghiệm cho HUST",
    logo: "/tenant-assets/hust-logo.png",
  },
  {
    id: "uet",
    name: "Đại học Công nghệ - ĐHQGHN",
    description: "Ngân hàng trắc nghiệm cho UET",
    logo: "/tenant-assets/uet-logo.png",
  },
];

export default function TenantsPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Chọn trường</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TENANTS.map((t) => (
          <button
            key={t.id}
            onClick={() => navigate(`/${t.id}`)}
            className="group rounded-xl border border-muted/60 bg-card p-4 hover:shadow-sm transition"
          >
            {t.logo && (
              <img
                src={t.logo}
                alt={t.name}
                className="h-12 mb-3 object-contain group-hover:scale-105 transition-transform"
              />
            )}
            <div className="font-semibold text-lg mb-1">{t.name}</div>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
