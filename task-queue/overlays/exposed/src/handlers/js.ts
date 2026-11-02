import { z } from "zod";

import { type Handler, PermanentError } from "../harness.ts";

const Payload = z.strictObject({ script: z.string().min(1) });

/** Compiles the script; one that does not compile fails the same every time. */
function compile(script: string): () => Promise<unknown> {
	try {
		return new Function(`return (async () => {${script}\n})()`) as () => Promise<unknown>;
	} catch (error) {
		throw new PermanentError(String(error));
	}
}

/** Runs the script in this process, so it can use everything the worker can. */
export const jsHandler: Handler = async (payload) => {
	const parsed = Payload.safeParse(payload);
	if (!parsed.success) throw new PermanentError(z.prettifyError(parsed.error));
	return compile(parsed.data.script)();
};
