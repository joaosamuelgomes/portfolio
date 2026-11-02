export const contentPath: string;
export const snapshotPath: string;
export class ContentError extends Error {}
export function buildContent(options?: {
    includeDrafts?: boolean;
    contentDir?: string;
    /** Where to write the snapshot; `null` skips writing. */
    outputPath?: string | null;
}): Promise<unknown>;
