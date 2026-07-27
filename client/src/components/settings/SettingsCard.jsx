const SettingsCard = ({ title, children }) => {
  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl p-6">

      <h2 className="text-2xl font-semibold mb-6">
        {title}
      </h2>

      {children}

    </div>
  );
};

export default SettingsCard;