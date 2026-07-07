import { Mail } from 'lucide-react';

// lucide-react v1 dropped brand/logo icons (Github, Linkedin, …) for trademark
// reasons, so we inline them here matching lucide's stroke style.
function Github({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

function Linkedin({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

// ---------------------------------------------------------------------------
// Resume data — single source of truth. To add or edit, change the arrays
// below; both the rendered HTML and the schema.org JSON-LD are generated from
// them, so they never drift apart.
// ---------------------------------------------------------------------------

type Job = {
    role: string;
    company: string;
    location: string;
    /** Human-readable range shown in the UI, e.g. "2023 — Present". */
    period: string;
    /** ISO-ish year for structured data / <time>. */
    start: string;
    /** ISO-ish year or "Present". */
    end: string;
    bullets: string[];
};

const experience: Job[] = [
    {
        role: 'Senior Cloud / Data Engineer — Customer Analytics',
        company: 'Canadian Tire Corporation',
        location: 'Toronto, ON',
        period: '2023 — Present',
        start: '2023',
        end: 'Present',
        bullets: [
            'Led a cross-functional team of 5 engineers to architect and migrate a scalable PySpark pipeline on Azure Synapse, consolidating financial, loyalty, and POS data across multiple brands; added automated QA and governance for a 4× runtime improvement and a 98% reduction in data errors, empowering marketing with daily analytics.',
            "Engineered and launched a real-time offer API on GCP Cloud Run and API Gateway, enabling dynamic offers on Canadian Tire's e-commerce platform and driving a 37% increase in customer offer engagement.",
            'Facilitated knowledge-sharing sessions for up to 50 engineers and director-level stakeholders, upholding software and data engineering best practices through cloud asset migration.',
        ],
    },
    {
        role: 'Data Engineer — Loyalty Program',
        company: 'Canadian Tire Corporation',
        location: 'Toronto, ON',
        period: '2022 — 2023',
        start: '2022',
        end: '2023',
        bullets: [
            'Tech-led a duo to deliver an offer recommendation engine, automated data checks, and interactive Looker Studio dashboards — enabling $1M in weekly sales growth via Airflow, Spark, and BigQuery.',
            'Pioneered a hybrid data framework with Docker, Spark, and Databricks, cutting iteration time by 10× and earning validation from Databricks and Microsoft architects.',
            'Drove DevOps automation and migrations, increasing platform uptime and deployment speed.',
        ],
    },
    {
        role: 'Data Scientist — Inventory & Demand Forecasting',
        company: 'Canadian Tire Corporation',
        location: 'Toronto, ON',
        period: '2021 — 2022',
        start: '2021',
        end: '2022',
        bullets: [
            'Designed and orchestrated a weather info-mart pipeline using Snowflake, PySpark, Hadoop, and Oozie.',
            "Enhanced Sport Chek's inventory forecasting models by redesigning feature engineering in PySpark, accelerating pipeline performance.",
            'Automated data QA and monitoring to safeguard machine learning models and improve data quality and governance.',
        ],
    },
    {
        role: 'Software Automation Engineer Intern',
        company: 'Bell Mobility',
        location: 'Mississauga, ON',
        period: '2019 — 2020',
        start: '2019',
        end: '2020',
        bullets: [
            'Developed an asset inventory web app using a Ruby on Rails microservice architecture and Docker.',
            "Automated mobile test devices over Bell's network with Selenium, improving time-to-market by 40%.",
            'Performed DevOps duties maintaining GitLab, CI/CD pipelines, and Docker containerization.',
        ],
    },
];

type SkillGroup = { category: string; items: string[] };

const skillGroups: SkillGroup[] = [
    { category: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript', 'Ruby'] },
    {
        category: 'AI & LLMs',
        items: [
            'Google Agent Dev Kit (ADK)',
            'Gemini (multi-modal)',
            'GPT',
            'GitHub Copilot',
            'Vertex AI Studio',
            'Claude Code',
        ],
    },
    {
        category: 'Frameworks',
        items: ['PySpark', 'Hive', 'Flask', 'FastAPI', 'MLflow', 'Next.js'],
    },
    { category: 'Reporting', items: ['Looker', 'Streamlit'] },
    {
        category: 'Data Storage',
        items: [
            'Cloudera Data Lake',
            'Azure Data Lake',
            'Snowflake',
            'BigQuery',
            'PostgreSQL',
        ],
    },
    {
        category: 'Scheduling',
        items: [
            'Airflow',
            'Azure Data Factory',
            'Databricks Workflows',
            'Oozie',
            'dbt',
        ],
    },
    {
        category: 'DevOps',
        items: [
            'Jenkins',
            'GitHub',
            'Azure DevOps Pipelines',
            'GitLab CI/CD',
            'Docker',
            'Terraform',
        ],
    },
];

// Cloud platforms are nested: each platform is a sub-heading with its own
// service bubbles. Add a platform or a service by editing this array.
type CloudPlatform = { name: string; items: string[] };

const cloudPlatforms: CloudPlatform[] = [
    {
        name: 'Azure',
        items: [
            'Synapse Analytics',
            'Data Factory',
            'ADLS',
            'Key Vault',
            'Active Directory',
            'App Services',
            'Azure DevOps',
        ],
    },
    {
        name: 'GCP',
        items: [
            'Vertex AI',
            'Dataproc',
            'BigQuery',
            'Cloud Run',
            'API Gateway',
            'IAM',
            'GKE',
            'GCS',
        ],
    },
    {
        name: 'AWS',
        items: ['Lambda', 'ECR', 'S3', 'SageMaker', 'IAM'],
    },
    {
        name: 'Databricks',
        items: ['Databricks Connect', 'Workflows'],
    },
    {
        name: 'Snowflake',
        items: ['Data Pipelining', 'dbt'],
    },
];

// schema.org structured data, generated from the same arrays above so AI agents
// and search engines can read the resume without scraping the DOM.
const resumeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Erfan Kashani',
    email: 'mailto:erfan.e.k.kashani@gmail.com',
    jobTitle: experience[0].role,
    worksFor: { '@type': 'Organization', name: experience[0].company },
    knowsAbout: [
        ...skillGroups.flatMap((group) => group.items),
        ...cloudPlatforms.flatMap((platform) => [platform.name, ...platform.items]),
    ],
    hasOccupation: experience.map((job) => ({
        '@type': 'Occupation',
        name: `${job.role}, ${job.company}`,
        description: job.bullets.join(' '),
    })),
};

export default function Resume() {
    return (
        <section
            id="resume"
            className="relative border-t border-white/[0.06] bg-[#030303] py-20 md:py-28"
        >
            {/* Machine-readable resume for AI agents / search engines. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
            />

            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="mb-12 md:mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                        Resume
                    </p>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                            What I&apos;ve built.
                        </span>
                    </h2>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                    <div className="md:col-span-1 space-y-6 text-sm text-white/60">
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-[0.18em] mb-2">
                                Contact
                            </p>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="mailto:erfan.e.k.kashani@gmail.com"
                                        className="flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        <Mail className="h-4 w-4 text-white/40" />
                                        erfan.e.k.kashani@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/erfankashani"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        <Github className="h-4 w-4 text-white/40" />
                                        github.com/erfankashani
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://linkedin.com/in/erfankashani"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        <Linkedin className="h-4 w-4 text-white/40" />
                                        linkedin.com/in/erfankashani
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-10">
                        <p className="text-white/40 text-xs uppercase tracking-[0.18em]">
                            Experience
                        </p>
                        {experience.map((job) => (
                            <article
                                key={`${job.company}-${job.start}`}
                                className="relative pl-6 border-l border-white/[0.08]"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-300 to-rose-300"
                                />
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h3 className="text-lg font-medium text-white">
                                        {job.role}
                                        <span className="text-white/40 font-light">
                                            {' · '}
                                            {job.company}
                                        </span>
                                    </h3>
                                    <time className="text-xs text-white/40 tracking-wide">
                                        {job.period}
                                    </time>
                                </div>
                                <ul className="mt-3 space-y-1.5 text-sm text-white/60 leading-relaxed">
                                    {job.bullets.map((bullet, j) => (
                                        <li key={j} className="flex gap-2">
                                            <span aria-hidden="true" className="text-white/30">
                                                —
                                            </span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-16 md:mt-20 border-t border-white/[0.06] pt-12">
                    <p className="text-white/40 text-xs uppercase tracking-[0.18em] mb-6">
                        Skills
                    </p>
                    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                        {skillGroups.map((group) => (
                            <div key={group.category}>
                                <dt className="text-sm font-medium text-white/80 mb-2">
                                    {group.category}
                                </dt>
                                <dd className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-10">
                        <p className="text-sm font-medium text-white/80 mb-5">
                            Cloud Platforms
                        </p>
                        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                            {cloudPlatforms.map((platform) => (
                                <div key={platform.name}>
                                    <dt className="text-xs font-medium uppercase tracking-wide text-white/50 mb-2">
                                        {platform.name}
                                    </dt>
                                    <dd className="flex flex-wrap gap-2">
                                        {platform.items.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
