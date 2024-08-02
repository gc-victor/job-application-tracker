import { API_ADMIN_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";

import { Button } from "./button";

interface Document {
    name: string;
}

type DocumentList = Document[] | undefined;

export function Documents({ documents, uuid, showDelete = false }: { documents: DocumentList; uuid: string; showDelete?: boolean }) {
    return (
        <ul class="flex-grow divide-y divide-slate-100 rounded-md border border-slate-200">
            {documents?.map(({ name }: { name: string }) => (
                <li key={name} class={"flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"}>
                    <span class="flex w-0 flex-1 items-center">
                        <svg class="h-5 w-5 flex-shrink-0 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span class="ml-4 flex min-w-0 flex-1 gap-2">
                            <span class="truncate font-medium">{name}</span>
                        </span>
                    </span>
                    <span class="ml-4 flex-shrink-0">
                        <a
                            href={`${API_ADMIN_JOB_APPLICATION_PATH}/${uuid}/document/${encodeURIComponent(name)}`}
                            class="font-medium text-slate-600 hover:text-slate-500"
                        >
                            Download
                        </a>
                    </span>
                    {showDelete && (
                        <span class="ml-4 flex-shrink-0">
                            <Button
                                is="delete-document"
                                class="font-medium text-red-600 hover:text-red-500"
                                variant="transparent"
                                uuid={uuid}
                                name={name}
                            >
                                Delete
                            </Button>
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
