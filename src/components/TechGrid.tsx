'use client';

import { Link } from 'react-router-dom';
import type { technologiesData } from '@/data/technologiesData';

type TechItem = typeof technologiesData[number];

interface Props {
  grouped: Record<string, TechItem[]>;
}

export default function TechGrid({ grouped }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-16">
      {Object.entries(grouped).map(([category, techs]) => (
        <div key={category}>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-slate-800">{category}</h2>
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">{techs.length} technologies</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {techs.map((tech) => (
              <Link
                key={tech.slug}
                to={`/technologies/${tech.slug}`}
                className="group flex flex-col items-center justify-center gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tech.logoUrl}
                    alt={tech.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
