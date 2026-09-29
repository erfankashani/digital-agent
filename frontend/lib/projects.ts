// Projects data — single source of truth for the portfolio section.
// To add a project, append an entry below. The card links out to the
// project's write-up (dev.to); we do not rehost content here.

export type Project = {
    title: string;
    /** Short, factual one-liner. Keep it to a sentence or two. */
    description: string;
    /** Card destination — the project's dev.to post, opened in a new tab. */
    href: string;
    /** Optional source repository. */
    repo?: string;
    /**
     * Optional cover image served from /public. When omitted the card
     * renders a gradient placeholder instead of a broken image.
     */
    coverImage?: string;
};

export const projects: Project[] = [
    {
        title: 'Self-Managed Airflow on GCP',
        description:
            'Moving a local, self-managed Airflow deployment to Google Cloud for under $150 a month — the architecture, the Terraform, and the trade-offs behind it.',
        href: 'https://dev.to/erfankashani/moving-your-local-airflow-to-gcp-for-under-150-a-month-2i1j',
        repo: 'https://github.com/erfankashani/self-managed-airflow-on-gcp',
        coverImage: '/projects/self-managed-airflow-gcp.png',
    },
];
