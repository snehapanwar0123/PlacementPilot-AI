export default function generateCloudLayout(notes) {
  return notes.map((note) => ({
    ...note,

    x: Math.random() * 900,

    y: Math.random() * 650,

    size: 120,
  }));
}