/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,tsx,ts}"],
    theme: {
        extend: {
            fontFamily: {
                cal: ["Cal Sans", "sans-serif"],
            },
            width: {
                // admin widths
                bool: "5ch",
                id: "4ch",
                uuid: "30ch",
                number: "10ch",
                string: "32ch",
                text: "64ch",
                timestamp: "16ch",
            },
            aria: {
                invalid: 'invalid="true"'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
