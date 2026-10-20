export type RoadmapStatus = "done" | "in-progress" | "next";

export interface RoadmapStep {
  title: string;
  description: string;
  status: RoadmapStatus;
}
