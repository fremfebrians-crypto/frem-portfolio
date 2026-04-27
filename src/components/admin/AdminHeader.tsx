export default function AdminHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="admin-header-block">
      <p className="section-kicker">ADMIN</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
