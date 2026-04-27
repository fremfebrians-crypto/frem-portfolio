import AdminHeader from '@/components/admin/AdminHeader';
import ProfileForm from '@/components/admin/ProfileForm';
import { profileService } from '@/services/profile.service';

export default async function AdminProfilePage() {
  const profile = await profileService.getProfile();

  if (!profile) {
    return <div className="card">Profile not found.</div>;
  }

  return (
    <div>
      <AdminHeader title="Profile Settings" description="Update hero photo, CV, and public profile content." />
      <ProfileForm profile={profile} />
    </div>
  );
}
