import { FORM_ERROR_TEXT_CLASS, FORM_ERROR_TEXT_CLASS_NAME } from "@/pages/jat/client.constants";

class Form extends HTMLFormElement {
    connectedCallback() {
        for (const button of Array.from(this.querySelectorAll('button[type="submit"]'))) {
            button.addEventListener("click", this.handleSubmit.bind(this));
        }
    }

    [key: string]: unknown;

    // CREDIT: https://web.dev/custom-elements-best-practices/#make-properties-lazy
    upgradeProperty(prop: string): void {
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
            const value: unknown = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    async handleSubmit(e: Event) {
        e.preventDefault();

        if ((e.target as HTMLButtonElement)?.getAttribute("formmethod") === "delete") {
            this.delete(e);
        } else if (this.dataset.uuid) {
            this.update(e);
        } else {
            this.create(e);
        }
    }

    async delete(e: Event) {
        e.preventDefault();

        if (this.dataset.uuid) {
            await fetch(`${this.action}`, { method: "DELETE", body: JSON.stringify({ uuid: this.dataset.uuid }) });
        }
    }

    async create(e: Event) {
        e.preventDefault();

        const formData = new FormData(this);

        const res = await fetch(`${this.action}`, { method: "POST", body: formData, redirect: "follow" });

        if (!res.ok && res.status < 500) {
            const json = await res.json();

            this.setFieldErrors(json.errors);
        }

        if (res.ok && res.redirected) {
            window.location.href = res.url;
        }
    }

    async update(e: Event) {
        e.preventDefault();

        const formData = new FormData(this);

        if (this.dataset.uuid) {
            formData.set("uuid", this.dataset.uuid);
        }

        const res = await fetch(`${this.action}`, { method: "PUT", body: formData, redirect: "follow" });

        if (!res.ok && res.status < 500) {
            const json = await res.json();

            this.setFieldErrors(json.errors);
        }

        if (res.ok && res.redirected) {
            window.location.href = res.url;
        }
    }

    setFieldErrors(errors: Record<string, string[]>) {
        for (const fieldName of Object.keys(errors)) {
            const fieldError = errors[fieldName][0];
            const formField = this.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

            if (fieldError) {
                this.updateField(formField, false, fieldError);

                const errorElements = document.querySelectorAll(FORM_ERROR_TEXT_CLASS) || [];
                for (const element of Array.from(errorElements)) {
                    if (element?.textContent && element.textContent.trim() !== "") {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                        break;
                    }
                }
            } else {
                this.updateField(formField, true, "");
            }
        }
    }

    updateField(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, isValid: boolean, errorMessage: string) {
        const parentElement = el.parentElement as HTMLElement;
        const elError = parentElement?.querySelector(`.${FORM_ERROR_TEXT_CLASS_NAME}`) as HTMLElement;

        if (isValid) {
            el.removeAttribute("aria-invalid");
            el.removeAttribute("aria-describedby");
            el.setCustomValidity("");
            el.reportValidity();

            parentElement.classList.remove("text-red-500");

            if (elError) {
                elError.textContent = "";
            }

            el.removeEventListener("input", this.clearValidation.bind(this));
        } else {
            const id = el.id;

            el.setAttribute("aria-invalid", "true");
            el.setAttribute("aria-describedby", `err-${id}`);
            el.setCustomValidity(errorMessage);
            el.reportValidity();

            parentElement.classList.add("text-red-500");

            if (elError) {
                elError.setAttribute("aria-live", "assertive");
                elError.textContent = errorMessage;
            }

            if (el.type !== "date") {
                el.addEventListener("input", this.clearValidation.bind(this));
            }

            // NOTE: avoids the native tooltip
            (this.querySelector('button[type="submit"]') as HTMLButtonElement)?.focus();
        }
    }

    clearValidation(e: Event) {
        const event = e as KeyboardEvent;

        this.updateField(event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, true, "");
    }
}

if (!customElements.get("form-element")) {
    customElements.define("form-element", Form, { extends: "form" });
}

export default Form;
