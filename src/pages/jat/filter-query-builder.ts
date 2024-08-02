export function filterQueryBuilder(searchParams: URLSearchParams) {
    const search = searchParams.get("search");
    const workplace = searchParams.get("workplace");
    const job_type = searchParams.get("job_type");
    const status = searchParams.get("status");

    const queryBuilder = [];
    queryBuilder.push(
        `
        SELECT
            company_name,
            company_website,
            job_link,
            job_type,
            location,
            position,
            salary_range_max,
            salary_range_min,
            status,
            uuid,
            workplace
        FROM
            job_application
    `.trim(),
    );

    if (search || workplace || job_type || status) {
        queryBuilder.push("WHERE");

        const conditions = [];

        if (search) {
            conditions.push(`(
                company_name LIKE :search
                OR location LIKE :search
                OR position LIKE :search
            )`);
        }

        if (workplace) {
            const workplaces = workplace
                .split(",")
                .map((_, index) => `:workplace${index}`)
                .join(",");
            conditions.push(`workplace IN (${workplaces})`);
        }

        if (job_type) {
            const job_types = job_type
                .split(",")
                .map((_, index) => `:job_type${index}`)
                .join(",");
            conditions.push(`job_type IN (${job_types})`);
        }

        if (status) {
            const statuses = status
                .split(",")
                .map((_, index) => `:status${index}`)
                .join(",");
            conditions.push(`status IN (${statuses})`);
        }

        if (conditions.length > 0) {
            queryBuilder.push(conditions.join(" AND "));
        }
    }

    queryBuilder.push("ORDER BY updated_at DESC;");

    const query = queryBuilder.join(" ");

    const params = {} as Record<string, string>;

    if (search) {
        params[":search"] = `%${search}%`;
    }

    if (workplace) {
        const workplaces = workplace.split(",");
        for (let index = 0; index < workplaces.length; index++) {
            params[`:workplace${index}`] = workplaces[index];
        }
    }

    if (job_type) {
        const job_types = job_type.split(",");
        for (let index = 0; index < job_types.length; index++) {
            params[`:job_type${index}`] = job_types[index];
        }
    }

    if (status) {
        const statuses = status.split(",");
        for (let index = 0; index < statuses.length; index++) {
            params[`:status${index}`] = statuses[index];
        }
    }

    return { query, params };
}
