import React from "react";

export const BreakSessionContainer: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="flex flex-col items-center" {...props}>
      {children}
    </div>
  );
};

export const BreakSessionLabel: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = ({ children, ...props }) => {
  return (
    <p className="text-lg text-sky-200" {...props}>
      {children}
    </p>
  );
};

export const BreakSessionTime: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = ({ children, ...props }) => {
  return (
    <p className="text-4xl font-bold text-white" {...props}>
      {children}
    </p>
  );
};

export const PlusMinusButton: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button className="mt-2 text-lg text-sky-800 px-4 py-2 bg-sky-200 rounded" {...props}>
      {children}
    </button>
  );
};

export const PlusMinusButtonContainer: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="grid grid-flow-col gap-2 rounded" {...props}>
      {children}
    </div>
  );
};
