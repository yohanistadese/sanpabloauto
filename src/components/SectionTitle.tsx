import React from "react";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  text?: string;
}

export default function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg">{text}</p> : null}
    </div>
  );
}
