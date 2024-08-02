import { bad_request, internal_server_error } from "./responses";
import { url } from "./url";

export async function fetcher(path: string, options: RequestInit): Promise<Response> {
    const res = await fetch(url(path), options);

    if (res.status >= 500) {
        throw internal_server_error();
    }

    if (res.status >= 400) {
        const text = await res.text().catch(() => res.statusText);

        throw bad_request(text || res.statusText);
    }

    return res;
}
