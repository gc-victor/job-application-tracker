import type { ComponentChildren } from "preact";

import { t } from "@/pages/jat/lib/i18n/t";
import { Button } from "@/pages/jat/components/button";
import { APPLICATIONS_ADD_PAGE, APPLICATIONS_PAGE } from "@/pages/jat/constants";

const tLayoutHeader = t.global.layout.header;

export function Layout({ children }: { children?: ComponentChildren }) {
    return (
        <div class="flex flex-col min-h-screen">
            <header class="w-full bg-white border-b border-slate-200">
                <div class="flex items-center h-16 justify-between px-4 lg:px-8 mx-auto max-w-screen-2xl">
                    <div class="flex">
                        <h2 class="bg-slate-950 font-cal items-center justify-center text-white h-7 w-7 flex">
                            <abbr title="Job Application Tracker">jat</abbr>
                        </h2>
                    </div>
                    <nav>
                        <menu class="flex items-center space-x-4 text-sm">
                            <li>
                                <a class="underline" href={APPLICATIONS_PAGE}>
                                    {tLayoutHeader.applicationsMenu}
                                </a>
                            </li>
                            <li>
                                <Button tag="a" href={APPLICATIONS_ADD_PAGE}>
                                    {tLayoutHeader.addApplicationMenu}
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
                <p class="text-sm text-slate-600">© 2024 Query Apps. All rights reserved.</p>
            </footer>
        </div>
    );
}
