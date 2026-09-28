import { ArrowUpRight } from 'lucide-react';

import { projects } from '@/lib/projects';

// Portfolio section. Each card links out to the project's dev.to write-up in a
// new tab — we deliberately don't rehost the article content here.
export default function Projects() {
    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="relative border-t border-white/[0.06] bg-[#030303] py-20 md:py-28"
        >
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="mb-12 md:mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                        Projects
                    </p>
                    <h2
                        id="projects-heading"
                        className="mt-3 text-3xl md:text-4xl font-bold tracking-tight"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                            Things I&apos;ve shipped.
                        </span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm text-white/50 leading-relaxed">
                        Each card opens the full write-up on dev.to in a new tab.
                    </p>
                </div>

                <ul className="grid gap-6 sm:grid-cols-2">
                    {projects.map((project) => (
                        <li key={project.title} className="h-full">
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
                            >
                                <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-400/20">
                                    {project.coverImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={project.coverImage}
                                            alt={`${project.title} cover`}
                                            width={1600}
                                            height={900}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                                        />
                                    ) : null}
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-lg font-medium text-white">
                                            {project.title}
                                        </h3>
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-white"
                                        />
                                    </div>

                                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-wide text-white/40 transition-colors group-hover:text-white/70">
                                        Read on dev.to
                                        <span className="sr-only">
                                            {' '}
                                            (opens in a new tab)
                                        </span>
                                    </span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
