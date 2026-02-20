export async function validateCoupon(code: string): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(code === "SAVE10" ? 10 : 0);
        }, 1000);
    });
}