import { type SVGProps } from 'react';

export default function CoeurAILogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.844a7.923 7.923 0 0 0 5.303-2.192A8.002 8.002 0 0 0 20.923 13c0-4.418-3.582-8-8-8s-8 3.582-8 8a8.002 8.002 0 0 0 3.62 6.652A7.923 7.923 0 0 0 12 20.844Z" />
      <path d="M12 13V8" />
      <path d="M12 17h.01" />
    </svg>
  );
}
