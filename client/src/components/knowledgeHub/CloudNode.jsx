export default function CloudNode({
  note,
  onClick,
  onDoubleClick,
}) {
  return (
    <div
      onClick={() => onClick(note)}
      onDoubleClick={() => onDoubleClick(note)}
      className="
      absolute
      rounded-full
      bg-gradient-to-br
      from-cyan-500/30
      to-blue-600/20
      border
      border-cyan-400
      backdrop-blur-md
      shadow-lg
      hover:scale-110
      transition-all
      duration-300
      cursor-pointer
      flex
      items-center
      justify-center
      text-white
      font-semibold
      "
      style={{
        left: note.x,
        top: note.y,
        width: note.size,
        height: note.size,
      }}
    >
      {note.topic}
    </div>
  );
}