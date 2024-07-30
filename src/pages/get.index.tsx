import { PAGE_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";

export async function handleRequest(req: Request) {
    const url = new URL(req.url);

    return Response.redirect(url.origin + PAGE_JOB_APPLICATION_PATH);
}
