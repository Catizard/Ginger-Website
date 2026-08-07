export interface TagColor {
  color?: string;
  borderColor?: string;
  textColor?: string;
}

// Color schema for play modes
export const PlayModeColorSchema = new Map<string, TagColor>([
  ["BEAT_5K", { color: "#F6C2C5", textColor: "#8E4A53", borderColor: "#8E4A53" }],
  ["POPN_5K", { color: "#F6C2C5", textColor: "#8E4A53", borderColor: "#8E4A53" }],
  ["BEAT_7K", { color: "#C5E7D0", textColor: "#47755A", borderColor: "#47755A" }],
  ["POPN_9K", { color: "#F1E7B4", textColor: "#7B6A33", borderColor: "#8E4A53" }],
  ["BEAT_10K", { color: "#F6D7B3", textColor: "#8B6039", borderColor: "#8B6039" }],
  ["BEAT_14K", { color: "#C4D8EC", textColor: "#3E6387", borderColor: "#3E6387" }],
  ["OTHER", { color: "#E3E5E7", textColor: "#68717B", borderColor: "#68717B" }]
]);

export function getPlayModeColorSchema(mode: string): TagColor {
  if (PlayModeColorSchema.has(mode)) {
    return PlayModeColorSchema.get(mode)!;
  }
  return PlayModeColorSchema.get("OTHER")!;
}
