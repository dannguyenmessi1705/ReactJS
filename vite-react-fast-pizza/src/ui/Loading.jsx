function Loading() {
  return (
    <div className="absolute inset-1 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      {/* inset-1 có nghĩa là top, right, bottom, left đều bằng 1 */}
      <div className="loader"></div>;
    </div>
  );
}

export default Loading;
