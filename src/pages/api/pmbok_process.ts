// pmob_process.ts
export interface Process {
  id: number;
  sort: number;
  process_name: string;
  inputs?: { input_name: string }[];
  outputs?: { output_name: string }[];
  tools_techniques?: { tt_name: string }[];

}
