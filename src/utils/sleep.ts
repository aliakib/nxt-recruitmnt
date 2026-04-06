export default async function sleep(ms: number) {
    return await new Promise(res => setTimeout(res, ms));
}