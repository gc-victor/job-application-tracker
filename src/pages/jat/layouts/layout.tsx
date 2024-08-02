import type { ComponentChildren } from "preact";

import { PAGE_JOB_APPLICATIONS_ADD_PAGE_PATH, PAGE_JOB_APPLICATIONS_PAGE_PATH } from "@/config/shared/jat.constants";
import { t } from "@/pages/jat/lib/i18n/t";
import { Button } from "@/pages/jat/components/button";

const tGlobal = t.global;
const tGlobalLayoutHeader = tGlobal.layout.header;
const tGlobalDomain = tGlobal.domain;

export function Layout({ children }: { children?: ComponentChildren }) {
    return (
        <div class="flex flex-col min-h-screen">
            <header class="w-full bg-white border-b border-slate-200">
                <div class="flex items-center h-16 justify-between px-4 lg:px-8 mx-auto max-w-screen-2xl">
                    <div class="flex">
                        <h2 class="bg-slate-950 font-cal items-center justify-center text-white h-7 w-7 flex">
                            <abbr title={tGlobalDomain.jobApplicationTrackerTitle}>jat</abbr>
                        </h2>
                    </div>
                    <nav>
                        <menu class="flex items-center space-x-4 text-sm">
                            <li>
                                <a class="underline" href={PAGE_JOB_APPLICATIONS_PAGE_PATH}>
                                    {tGlobalLayoutHeader.applicationsMenu}
                                </a>
                            </li>
                            <li>
                                <Button tag="a" href={PAGE_JOB_APPLICATIONS_ADD_PAGE_PATH}>
                                    {tGlobalLayoutHeader.addApplicationMenu}
                                </Button>
                            </li>
                        </menu>
                    </nav>
                </div>
            </header>
            <main class="bg-slate-50 min-h-[calc(100vh-113px)]">
                <div class="flex-1 w-full lg:p-4 mx-auto max-w-screen-2xl">{children}</div>
            </main>
            <footer class="w-full h-12 flex justify-center items-center border-t border-slate-200 bg-white">
                <p class="text-sm text-slate-600">
                    © 2024 <a href="https://qery.io">Query</a>. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
