type TypeSortType = "asc" | "des"

export function orderBy<T>(arr: T[], sortType: TypeSortType, key: keyof T): T[] {
    return [...arr].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (typeof valA === "string" && typeof valB === "string") {
            return sortType === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        if (typeof valA === "number" && typeof valB === "number") {
            return sortType === "asc" ? valA - valB : valB - valA;
        }

        return 0;
    });
}
