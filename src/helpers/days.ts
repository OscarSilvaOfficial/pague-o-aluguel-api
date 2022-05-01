export const tomorrow = new Date(
  new Date().setDate(new Date(Date.now()).getDate() + 1),
).getTime();

export const yesterday = new Date(
  new Date().setDate(new Date(Date.now()).getDate() - 1),
).getTime();
