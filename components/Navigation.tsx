import logo from '/assets/icons/logo.svg';

export const Navigation: React.FC<{ heading: string }> = ({ heading }) => (
  <div className="fixed top-0 left-0 w-full my-2">
    <div className="w-[min(80vw,400px)] mx-auto flex flex-row items-center justify-between">
      <img
        src={logo.src}
        alt="logo"
        className="max-h-[max(min(5svh,5svw),20px)]"
        style={{ filter: 'invert(1)' }}
        onClick={() => (document.location.href = '/')}
      />
      <span className="text-slate-200 text-[max(min(5svh,5svw),20px)]">{heading}</span>
    </div>
  </div>
);
