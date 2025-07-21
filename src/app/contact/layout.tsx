import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Robert Wang - Full Stack Developer',
  description: 'Get in touch with Robert Wang, an experienced Full Stack Developer. Connect via email, LinkedIn, or explore my professional background and projects.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}