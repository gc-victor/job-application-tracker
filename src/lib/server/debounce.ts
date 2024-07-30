export function debounce<T>(callback: (_args: T) => void, time: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (args: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            callback(args);
        }, time);
    };
}
