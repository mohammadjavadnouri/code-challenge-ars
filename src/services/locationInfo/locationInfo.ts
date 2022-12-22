export const getMap = async (
  left: number,
  bottom: number,
  right: number,
  top: number
) => {
  try {
    const res = await fetch(
      `https://www.openstreetmap.org/api/0.6/map.json?bbox=${left},${bottom},${right},${top}`,
      { method: "GET" }
    );
    return res;
  } catch (er: any) {
    console.error(er);
    return er;
  }
};

export const readMap = async (nodeId: number) => {
  try {
    const res = await fetch(
      `https://www.openstreetmap.org/api/0.6/node/${nodeId}`,
      { method: "GET" }
    );
    return res;
  } catch (er: any) {
    console.error(er);
    return er;
  }
};
