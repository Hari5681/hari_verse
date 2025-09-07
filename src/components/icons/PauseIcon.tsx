
import { SVGProps } from 'react';

export default function PauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h4v16H6z" fill="currentColor" />
      <path d="M14 4h4v16h-4z" fill="currentColor" />
    </svg>
  );
}
