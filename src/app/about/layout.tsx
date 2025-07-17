import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Robert Wang - Full Stack Developer',
  description: 'Learn more about Robert Wang, an experienced Full Stack Developer specializing in .NET Core, Next.js, React, and cloud-native solutions.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}