import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import AdminSidebar from '@/components/admin/AdminSidebar';

const COOKIE_NAME = 'frem_admin_token';

function getSecret() {
  return new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || ''
  );
}

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const secret = getSecret();
    if (secret.length === 0) return false;

    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  // If not authenticated, render children without sidebar (login page)
  if (!authed) {
    return <>{children}</>;
  }

  // Authenticated: show full admin shell with sidebar
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}
