export function createInitialsAvatar(name: string) {
  const encodedName = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/initials/png?seed=${encodedName}`;
}
