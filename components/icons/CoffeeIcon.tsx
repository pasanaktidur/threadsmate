
import React from 'react';

const CoffeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.593.484-1.077 1.078-1.077h.002c.593 0 1.077.484 1.077 1.077v7.587c0 .593-.484 1.077-1.078 1.077h-.002c-.593 0-1.077-.484-1.077-1.077V6.087z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.01V16.32c0 2.22 1.79 4.01 3.999 4.01h.002c2.21 0 3.999-1.79 3.999-4.01V5.01A2.25 2.25 0 0011.25 2.76h-4.5a2.25 2.25 0 00-1.5 2.25z" />
  </svg>
);

export default CoffeeIcon;
