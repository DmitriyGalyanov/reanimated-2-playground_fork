// viewLayers.second overlaps viewLayers.fourth
export const viewLayers = {
  topMost: { zIndex: 1000 },
  first: { zIndex: 50 },
  second: { zIndex: 40 },
  third: { zIndex: 30 },
  fourth: { zIndex: 20 },
  fifth: { zIndex: 10 },
} as const;
